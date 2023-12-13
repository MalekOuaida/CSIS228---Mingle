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

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

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

app.get('/profile/:id', (req, res) => {
const userId = req.params.id;
const query = `SELECT * FROM users WHERE user_id = ?`;
db.query(query, [userId], (err, results) => {
    if (err) {
        console.error(err);
        res.status(500).send('Database qeury failed');
        return;
    }
    if(results.length > 0){
        const userData = result[0];
        res.render('profile', {userData});
    } else {
        res.status(404).send('User not found');
        }
    });
});

app.get('/user/:id/interests', (req, res) => {
    const userId = req.params.id;
    const query = 'SELECT * FROM Interest WHERE user_id = ?';

    db.query(query, [userId], (err, interests) => {
        if (err) {
            res.status(500).send('Database query failed');
            return;
        }
        res.render('interests', { interests });
    });
});


app.post('/user/:id/interests', (req, res) => {
    const userId = req.params.id;
    const { interest } = req.body;
    const query = 'INSERT INTO Interest (user_id, interest) VALUES (?, ?)';

    db.query(query, [userId, interest], (err, result) => {
        if (err) {
            res.status(500).send('Failed to add interest');
            return;
        }
        res.redirect(`/user/${userId}/interests`);
    });
});

app.get('/user/:id/photos', (req, res) => {
    const userId = req.params.id;
    const query = 'SELECT * FROM Photos WHERE user_id = ?';

    db.query(query, [userId], (err, photos) => {
        if (err) {
            res.status(500).send('Database query failed');
            return;
        }
        res.render('photos', { photos });
    });
}
);

app.post('/user/:id/photos', (req, res) => {
    const userId = req.params.id;
    const { url } = req.body;
    const query = 'INSERT INTO Photos (user_id, photo_url) VALUES (?, ?)';

    db.query(query, [userId, url], (err, result) => {
        if (err) {
            res.status(500).send('Failed to add photo');
            return;
        }
        res.redirect(`/user/${userId}/photos`);
    });
}
);

app.get('/user/:id/likes', (req, res) => {
    const userId = req.params.id;
    const query = 'SELECT * FROM Likes WHERE liker_user_id = ?';

    db.query(query, [userId], (err, likes) => {
        if (err) {
            res.status(500).send('Database query failed');
            return;
        }
        res.render('user-likes', { likes });
    });
}
);

app.post('/like', (req, res) => {
    const { likerUserId, likedUserId } = req.body;
    const query = 'INSERT INTO Likes (liker_user_id, liked_user_id) VALUES (?, ?)';

    db.query(query, [likerUserId, likedUserId], (err, result) => {
        if (err) {
            res.status(500).send('Failed to add like');
            return;
        }
        res.redirect(`/user/${likerUserId}/likes`);
    });
});

app.get('/user/:id/matches', (req, res) => {
    const userId = req.params.id;
    const query = `
        SELECT * FROM Matches 
        WHERE liker_user_id = ? OR liked_user_id = ?`;

    db.query(query, [userId, userId], (err, matches) => {
        if (err) {
            res.status(500).send('Database query failed');
            return;
        }
        res.render('user-matches', { matches });
    });
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