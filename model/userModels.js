const db = require('../database/index');

class UserModel {
    static async findAll() {
        const query = 'SELECT * FROM Users';
        try {
            const [users] = await db.query(query);
            return users;
        } catch (error) {
            throw new Error('Error fetching users: ' + error.message);
        }
    }

    static async create({ username, email, password, firstname, lastname, gender, birthdate, profilePictureUrl, bio }) {
        const query = `
            INSERT INTO Users (username, email, password, firstname, lastname, gender, birthdate, profile_picture_url, bio)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [username, email, password, firstname, lastname, gender, birthdate, profilePictureUrl, bio];

        try {
            const [result] = await db.query(query, values);
            return result;
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    }

    static async findOneById(userId) {
        const query = 'SELECT * FROM Users WHERE user_id = ?';
        try {
            const [users] = await db.query(query, [userId]);
            if (users.length === 0) {
                throw new Error('User not found');
            }
            return users[0];
        } catch (error) {
            throw new Error('Error fetching user: ' + error.message);
        }
    }

    static async update(userId, updateData) {
        const updateFields = Object.entries(updateData).map(([key, value]) => `${key} = "${value}"`).join(', ');
        const updateQuery = `UPDATE Users SET ${updateFields} WHERE user_id = ?`;

        try {
            const [result] = await db.query(updateQuery, [userId]);
            return result;
        } catch (error) {
            throw new Error('Error updating user: ' + error.message);
        }
    }

    static async delete(userId) {
        const query = 'DELETE FROM Users WHERE user_id = ?';
        try {
            const [result] = await db.query(query, [userId]);
            return result;
        } catch (error) {
            throw new Error('Error deleting user: ' + error.message);
        }
    }
}

module.exports = UserModel;
