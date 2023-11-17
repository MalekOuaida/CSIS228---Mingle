const mysql = require('mysql');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create a MySQL connection using environment variables
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Successfully connected to the MySQL database.');
});

module.exports = db;
