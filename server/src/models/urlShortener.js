const mongoose = require('mongoose');
const util = require('../utils/utilities');
const CounterController = require('../controllers/counter.controller');

const ShortenURLSchema = new mongoose.Schema({
    countId: {
        type: Number
    },
    fullUrl: {
        type: String,
        required: [true, 'fullUrl is required.'],
    },
    shortUrl: {
        type: String
    },
    expiredAt: {
        type: Date,
        default: util.setExpiry()
    }
});

ShortenURLSchema.pre('save', async function(next) {
    const shortUrl = this;

    try {
        const genCounter = await CounterController.incrementCounterAndSave();
        const genId = util.idToShortURL(genCounter);

        shortUrl.shortUrl = genId;
        shortUrl.countId = genCounter;

        next();
    } catch (e) {
        console.log('ShortenURLSchema pre-save error: ', e);
        return e;
    }
})

const url = mongoose.model('urlShortener', ShortenURLSchema);
module.exports = url;