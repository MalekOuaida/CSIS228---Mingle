const db = require('../database/index'); // Make sure this path is correct

const addLike = async (likerUserId, likedUserId) => {
    const query = 'INSERT INTO Likes (liker_user_id, liked_user_id) VALUES (?, ?)';
    const values = [likerUserId, likedUserId];

    try {
        const [result] = await db.query(query, values);
        return result;
    } catch (error) {
        throw new Error('Error adding like: ' + error.message);
    }
};

const checkMatch = async (likerUserId, likedUserId) => {
    // This is a simplified version of match checking logic
    const query = `
        SELECT * FROM Likes 
        WHERE liker_user_id = ? AND liked_user_id = ?
        OR liker_user_id = ? AND liked_user_id = ?
    `;
    try {
        const [matches] = await db.query(query, [likerUserId, likedUserId, likedUserId, likerUserId]);
        const isMatch = matches.length === 2; // Simplified match condition
        return isMatch;
    } catch (error) {
        throw new Error('Error checking match: ' + error.message);
    }
};

const deleteLike = async (likeId) => {
    const query = 'DELETE FROM Likes WHERE like_id = ?';
    try {
        const [result] = await db.query(query, [likeId]);
        return result;
    } catch (error) {
        throw new Error('Error deleting like: ' + error.message);
    }
};

module.exports = {
    addLike,
    checkMatch,
    deleteLike
};
