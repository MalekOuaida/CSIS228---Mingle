const db = require('../database/index'); // Make sure this path is correct

const checkMatch = async (userId1, userId2) => {
    const query = `
        SELECT * FROM Matches 
        WHERE (liker_user_id = ? AND liked_user_id = ?) 
        OR (liker_user_id = ? AND liked_user_id = ?)
    `;
    try {
        const [matches] = await db.query(query, [userId1, userId2, userId2, userId1]);
        const isMatch = matches.length > 0; // Assuming a match exists if there are any rows
        return isMatch;
    } catch (error) {
        throw new Error('Error checking match: ' + error.message);
    }
};

const getMatchesForUser = async (userId) => {
    const query = `
        SELECT * FROM Matches 
        WHERE liker_user_id = ? OR liked_user_id = ?
    `;
    try {
        const [matches] = await db.query(query, [userId, userId]);
        return matches;
    } catch (error) {
        throw new Error('Error fetching matches for user: ' + error.message);
    }
};

module.exports = {
    checkMatch,
    getMatchesForUser
};
