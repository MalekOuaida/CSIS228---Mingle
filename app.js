const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const MySQL = require('mysql');

dotenv.config();

const db = require('./database/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs');

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
const likeRoutes = require('./routes/likesRoutes');
const matchRoutes = require('./routes/matchRoutes');

app.use('/api/users', userRoutes);
app.use('/api/interests', interestRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/matches', matchRoutes);


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('404', (req, res) => {
    res.render('404');
}); 

app.get('/matches', (req, res) => {
    res.render('matches');
});

app.post('/login', (req, res) => {
    res.redirect('/matches');
});


app.use((req, res, next) => {
    res.status(404).render('404');
  });

app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).send('Internal Server Error');
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;