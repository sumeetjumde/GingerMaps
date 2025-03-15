const express = require('express');

const placesControllers = require('../controllers/places-controllers'); // Exports from controller having the routes logic.
const fileUpload = require('../middleware/file-upload');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const { ReturnDocument } = require('mongodb');

// Routes
router.get('/:pid',placesControllers.getPlaceById);

router.get('/user/:uid',placesControllers.getUserById);

/* My Code */
router.get('/',placesControllers.getAllPlaces);
/* My Code */

router.use(checkAuth);

router.post('/',fileUpload.single('image'),placesControllers.createdPlace);

router.patch('/:pid',placesControllers.updatePlaceById);

router.delete('/:pid',placesControllers.deletePlaceById);

//Export
module.exports = router;
