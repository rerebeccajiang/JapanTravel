const express = require('express');
// {mergeParams:true} to make sure routes are merged and you have access if :id
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const reviews = require('../controllers/reviews')

const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError');



// route to push review to /
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

// route to delete review
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router