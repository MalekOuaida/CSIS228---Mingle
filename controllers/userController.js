const { validationResult } = require('express-validator');
const { getUsers, insertUser, authenticate, updateUser, getUserProfile, deleteUser } = require('../services/userServices');

// Controller for user authentication

const authenticateController = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(401).json({ message: "Missing username or password" });
    }

    try {
        const user = await authenticate(username, password);
        res.status(200).json({ message: "Authenticated", user, token });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

// Controller for fetching all users
const getUsersController = async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

// Controller for inserting a new user
const insertUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('signup', { errors: errors.array() });
    }

    const { username, email, password, firstname, lastname, gender, birthdate, profilePictureUrl, bio } = req.body;
    try {
        const newUser = await insertUser(username, email, password, firstname, lastname, gender, birthdate, profilePictureUrl, bio);
        res.redirect('/login');
    } catch (error) {
        res.redirect('/login');
    }
};

// Controller for updating user information
const updateUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.params.userId;
    const updateData = req.body;
    try {
        const updatedUser = await updateUser(userId, updateData);
        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

// Controller for fetching a user's profile
const getUserProfileController = async (req, res) => {
    const userId = req.params.userId;
    try {
        const userProfile = await getUserProfile(userId);
        res.status(200).json({ userProfile });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

// Controller for deleting a user
const deleteUserController = async (req, res) => {
    const userId = req.params.userId;
    try {
        await deleteUser(userId);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};


/*const displayUsersForMatchesController = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.render('matches', { users });
    } catch (error) {
        console.log(error);
        throw new Error('Error fetching users: ' + error.message);
    }
};
*/

module.exports = {
    authenticateController,
    getUsersController,
    insertUserController,
    updateUserController,
    getUserProfileController,
    deleteUserController,
    //displayUsersForMatchesController,
};