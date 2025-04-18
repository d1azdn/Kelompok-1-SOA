const mysql = require("mysql")
require('dotenv').config()

const db = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "",
    database: "qrent"
   }); 
   
   db.connect((err) => {
    if (err) {
    throw err;
    }
    console.log('Connected to MySQL');
});

module.exports = db