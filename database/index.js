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

module.exports = db;
