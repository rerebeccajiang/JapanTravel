const Japanplace = require('../models/japanplace')
const { cloudinary } = require("../cloudinary")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;

const geocodingService = mbxGeocoding({ accessToken: mapBoxToken });

module.exports.index = async (req, res, next) => {
    var noMatch = null;
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        const places = await Japanplace.find({ name: regex })
        if (places.length < 1) {
            noMatch = "No attractions found, please try again.";
        }
        res.render('place/index', { places, noMatch });
    } else {
        const places = await Japanplace.find({})
        res.render('place/index', { places, noMatch });
    }

}

module.exports.renderNewForm = (req, res) => {
    res.render('place/new');
}

module.exports.createJapanplace = async (req, res, next) => {
    const geoData = await geocodingService.forwardGeocode({
        query: req.body.attraction.location,
        limit: 1
    }).send()
    const newplace = new Japanplace(req.body.attraction);
    //geojson comes from mapbox API
    newplace.geometry = geoData.body.features[0].geometry;
    // take path and filename from multer and cloudinary, put that in the array of images
    newplace.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    // link this place to user
    newplace.author = req.user._id;
    await newplace.save();
    // add flash key value pair 
    req.flash('success', 'Attraction created!');
    res.redirect(`/japango/${newplace._id}`)
}

module.exports.showJapanplace = async (req, res, next) => {
    // we need to do a nested populate for reviews
    // since now not only do we need to populate the author of the place, but also authors of all reviews
    // populate all reviews from the place we fonud by id, and populate all its reviews
    // then populate the author for each review
    // finally, .populate('author') to populate that one author on oneplace
    const oneplace = await Japanplace.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!oneplace) {
        req.flash('error', 'Cannot find that attraction!');
        return res.redirect('/japango')
    }
    res.render('place/show', { oneplace });
}

module.exports.renderEditForm = async (req, res, next) => {
    const oneplace = await Japanplace.findById(req.params.id)
    if (!oneplace) {
        req.flash('error', 'Cannot find that attraction!');
        return res.redirect('/japango')
    }
    res.render('place/edit', { oneplace });
}

module.exports.updateJapanplace = async (req, res, next) => {
    const { id } = req.params;
    //console.log(req.body)
    //we grouped it under attractions 
    /// ... to spread it
    const oneplace = await Japanplace.findByIdAndUpdate(id, { ...req.body.attraction })
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    // instead of passing the entire array, spread the array and pass each elements to images
    oneplace.images.push(...imgs)
    await oneplace.save();

    // if there is images from deleteImages, pull the images where the filename is in the req.body.deleteImages array
    if (req.body.deleteImages) {
        //delete from cloudinary
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename)
        }
        //delete images from mongodb
        await oneplace.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Attraction updated!')
    res.redirect(`/japango/${oneplace._id}`)
}

module.exports.deleteJapanplace = async (req, res, next) => {
    const { id } = req.params;
    // we need to delete contents related to this 
    await Japanplace.findByIdAndDelete(id);
    req.flash('success', 'Attraction deleted!')
    res.redirect('/japango')
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};