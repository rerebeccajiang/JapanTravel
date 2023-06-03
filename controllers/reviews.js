const Review = require('../models/review')
const Japanplace = require('../models/japanplace')

module.exports.createReview = async (req, res) => {
    // need to update both japanplace and review database
    const oneplace = await Japanplace.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    oneplace.reviews.push(review);
    await review.save();
    await oneplace.save();
    req.flash('success', 'Review created!')
    res.redirect(`/japango/${oneplace._id}`);
}

module.exports.deleteReview = async (req, res) => {
    // need to delete in both japanplace and review database
    const { id, reviewId } = req.params;
    await Japanplace.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review deleted!')
    res.redirect(`/japango/${id}`)
}