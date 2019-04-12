// Algorithm
/*
 * 1. Controller asks Model to get data on all products form the database
 * 2. Controller asks View to display this info in a formatted form
 * 3. Controller asks View to prompt users with two messages:
    * The first asks them the ID of the product they would like to buy.
    * The second message asks how many units of the product they would like to buy.
 * 4. Controller gets Model to check if the ID inputted is in the database and if not we tell View to ask user to select on item that is on the list
 * 5. Controller gets Model to check if there is enough quantitiy for the selected item and if the controller asks View to tell the user there is insifficient stock
 * 6. If both parts of request are valid, Controller asks model to update database by removing appropriate quantity from database
 * 7. Controller gets Modal to give price of object and tels View to tell user the transaction was successful and the total cost
 * 8. Controller asks View to prompt user for another transaction and loop repeats until user exits program
   * */

const Controller = require('./Controller');

Controller.run();
/*
const mysql = require('mysql');
const inquirer = require('inquirer');

const mainMenu = () => {
    
    console.log("\nMain Menu")
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: [  "Search songs by artist", 
                        "Search songs within a range", 
                        "Search for a song", 
                        "See artists with multiple Top5000 songs",
                        "Quit"],
            name: "command"
        }
    ])
    .then(inquirerResponse => {
        switch (inquirerResponse.command) {
            case "Search songs by artist":
                promptArtistSearch();
                break;
            case "Search for a song":
                promptSongSearch();
                break;
            case "Search songs within a range":
                promptRangeSearch();
                break;
            case "See artists with multiple Top5000 songs":
                getMultiArtists();
                break;
            case "Quit":
                connection.end();
            default:
                break;
        }
    });
};

const promptArtistSearch = () => {
    inquirer.prompt([
        {
            type: "text",
            message: "Which artist do you want to search for?",
            name: "artist"
        }
    ]).then(answer => {
        searchArtist(answer.artist);
    });
};

const promptSongSearch = () => {
    inquirer.prompt([
        {
            type: "text",
            message: "Which song do you want to search for?",
            name: "song"
        }
    ]).then(answer => {
        searchSong(answer.song);
    });
};

const promptRangeSearch = () => {
    inquirer.prompt([
        {
            type: "text",
            message: "What position do you want to start searching at?",
            name: "id1"
        },
        {
            type: "text",
            message: "What position do you want to stop searching at?",
            name: "id2"
        }
    ]).then(answer => {
        searchRange(answer.id1, answer.id2);
    });
};

const searchArtist = (artist) => {
    console.log(`Searching for ${artist}...`);
    const queryString = `SELECT * FROM Top5000 WHERE artist = '${artist}'`;
    connection.query(
        queryString,
        (err, res) => {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                console.log(`${res[i].id} || ${res[i].artist} || ${res[i].title} || ${res[i].release_year}`);
            }
            
            mainMenu();
        }
    );
};

const searchSong = (song) => {
    console.log(`Searching for ${song}...`);
    const queryString = `SELECT * FROM Top5000 WHERE title = '${song}'`;
    connection.query(
        queryString,
        (err, res) => {
            if (err) throw err;
            
            console.log(`${res[0].id} || ${res[0].artist} || ${res[0].title} || ${res[0].release_year}`);
            
            mainMenu();
        }
    );
};

const searchRange = (startID, endID) => {
    console.log(`Searching songs between position ${startID} & position ${endID}...`);
    const queryString = `SELECT * FROM Top5000 WHERE id >= ${startID} && id <= ${endID}`;
    connection.query(
        queryString,
        (err, res) => {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                console.log(`${res[i].id} || ${res[i].artist} || ${res[i].title} || ${res[i].release_year}`);
            }
            
            mainMenu();
        }
    );
};

const getMultiArtists = () => {
    console.log(`Searching artists with multiple Top5000 songs...`);
    const queryString = 'SELECT artist, count(*) FROM Top5000 GROUP BY artist HAVING count(*) > 1';
    connection.query(
        queryString,
        (err, res) => {
            if (err) throw err; 
            for (let i = 0; i < res.length; i++) {
                console.log(`${res[i].artist} || ${res[i]['count(*)']} songs`);
            }
            
            mainMenu();
        }
    );
};

/* MAIN PROCESS
********************************************/
/*
const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "top_songsDB"
});

connection.connect(err => {
    if (err) throw err;
    console.log("Welcome to Top5000! \nConnected as id", connection.threadId);
    displayData();
    mainMenu();
});

*/