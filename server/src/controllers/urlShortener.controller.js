require('dotenv').config();
const UrlShortener = require('../models/urlShortener');

async function findShortUrlOrUpsert(url, res) {
    try {
        const doc = await UrlShortener.findOne({ 
            fullUrl: url,
            expiredAt: {
                $gte:  new Date(),
            } 
        });
        if(!doc) {
            const shortUrlItem = await createNewShortURL(url);
            return shortUrlItem;
        } else {
            return doc;
        }
    } catch(e) {
        console.log('findShortUrlOrUpsert error: ', e);
        return e;
    }
};

async function createNewShortURL(origUrl) {
    try {
        const newUrl = new UrlShortener({
            fullUrl: origUrl,
        });

        const shortUrlItem = await newUrl.save();
        return shortUrlItem;
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