var mysql = require('mysql');
var inquirer = require('inquirer');
var productArr = [];
var connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'bamazon_db'
});

connection.connect(function (err) {
    if (err) throw err;
    getData();
});

function getData() {
    var queryProducts = "select item_id, product_name, department_name, price from products";
    connection.query(queryProducts, function (error, products) {
        if (error) throw error;
        console.log("*********************");
        console.log("Current Inventory");
        console.log("*********************");
        console.log("Product ID" + "\t" + "Product Name" + "\t" + "Department" + "\t" + "Unit Price (USD)");
        for (var index = 0; index < products.length; index++) {
            var product = products[index];
            productArr.push(products[index].product_name);
            console.log(product.item_id + "\t\t" + product.product_name + "\t\t" + product.department_name + "\t\t" + product.price);
        }

        inquirer.prompt([{
            type: "confirm",
            name: "confirm",
            message: "Would you like to make a purchase?"
        }]).then(res => {
            if (res.confirm === false) {
                console.log("Have a nice day!");
                return connection.end();
            } else {
                inquirer.prompt([{
                            type: "input",
                            message: "Please enter the ID of the item you'd like to purchase.",
                            name: "item_id"
                        },
                        {
                            type: "input",
                            message: "How many would you like to purchase? (To quit enter X.)",
                            name: "quantity"
                        }
                    ])
                    .then(function (inquirerResponse) {

                        if (inquirerResponse.item_id === "X" || inquirerResponse.quantity === "X") {
                            console.log("Have a nice day!");
                            return connection.end();
                        }

                        var productSelection = inquirerResponse.item_id;
                        var quantitySelection = inquirerResponse.quantity;

                        var querySelectedProduct = "select price, stock_quantity from products where item_id = " + productSelection;
                        connection.query(querySelectedProduct, function (error, product) {
                            if (error) throw error;

                            var currentQuantity = product[0].stock_quantity;
                            var currentPrice = product[0].price;

                            if (quantitySelection <= currentQuantity) {

                                var newProductQuantity = currentQuantity - quantitySelection;

                                var updateProductsQuery = "update products set stock_quantity = " + newProductQuantity + " where item_id = " + productSelection;

                                connection.query(updateProductsQuery, function (error, results) {
                                    if (error) throw error;
                                    console.log("Thanks for your business. Your total cost is $" + (currentPrice * quantitySelection) + "\n");
                                    getData();
                                });
                            } else {
                                console.log("Insufficient quantity! Try again.");
                                getData();
                            }
                        });
                    });
            }
        });
    });
}