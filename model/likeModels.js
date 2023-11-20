const db = require('../database/index'); // Make sure this path is correct

class LikesModel {
    static async addLike(likerUserId, likedUserId) {
        const query = 'INSERT INTO Likes (liker_user_id, liked_user_id) VALUES (?, ?)';
        const values = [likerUserId, likedUserId];

        try {
            const [result] = await db.query(query, values);
            return result;
        } catch (error) {
            throw new Error('Error adding like: ' + error.message);
        }
    }

    static async checkMatch(likerUserId, likedUserId) {
        // Check if both users have liked each other
        const query = `
            SELECT * FROM Likes 
            WHERE (liker_user_id = ? AND liked_user_id = ?) 
            OR (liker_user_id = ? AND liked_user_id = ?)
        `;
        try {
            const [likes] = await db.query(query, [likerUserId, likedUserId, likedUserId, likerUserId]);
            const isMatch = likes.length === 2;
            return isMatch;
        } catch (error) {
            throw new Error('Error checking match: ' + error.message);
        }
    }

    static async deleteLike(likeId) {
        const query = 'DELETE FROM Likes WHERE like_id = ?';
        try {
            const [result] = await db.query(query, [likeId]);
            return result;
        } catch (error) {
            throw new Error('Error deleting like: ' + error.message);
        }
    }
}

module.exports = LikesModel;
