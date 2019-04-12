const inquirer = require('inquirer');
const Table = require('cli-table');

const View = {
    displayDataList: function(dataArr) {
        const dataKeysArr = Object.keys(dataArr[0]);
        const formatedKeys = dataKeysArr.map(str => {
            str = str.replace(/_/g, ' ');
            for (let i = 0; i < str.length; i++) {
                let char = str.charAt(i);
                
                if (i === 0 || i === str.indexOf(' ') + 1) {
                    str = str.substr(0, i) + char.toUpperCase() + str.substr(i + 1);
                } 
            }
            return str;
        });
        
        const table = new Table({
            head: formatedKeys
        });
        dataArr.forEach(el => {
            table.push(Object.values(el));
        });

        console.log('\n' + table.toString() + '\n');
    },

    promptID: function(prevAnswer, problem) {
        return new Promise(resolve => {
            if (problem === 'not an int') {
                console.log('\n' + prevAnswer + ' is not a valid ID\n');
            } else if (problem === 'not a product') {
                console.log(`\n ${prevAnswer} is ${problem} \n`);
            }
            inquirer.prompt([
                {
                    type: 'text',
                    message: "Enter the ID of the product you would like to purchase. (Type 'exit' to exit app)",
                    name: 'productID'
                }
            ])
            .then(answer => resolve(answer.productID));
        });
    },

    promptQuantity: function(prevAnswer, problem, productName) {
        return new Promise(resolve => {
            if (problem === 'not an int') {
                console.log('\n' + prevAnswer + ' is not a valid quantity\n');
            } else if (problem === 'insufficient quantity') {
                console.log("\nThere is insufficient quantity to fulfill you're order\n");
            }
            inquirer.prompt([
                {
                    type: 'text',
                    message: `How many units of ${productName} would you like to buy? (Type 'exit' to exit app)`,
                    name: 'quantity'
                }
            ])
            .then(answer => resolve(answer.quantity));
        });
    },

    displayTransactionResult: function(isSuccessful, total) {
        if (isSuccessful) {
            console.log('\nTransaction successful! You paid $' + total.toFixed(2) + '\n');
        } else {
            console.log('\nTransaction failed. Please try again\n');
        }
    },

    promptAnotherTransaction: function() {
        return new Promise(resolve => {
            inquirer.prompt([
                {
                    type: 'confirm',
                    message: 'Would you like to make another transaction?',
                    name: 'confirm',
                    default: true
                }
            ])
            .then(answer => resolve(answer.confirm));
        });
    }
};

module.exports = View;
