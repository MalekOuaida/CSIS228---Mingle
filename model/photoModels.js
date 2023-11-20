const db = require('../database/index'); // Make sure this path is correct

class PhotoModel {
    static async findAll() {
        const query = 'SELECT * FROM Photos';
        try {
            const [photos] = await db.query(query);
            return photos;
        } catch (error) {
            throw new Error('Error fetching photos: ' + error.message);
        }
    }

    static async create({ userId, photoUrl }) {
        const query = 'INSERT INTO Photos (user_id, photo_url) VALUES (?, ?)';
        const values = [userId, photoUrl];

        try {
            const [result] = await db.query(query, values);
            return result;
        } catch (error) {
            throw new Error('Error creating photo: ' + error.message);
        }
    }

    static async findOneById(photoId) {
        const query = 'SELECT * FROM Photos WHERE photo_id = ?';
        try {
            const [photos] = await db.query(query, [photoId]);
            if (photos.length === 0) {
                throw new Error('Photo not found');
            }
            return photos[0];
        } catch (error) {
            throw new Error('Error fetching photo: ' + error.message);
        }
    }

    static async update(photoId, updateData) {
        const updateFields = Object.entries(updateData).map(([key, value]) => `${key} = "${value}"`).join(', ');
        const updateQuery = `UPDATE Photos SET ${updateFields} WHERE photo_id = ?`;

        try {
            const [result] = await db.query(updateQuery, [photoId]);
            return result;
        } catch (error) {
            throw new Error('Error updating photo: ' + error.message);
        }
    }

    static async delete(photoId) {
        const query = 'DELETE FROM Photos WHERE photo_id = ?';
        try {
            const [result] = await db.query(query, [photoId]);
            return result;
        } catch (error) {
            throw new Error('Error deleting photo: ' + error.message);
        }
    }
}

module.exports = PhotoModel;
