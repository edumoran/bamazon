# Bamazon

Bamazon is a command line node app that works as an Amazon-like store which takes orders from customers and depletes it stock from the store's inventory. The inverntory is an sql powered database that is being updated in real time.

There are two versions of the app, Customer and Manager. The first one allows you to access the inventory and make one or several purchases, the latter allows you to check for low inventory and add items (bamazonManager.js is still a WIP).

## How it Works

1. Open the terminal/bash window.

2. Run an npm install first. This will load up the following Node packages:

  * [MySQL] (https://www.npmjs.com/package/mysql) -We need this to connect the database to our code
  * [Inquirer] (https://www.npmjs.com/package/inquirer) - We need this to make the prompts
  * [Cli-Table] (https://www.npmjs.com/package/cli-table) - This is a cool tool that takes the data and renders it inside the table

3. Once installed, the user can proceed to run the program and the first prompt will come up...

## The Prompts

```
1. The app starts by greeting the user and showing 2 options.
  * Check the inventory
  * Buy a product

2. When the inventory is chosen, the database will be displayed and there will be 2 options.
  * Buy a product
  * Leave the shop (this option ends the connection)

3. If the user chooses to buy a product, the "Buy product function" will run, and a prompt for ID and quantity of items will come up.
  * Once the ID and quantity is provided the user is taken to the checkout
  * A summary of the order and the total amount (USD) is displayed
  * The user can now choose to continue shopping or to leave the shop (continue shopping runs the "Buy product function" again)

4. If/when the app doesn't have enough units of what the user needs, an error message will be shown and the "Buy product function" will run again

```
*The table will update automatically after each purchase so the user can see the amount of products in stock.* 

## The Database

The databse was created using mysql, powered (locally) by XAMPP and manipulated through node. It is populated with some products that are organized under the following categories:

   * Item id (unique id for each product)
   * Product Name
   * Department Name
   * Price (cost customer)
   * Stock Quantity (total amount of items)
