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
            resolve(data);
        });
    }
};

module.exports = Model;