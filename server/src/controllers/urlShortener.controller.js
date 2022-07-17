require('dotenv').config();
const UrlShortener = require('../models/urlShortener');
const CounterController = require('./counter.controller');
const util = require('../utils/utilities');

async function findShortUrlOrUpsert(url, res) {
    try {
        const doc = await UrlShortener.findOne({ fullUrl: url });
        if(!doc) {
            const generatedShortUrl = await createNewShortURL(url);
            return `${process.env.webHost}/${generatedShortUrl}`;
        } else {
            const { shortUrl } = doc;
            return `${process.env.webHost}/${shortUrl}`;
        }
    } catch(e) {
        console.log('findShortUrlOrUpsert error: ', e);
        return e;
    }
};

async function createNewShortURL(origUrl) {
    try {
        const counter = await CounterController.incrementCounterAndSave();
        const shortUrl = util.idToShortURL(counter);

        const newUrl = new UrlShortener({
            fullUrl: origUrl,
            shortUrl: shortUrl,
            countId: counter
        });

        newUrl.save();
        return shortUrl;
    } catch (e) {
        console.log('createnewShortURL error: ', e);
        return e;
    }
}

async function getLongURLByShortId(shortId) {
    try {
        const doc = await UrlShortener.findOne({ shortUrl: shortId });
        if(doc) {
            const { fullUrl } = doc;

            return fullUrl;
        } else {
            return;
        }
    } catch(e) {
        console.log('getLongURLByShortId error: ', e);
        return e;
    }
}

module.exports = { findShortUrlOrUpsert, createNewShortURL, getLongURLByShortId };