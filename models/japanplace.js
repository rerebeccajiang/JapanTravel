const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');


// we are using virtual property to dynamitically change image url for display (less pixels)
// but it only works on schema so we separate out imageschema 
const ImageSchema = new Schema({
    url: String,
    filename: String
})

// this is not stored in the database, it is just derived 
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200')
})

const opts = { toJSON: { virtuals: true } };

const JapanPlaceSchema = new Schema({
    name: String,
    images: [ImageSchema],
    geometry:
    {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts)


// want a virtual that has popUpMarkup nested in the properties
JapanPlaceSchema.virtual('properties.popUpMarkup').get(function () {
    return `<strong><a href="japango/${this._id}">${this.name}</a><strong>`;
})

JapanPlaceSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Japanplace', JapanPlaceSchema);