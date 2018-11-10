var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

//Connect and run the first function that will give way for the entire app
connection.connect(function (error) {
    if (error) throw error;
    welcomePrompt();
});

function welcomePrompt() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Welcome to Bamazon, how can I help you?\n",
            choices: [
                "I want to see the what you've got",
                "I would like to buy some products",
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "I want to see the what you've got":
                    displayInventory();
                    break;

                case "I would like to buy some products":
                    buyProduct();
                    break;
            }
        });
};

//Before buying something you'll need to see what we've got, so a list with the current items will be shown first.
function displayInventory() {
    connection.query("SELECT * FROM Products", function (error, response) {
        if (error) {
            console.log(error)
        };
        var table = new Table({
            head: ['Item ID', 'Product Name', 'Department', 'Price USD', 'Quantity'],
            colWidths: [10, 30, 18, 14, 14]
        });

        for (i = 0; i < response.length; i++) {
            //Here the data is pushed to the table
            table.push(
                [response[i].Item_id, response[i].Product_Name, response[i].Department_Name, response[i].Price, response[i].Stock_Quantity]
            );
        }
        console.log(table.toString());

        //After showing the inventory we ask the customer whether to buy or to leave the store
        promptCustomer();
    });
};
//the function "buyProduct" will take to the input form and "getOut" will end the app  
function promptCustomer() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Did you find something you might want to get?\n",
            choices: [
                "Yes I did, let's do it!",
                "No, I didn't find anything interesting. Get me out of here man!",
            ]
        }).then(function (answer) {
            switch (answer.action) {
                case "Yes I did, let's do it!":
                    buyProduct();
                    break;

                case "No, I didn't find anything interesting. Get me out of here man!":
                    getOut();
                    break;
            }
        });
};

function buyProduct() {
    inquirer.prompt([{
            name: "ID",
            type: "input",
            message: "Please write down the Item ID of the product\n"
        }, {
            name: 'Quantity',
            type: 'input',
            message: "How many would you like to buy? (Please check the available stock)\n"
        },

    ]).then(function (answers) {
        //set captured input as variables, pass variables as parameters.
        var howMany = answers.Quantity;
        var itemID = answers.ID;
        updateDatabase(itemID, howMany);
    });
};

function updateDatabase(ID, productNeed) {
    connection.query("SELECT * FROM Products WHERE Item_id = " + ID, function (error, response) {
        if (error) {
            console.log(error)
        };
        if (productNeed <= response[0].Stock_Quantity) {
            //Now the app will add up the amount of items and calculate the final cost
            var howMuch = response[0].Price * productNeed;
            console.log("Order placed! Let's go to checkout...");
            console.log("------------------------------------------------------------- \n");
            console.log("Your odered: " + productNeed + " " + response[0].Product_Name + " Your total is " + howMuch + " USD.");
            console.log("Thank you very much for your purchase!");
            console.log("-------------------------------------------------------------\n");
            connection.query("UPDATE Products SET Stock_Quantity = Stock_Quantity - " + productNeed + " WHERE Item_id = " + ID);
        } else {
            console.log("\n-------------------------------------------------------------");
            console.log("There seems to be a problem, we don't have enough " + response[0].Product_Name + " in existence at the moment. Perhaps something else?");
            console.log("------------------------------------------------------------- \n");
        };
        //displayInventory();
        //welcomePrompt();
        continueShopping();
    });
};

function continueShopping() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Do you want to continue shopping?\n",
            choices: [
                "What else do you got, can I see the list?",
                "Yes please!",
                "No, I think I got what I needed. thank you!",
            ]
        }).then(function (answer) {
            switch (answer.action) {
                case "What else do you got, can I see the list?":
                    displayInventory();
                    break;

                case "Yes please!":
                    buyProduct();
                    break;

                case "No, I think I got what I needed. thank you!":
                    getOut2();
                    break;
            }
        });
};

function getOut() {
    console.log("\nSorry to hear that you didn't find anything interesting. Thank your stopping by!");
    console.log("------------------------------------------------------------------------------- \n");
    connection.end();
}

function getOut2() {
    console.log("\nThank your stopping by. Please come again soon!");
    console.log("-----------------------------------------------\n");
    connection.end();
}