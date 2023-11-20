const db = require('../database/index'); // Make sure this path is correct

class MatchModel {
    static async checkMatch(userId1, userId2) {
        // Example query to check for a match
        const query = `
            SELECT * FROM Matches
            WHERE (liker_user_id = ? AND liked_user_id = ?)
            OR (liker_user_id = ? AND liked_user_id = ?)
        `;
        try {
            const [matches] = await db.query(query, [userId1, userId2, userId2, userId1]);
            const isMatch = matches.length > 0; // Simplified match condition
            return isMatch;
        } catch (error) {
            throw new Error('Error checking match: ' + error.message);
        }
    }

    static async getMatchesForUser(userId) {
        // Example query to retrieve all matches for a user
        const query = 'SELECT * FROM Matches WHERE liker_user_id = ? OR liked_user_id = ?';
        try {
            const [matches] = await db.query(query, [userId, userId]);
            return matches;
        } catch (error) {
            throw new Error('Error retrieving matches: ' + error.message);
        }
    }
}

module.exports = MatchModel;
