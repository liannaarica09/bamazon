DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE products
(
    item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name varchar(255) NOT NULL,
    department_name varchar(255),
    price DECIMAL(10, 2),
    stock_quantity INTEGER,
    PRIMARY KEY(item_id)
);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Bruise Blam", "Page's Wing", 100.50, 10),
        ("Black Opal Necklace", "Mage's Wing", 150.50, 10),
        ("Black Opal Ring", "Corus", 120.75, 10);
    SELECT * FROM products;
