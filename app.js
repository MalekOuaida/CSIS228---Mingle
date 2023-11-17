const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import the database connection
const db = require('./database/index');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test database connection
db.query('SELECT 1', (err, results) => {
    if (err) {
        console.error('Error testing the MySQL database connection:', err);
        return;
    }
    console.log('Database connection test successful');
});


const userRoutes = require('./routes/userRoutes');
const interestRoutes = require('./routes/interestRoutes');
const photoRoutes = require('./routes/photoRoutes');
const likeRoutes = require('./routes/likeRoutes');
const matchRoutes = require('./routes/matchRoutes');

app.use('/api/users', userRoutes);
app.use('/api/interests', interestRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/matches', matchRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the TinderClone API!');
});

app.use((req, res, next) => {
    res.status(404).send("Sorry, can't find that!");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;