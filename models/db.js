const mysql = require("mysql");
//const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createPool({
  connectionLimit: 10,
  user : 'bdd59ac6cdfb41',
  host : 'us-cdbr-east-02.cleardb.com',
  password : '10a3e7dd',
  database : 'heroku_a18441a3eb52d5c'
//  database: dbConfig.DB
});

// open the MySQL connection
connection.getConnection((error,connection) => {
  if (error) {
    console.log(connection)
    console.log("something happened here")
    throw error;}
  console.log("Successfully connected to the database.");
  connection.release();
});


module.exports = connection;
