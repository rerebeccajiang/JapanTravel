const { attractionSchema, reviewSchema } = require('./schemas.js')
const ExpressError = require('./utils/ExpressError');
const Japanplace = require('./models/japanplace.js');
const Review = require('./models/review');

// put it in middleware so that we can apply this to every route we want to protect
// note this only protect the form, cannot prevent anyone who send request from Postman
module.exports.isLoggedIn = (req, res, next) => {
    // isAuthenticated() comes with passport 
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in')
        return res.redirect('/login')
    }
    next();
}


// use Joi to validate data before saving to database
// define middleware here so that it can be used to route you want 
module.exports.validateAttraction = (req, res, next) => {

    // once schema is defined, we will pass the data through the schema
    const { error } = attractionSchema.validate(req.body)
    //if the validate() method returns an error object, that error object has an array detailing where the error comes from, called details, and Colt iterates over error.details using the map() method. Each item of that array has a property, message, and map() retrieves the message string from each element. Then, after that is finished, the resulting array is chained to a join() method, that will iterate over that array and concatenate all messages with a  comma between them, returning a single string.
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        //have to call next() 
        //otherwise the rest of the code inside the route will not be ran
        next();
    }
}

// middleware to validate if current user is changing his own post
module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const oneplace = await Japanplace.findById(id);
    if (!oneplace.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/japango/${id}`);
    }
    //else you are good to go
    next();
}

// middleware to validate if current user is changing his own post
module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/japango/${id}`);
    }
    //else you are good to go
    next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        //have to call next() 
        //otherwise the rest of the code inside the route will not be ran
        next();
    }
}