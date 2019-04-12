const Database = require('./Database')

let db;

const Model = {
    connectToDB: function(callback) {
        db = new Database({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'root',
            database: 'bamazon'
        });
        callback();
    },

    getData: function() {
        return new Promise(async (resolve, reject) => {
            const queryString = 'SELECT * FROM products';
            const data = await db.query(queryString);
            if (data) {
                resolve(data);
            } else {
                reject();
            }
        });
    },

    getProductInfo: function(prodID) {
        return new Promise(async (resolve, reject) => {
            const queryString = `SELECT * FROM products WHERE item_ID = ${prodID}`;
            const data = await db.query(queryString);
            if (data.length) {
                resolve(data[0]);
            } else {
                reject();
            }
        });
    },

    updateQuantity: function(quant, prodID) {
        return new Promise(async (resolve, reject) => {
            const queryString = `UPDATE products SET stock_quantity = stock_quantity - ${quant} WHERE item_ID = ${prodID};`;
            const res = await db.query(queryString);
            if (res.changedRows) {
                resolve();
            } else {
                reject();
            }
        });
    },

    disconnect: function() {
        db.close();
    }
};

module.exports = Model;