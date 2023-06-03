const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const { isLoggedIn, validateAttraction, isAuthor } = require('../middleware');
const japanplaces = require('../controllers/japanplaces');
const multer = require('multer')
// no need to specify index.js since node automatically look for it
const { storage } = require('../cloudinary');
// teling multer to store in the specified storage
const upload = multer({ storage })


router.route('/')
    // main page for japan attractions
    .get(catchAsync(japanplaces.index))
    // push the new attraction to /japango
    // post is where the form is submitted to
    // rmb to parse the req body
    // after upload.array('image'), we will have access to req.body and req.files that includes filename and path
    .post(isLoggedIn, upload.array('image'), validateAttraction, catchAsync(japanplaces.createJapanplace))
// note here that we are uploading the images first. Because you have req.body after you upload, validateAttraction depends on that


// route to serve the form to create new attraction
// have to go before /:id otherwise its thinkig new is id
router.get('/new', isLoggedIn, japanplaces.renderNewForm);

router.route('/:id')
    // page for showing individual attraction
    .get(catchAsync(japanplaces.showJapanplace))
    // route to push the change to /:id
    .put(isLoggedIn, isAuthor, upload.array('image'), validateAttraction, catchAsync(japanplaces.updateJapanplace))
    // route to delete the atraction and push to /:id
    .delete(isLoggedIn, isAuthor, catchAsync(japanplaces.deleteJapanplace))




// route to serve the form to edit attraction
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(japanplaces.renderEditForm))


module.exports = router;