// Import necessary Node.js modules
const express = require('express'); 
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path'); 
const MySQL = require('mysql');

// Load environment variables from .env file.
dotenv.config();

// Import the 'db' module, which is responsible for handling database connections.
const db = require('./database/index');

// Create an Express application.
const app = express();

// Set up middleware for parsing JSON and URL-encoded data in requests.
app.use(bodyParser.json()); // Parse JSON data in the request body.
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data in the request body.

// Serve static files from the 'public' directory.
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine for rendering dynamic content (using EJS templates).
app.set('view engine', 'ejs');

// Test the MySQL database connection.
db.query('SELECT 1', (err, results) => {
    if (err) {
        console.error('Error testing the MySQL database connection:', err);
        return;
    }
    console.log('Database connection test successful');
});

// Import routes for various parts of the application.
const userRoutes = require('./routes/userRoutes');
const interestRoutes = require('./routes/interestRoutes');
const photoRoutes = require('./routes/photoRoutes');
const likeRoutes = require('./routes/likesRoutes');
const matchRoutes = require('./routes/matchRoutes');

// Import controllers and validators for user-related functionality.
const { insertUserController, displayUsersForMatchesController } = require('./controllers/UserController');
const { validateRegistration } = require('./validators/userValidators');

// Define routes and attach route handlers.
app.use('/api/users', userRoutes);
app.use('/api/interests', interestRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/matches', matchRoutes);

// Define a route for the home page.
app.get('/', (req, res) => {
    res.render('index'); // Render the 'index' template when the root URL is accessed.
});

// Define a route for the login page (GET request).
app.get('/login', (req, res) => {
    res.render('login', { error: null }); // Render the 'login' template with no error initially.
});

// Define a route for handling login requests (POST request).
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    console.log("Received login request for email:", email);

    // Define a SQL query to retrieve user information based on the provided email.
    const query = 'SELECT user_id, password FROM Users WHERE email = ?';
    
    // Execute the SQL query to check the user's credentials.
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.render('login', { error: 'An error occurred. Please try again.' });
        }

        if (results.length === 0) {
            return res.render('login', { error: 'Invalid email or password' });
        }

        const user = results[0];
        
        // Check if the provided password matches the one stored in the database.
        if (user.password !== password) {
            return res.render('login', { error: 'Invalid email or password' });
        }

        // Authentication successful, redirect to the 'matches' page.
        res.redirect('/matches');
    });
});

// Define a route for the signup page (GET request).
app.get('/signup', (req, res) => {
    res.render('signup'); // Render the 'signup' template.
});

// Define a route for handling signup requests (POST request) and apply validation.
app.post('/signup', validateRegistration, insertUserController);

// Define a route for the '404 Not Found' page.
app.get('404', (req, res) => {
    res.render('404'); // Render the '404' template.
});

// Define a route for the 'matches' page.
app.get('/matches', (req, res) => {
    res.render('matches'); // Render the 'matches' template.
});

// Define a route for the 'profile' page.
app.get('/profile', (req, res) => {
    res.render('profile'); // Render the 'profile' template.
});

// Define a route for the 'editprofile' page.
app.get('/editprofile', (req, res) => {
    res.render('editprofile'); // Render the 'editprofile' template.
});

// Define a catch-all route for handling 404 errors (not found).
app.use((req, res, next) => {
    res.status(404).render('404', { error: null }); // Render the '404' template with no error initially.
});

// Define a catch-all error handler for handling internal server errors.
app.use((error, req, res, next) => {
    console.error(error); // Log the error to the console.
    res.status(500).send('Internal Server Error'); // Send a generic error response.
});

// Define the port number to listen on, using the environment variable 'PORT' or default to 3002.
const PORT = process.env.PORT || 3002;

// Start the Express server on the specified port.
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Export the 'app' object for use in other modules (if needed).
module.exports = app;