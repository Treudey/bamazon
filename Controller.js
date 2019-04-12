const Model = require('./models/Model');
const View = require('./View');

const inquirer = require('inquirer');

const mainProcess = async function() {
    try {
        // ask Model to get data on all products form the database
        let data = await Model.getData();
        // ask View to display this info in a formatted form
        View.displayDataList(data);
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