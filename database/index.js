const mysql = require('mysql');
const dbConfig = require('../config/db.config');

const db = mysql.createConnection(dbConfig);

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Successfully connected to the MySQL database.');
});

db.query('SELECT 1', (error, results, fields) => {
    if (error) {
        console.error('Error executing test query:', error);
    } else {
        console.log('Database connection test successful');
    }
});

module.exports = db;
