const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  database: dbConfig.database,
  password: dbConfig.PASSWORD,
//  database: dbConfig.DB
});

// open the MySQL connection
connection.connect(error => {
  if (error) {
    console.log("something happened here")
    throw error;}
  console.log("Successfully connected to the database.");
});

module.exports = connection;
