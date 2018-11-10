DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE Products (
  Item_id INT AUTO_INCREMENT NOT NULL,
  Product_Name VARCHAR(100) NOT NULL,
  Department_Name VARCHAR(100) NOT NULL,
  Price DECIMAL(10,3) NOT NULL,
  Stock_Quantity INT(10),  
  primary key(Item_id)
);

SELECT * FROM Products;

/*Electronics*/
INSERT INTO Products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("Google Home Mini", "Electronics", 49.50, 10);
INSERT INTO Products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("GoPRO Hero5 Session", "Electronics", 108.19, 50);
INSERT INTO Products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("iRobot Roomba", "Electronics", 359.74, 5);

/*Books*/
INSERT INTO Products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("HTML & CSS: Design and Build Web Sites", "Books", 22.50, 40);
INSERT INTO Products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("JAVASCRIPT & jQUERY Interactive Front-End Web Development", "Books", 32.78, 40);
INSERT INTO Products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("PHP & MYSQL: Server-side Web Development", "Books", 44.19, 20);

/*Home & Kitchen*/
INSERT INTO Products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("Electric Kettle", "Home & Kitchen", 19.14, 5);
INSERT INTO Products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("Crock-Pot 6-quart", "Home & Kitchen", 27.99, 12);
INSERT INTO Products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("Wood-Slab Coffee Table", "Home & Kitchen", 145.50, 1);

/*Sports*/
INSERT INTO Products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("Fitness Tracker", "Sports", 99, 15);
INSERT INTO Products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("Yoga Mat", "Sports", 29.99, 100);
INSERT INTO Products (Product_Name, Department_Name, Price, Stock_Quantity)
VALUES ("Snowboard", "Sports", 225.95, 12);
