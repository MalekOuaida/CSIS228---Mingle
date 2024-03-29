const db = require('../database/index');

const getUsers = (callback) => {
    const query = 'SELECT * FROM Users';
    db.query(query, (error, results, fields) => {
        if (error) {
            if (callback) callback(new Error('Error fetching users: ' + error.message), null);
        } else {
            if (callback) callback(null, results);
        }
    });
};

const insertUser = async (username, email, password, firstname, lastname, gender, birthdate, profilePictureUrl, bio) => {
    const query = 'INSERT INTO Users (username, email, password, firstname, lastname, gender, birthdate, profile_picture_url, bio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [username, email, password, firstname, lastname, gender, birthdate, profilePictureUrl, bio];

    try {
        const [result] = await db.query(query, values);
        console.log(result);    
        return result;
    } catch (error) {
        throw new Error('Error inserting user: ' + error.message);
    }
};


const authenticate = async (username, password) => { 
    const query = 'SELECT * FROM Users WHERE username = ? AND password = ?';
    try {
        const [users] = await db.query(query, [username, password]);

        if (users.length === 0) {
            throw new Error('Invalid login credentials');
        }

        return users[0];
    } catch (error) {
        throw new Error('Authentication error: ' + error.message);
    }
};

const updateUser = async (userId, updateData) => {
    const updateFields = Object.entries(updateData).map(([key, value]) => `${key} = "${value}"`).join(', ');
    const updateQuery = `UPDATE Users SET ${updateFields} WHERE user_id = ?`;

    try {
        const [result] = await db.query(updateQuery, [userId]);
        return result;
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};

const getUserProfile = async (userId) => {
    const query = 'SELECT * FROM Users WHERE user_id = ?';
    try {
        const [user] = await db.query(query, [userId]);
        return user;
    } catch (error) {
        throw new Error('Error fetching user profile: ' + error.message);
    }
};

const deleteUser = async (userId) => {
    const query = 'DELETE FROM Users WHERE user_id = ?';
    try {
        const [result] = await db.query(query, [userId]);
        return result;
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};

module.exports = {
    getUsers,
    insertUser,
    authenticate,
    updateUser,
    getUserProfile,
    deleteUser
};
