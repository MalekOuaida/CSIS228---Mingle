const db = require('../database/index'); // Make sure this path is correct

const getPhotos = async () => {
    const query = 'SELECT * FROM Photos';
    try {
        const [photos] = await db.query(query);
        return photos;
    } catch (error) {
        throw new Error('Error fetching photos: ' + error.message);
    }
};

const insertPhoto = async (userId, photoUrl) => {
    const query = 'INSERT INTO Photos (user_id, photo_url) VALUES (?, ?)';
    const values = [userId, photoUrl];

    try {
        const [result] = await db.query(query, values);
        return result;
    } catch (error) {
        throw new Error('Error inserting photo: ' + error.message);
    }
};

const getPhotoById = async (photoId) => {
    const query = 'SELECT * FROM Photos WHERE photo_id = ?';
    try {
        const [photo] = await db.query(query, [photoId]);
        if (photo.length === 0) {
            throw new Error('Photo not found');
        }
        return photo[0];
    } catch (error) {
        throw new Error('Error fetching photo: ' + error.message);
    }
};

const updatePhoto = async (photoId, photoUrl) => {
    const query = 'UPDATE Photos SET photo_url = ? WHERE photo_id = ?';
    try {
        const [result] = await db.query(query, [photoUrl, photoId]);
        return result;
    } catch (error) {
        throw new Error('Error updating photo: ' + error.message);
    }
};

const deletePhoto = async (photoId) => {
    const query = 'DELETE FROM Photos WHERE photo_id = ?';
    try {
        const [result] = await db.query(query, [photoId]);
        return result;
    } catch (error) {
        throw new Error('Error deleting photo: ' + error.message);
    }
};

module.exports = {
    getPhotos,
    insertPhoto,
    getPhotoById,
    updatePhoto,
    deletePhoto
};
