const Model = require('./models/Model');
const View = require('./View');

const mainProcess = async function() {
    try {
        // ask Model to get data on all products form the database
        let data = await Model.getData();
        // ask View to display this info in a formatted form
        View.displayDataList(data);
        // get userinput and validate it
        let isNotValidated, productID, problem, productData;
        do {
            // ask view to prompt user for ID of product they want to purchase
            productID = await View.promptID(productID, problem);
            // check if returned ID is an integer greater than zero after being converted to a number
            if (Number.isInteger(parseFloat(productID)) && parseFloat(productID) > 0) {
                // if the product ID is fine we check if it's in the database
                try {
                    // if it is we move on
                    productData = await Model.getProductInfo(productID);
                    isNotValidated = false;
                } catch {
                    // else we continue the loop
                    isNotValidated = true;
                    problem = 'not a product';
                }

            } else if (productID === 'exit') { 
                // If user types exit we get the Model to disconnect from the database
                await Model.disconnect();
                // And exit the code
                process.exit();
            } else {
                isNotValidated = true;
                problem = 'not an int';
            }
        } while (isNotValidated);
        // once we get the proper productData we get the next bit of user data and validate it
        let desiredQuantity;
        isNotValidated = null;
        problem = null;
        do {
            // ask view to prompt user for the quantity of the product they want to purchase
            desiredQuantity = await View.promptQuantity(desiredQuantity, problem, productData.product_name);

            if (desiredQuantity === 'exit') {
                // If user types exit we get the Model to disconnect from the database
                await Model.disconnect(); 
                // And exit the code
                process.exit();
            }
            // check if returned quantity is an integer greater than zero after being converted to a number
            desiredQuantity = parseFloat(desiredQuantity);
            if (Number.isInteger(desiredQuantity) && desiredQuantity > 0) {
                // if the quanitity is fine we check if there's enough of the product
                if (desiredQuantity <= productData.stock_quantity) {
                    // if it is we move on
                    isNotValidated = false;
                } else {
                    // else we continue the loop
                    isNotValidated = true;
                    problem = 'insufficient quantity';
                }

            } else {
                isNotValidated = true;
                problem = 'not an int';
            }
        } while (isNotValidated);
        
        try {
            // once we get the proper desired quantity we ask the model to update the database
            await Model.updateQuantity(desiredQuantity, productData.item_ID);
            // ask View to tell user transaction was successful and how much it cost
            View.displayTransactionResult(true, desiredQuantity * parseFloat(productData.price));
        } catch {
            // if it fails for any reason we tell the customer that it failed
            View.displayTransactionResult(false);
        }

        // Regradless if transaction is completed or not, we prompt the user if they want to make another transactio or not
        const confirmed = await View.promptAnotherTransaction();

        if (confirmed) {
            // If they say 'yes' we re-run the whole function
            mainProcess();
        } else {
            // If they say 'no' we exit the whole process by asking the Model to disconnect from the database
            await Model.disconnect();
            // And exit the code
            process.exit();
        }
        
    } catch (error) {
        if (error) throw error;
    }
}

const Controller = {
    run:  function() {
        // ask Model to connect to database and pass a callback
        Model.connectToDB(mainProcess);
    }
};

module.exports = Controller;