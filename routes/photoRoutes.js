const express = require('express');
const router = express.Router();
const PhotoController = require('../controllers/photoController');
const { validatePhotoAdd, validatePhotoUpdate } = require('../validators/photoValidators');

// Route to add a new photo
router.post('/', validatePhotoAdd, PhotoController.addPhotoController);

// Route to update an existing photo
router.put('/:photoId', validatePhotoUpdate, PhotoController.updatePhotoController);

// Route to get a specific photo
router.get('/:photoId', PhotoController.getPhotoController);

// Route to delete a photo
router.delete('/:photoId', PhotoController.deletePhotoController);

// Route to get all photos
router.get('/', PhotoController.getAllPhotosController);

module.exports = router;
