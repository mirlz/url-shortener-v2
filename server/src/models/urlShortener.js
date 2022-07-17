const mongoose = require('mongoose');

const ShortenURLSchema = new mongoose.Schema({
    countId: {
        type: Number,
        required: [true, 'countId is required.'],
    },
    fullUrl: {
        type: String,
        required: [true, 'fullUrl is required.'],
    },
    shortUrl: {
        type: String,
        required: [true, 'shortUrl is required.'],
    }
});

const url = mongoose.model('urlShortener', ShortenURLSchema);
module.exports = url;