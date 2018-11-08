var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    createSong();
});

//Display the products

function displayAll() {
    //show all ids, names, and products from database.
    connection.query('SELECT * FROM Products', function (error, response) {
        if (error) {
            console.log(error)
        };
        //New instance of our constructor
        var theDisplayTable = new Table({
            //declare the value categories
            head: ['Item ID', 'Product Name', 'Category', 'Price', 'Quantity'],
            //set widths to scale
            colWidths: [10, 30, 18, 10, 14]
        });
        //for each row of the loop
        for (i = 0; i < response.length; i++) {
            //push data to table
            theDisplayTable.push(
                [response[i].ItemID, response[i].ProductName, response[i].DepartmentName, response[i].Price, response[i].StockQuantity]
            );
        }
        //log the completed table to console
        console.log(theDisplayTable.toString());
        inquireForPurchase();
    });
};