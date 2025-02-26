const express = require('express');

const userController = require('../controllers/user-controllers'); // Exports from controller having the routes logic.

const fileUpload = require('../middleware/file-upload');
const router = express.Router();

// Routes
router.get('/',userController.getUsers);

router.post('/signup',fileUpload.single('image'),userController.signup);

router.post('/login',userController.login);


//Export
module.exports = router;