const mysql = require("mysql")
const redis = require("redis")
require('dotenv').config()

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
   }); 
   
   db.connect((err) => {
    if (err) {
    throw err;
    }
    console.log('Connected to MySQL');
});

const client = redis.createClient()
client.connect();

module.exports = { db, client }