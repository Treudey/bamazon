const inquirer = require('inquirer');
const Table = require('cli-table');

const View = {
    displayDataList: function(dataArr) {
        const dataKeysArr = Object.keys(dataArr[0]);
        const formatedKeys = dataKeysArr.map(str => {
            str = str.replace(/_/g, ' ');
            for (let i = 0; i < str.length; i++) {
                let char = str[i];
                
                if (i === 0 || i === str.indexOf(' ') + 1) {
                    str = str.replace(char, char.toUpperCase());
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

        console.log(table.toString());
    }
};

module.exports = View;
