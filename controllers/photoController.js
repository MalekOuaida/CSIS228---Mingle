const { validationResult } = require('express-validator');
const { insertPhoto, updatePhoto, getPhotoById, deletePhoto, getPhotos } = require('../services/photoServices');

const addPhotoController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, photoUrl } = req.body;
    try {
        const newPhoto = await insertPhoto(userId, photoUrl);
        res.status(200).json({ message: "Photo added successfully", newPhoto });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

const updatePhotoController = async (req, res) => {
    const { photoId } = req.params;
    const { photoUrl } = req.body;
    try {
        const updatedPhoto = await updatePhoto(photoId, photoUrl);
        res.status(200).json({ message: "Photo updated successfully", updatedPhoto });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

const getPhotoController = async (req, res) => {
    const { photoId } = req.params;
    try {
        const photo = await getPhotoById(photoId);
        res.status(200).json({ photo });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

const deletePhotoController = async (req, res) => {
    const { photoId } = req.params;
    try {
        await deletePhoto(photoId);
        res.status(200).json({ message: "Photo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

const getAllPhotosController = async (req, res) => {
    try {
        const photos = await getPhotos();
        res.status(200).json({ photos });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

module.exports = {
    addPhotoController,
    updatePhotoController,
    getPhotoController,
    deletePhotoController,
    getAllPhotosController
};
