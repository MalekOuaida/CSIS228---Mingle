const express = require('express');
const router = express.Router();
const PhotoController = require('../controllers/photoController');
const { validatePhotoAdd, validatePhotoUpdate } = require('../validators/photoValidators');

// Route to add a new photo
router.post('/', validatePhotoAdd, PhotoController.addPhoto);

// Route to update an existing photo
router.put('/:photoId', validatePhotoUpdate, PhotoController.updatePhoto);

// Route to get a specific photo
router.get('/:photoId', PhotoController.getPhoto);

// Route to delete a photo
router.delete('/:photoId', PhotoController.deletePhoto);

// Route to get all photos
router.get('/', PhotoController.getAllPhotos);

module.exports = router;
