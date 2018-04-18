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
                        type: "rawlist",
                        name: "choseItem",
                        message: "What would you like to purchase?",
                        choices: productArr
                    },
                    {
                        type: "input",
                        name: "quantitySelect",
                        message: "How many would you like to buy?"
                    }
                ]).then(res => {
                    var productSelection = res.choseItem;
                    console.log(productSelection);
                    var quantitySelection = res.quantitySelect;
                    console.log(quantitySelection);

                    // var querySelectedProduct = "select price, stock_quantity from products where product_name = " + productSelection;
                    connection.query("select price, stock_quantity from products where product_name = 'Black Opal Necklace'", function (error, product) {
                        if (error) throw error;

                        var currentQuantity = product[0].stock_quantity;
                        var currentPrice = product[0].price;

                        if (quantitySelection <= currentQuantity) {

                            var newProductQuantity = currentQuantity - quantitySelection;

                            var updateProductsQuery = "update products set quantity = " + newProductQuantity + " where product_id = " + productSelection;

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