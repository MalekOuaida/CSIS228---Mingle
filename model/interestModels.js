const db = require('../database/index');

class InterestModel {
    static async findAll() {
        const query = 'SELECT * FROM Interest';
        try {
            const [interests] = await db.query(query);
            return interests;
        } catch (error) {
            throw new Error('Error fetching interests: ' + error.message);
        }
    }

    static async create({ userId, interest }) {
        const query = 'INSERT INTO Interest (user_id, interest) VALUES (?, ?)';
        const values = [userId, interest];

        try {
            const [result] = await db.query(query, values);
            return result;
        } catch (error) {
            throw new Error('Error creating interest: ' + error.message);
        }
    }

    static async findOneById(interestId) {
        const query = 'SELECT * FROM Interest WHERE InterestID = ?';
        try {
            const [interests] = await db.query(query, [interestId]);
            if (interests.length === 0) {
                throw new Error('Interest not found');
            }
            return interests[0];
        } catch (error) {
            throw new Error('Error fetching interest: ' + error.message);
        }
    }

    static async update(interestId, updateData) {
        const updateFields = Object.entries(updateData).map(([key, value]) => `${key} = "${value}"`).join(', ');
        const updateQuery = `UPDATE Interest SET ${updateFields} WHERE InterestID = ?`;

        try {
            const [result] = await db.query(updateQuery, [interestId]);
            return result;
        } catch (error) {
            throw new Error('Error updating interest: ' + error.message);
        }
    }

    static async delete(interestId) {
        const query = 'DELETE FROM Interest WHERE InterestID = ?';
        try {
            const [result] = await db.query(query, [interestId]);
            return result;
        } catch (error) {
            throw new Error('Error deleting interest: ' + error.message);
        }
    }
}

module.exports = InterestModel;
