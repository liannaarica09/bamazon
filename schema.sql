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
        ("Bruise Blam", "Knight", 100.50, 10),
        ("Black Opal Necklace", "Mage", 150.50, 10),
        ("Black Opal Ring", "Town", 120.75, 10),
        ("Tilting Sadle", "Knight", 10000, 10),
        ("Crystal Sword", "Evil", 1000000, 1),
        ("Vervain", "Mage", 10, 1000),
        ("Glaive", "Town", 10, 100),
        ("Yamani Fan", "Rider", 10, 200.50),
        ("Long Bow", "Rider", 20, 100),
        ("Sword", "Knight", 50, 200),
        ("Blazebalm", "Mage", 200, 50);
    SELECT * FROM products;
