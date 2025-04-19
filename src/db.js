const mysql = require("mysql")
const redis = require("redis")
require('dotenv').config()

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'qrent'
}); 
   
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL');
});

const client = redis.createClient()
client.connect();

module.exports = { db, client }