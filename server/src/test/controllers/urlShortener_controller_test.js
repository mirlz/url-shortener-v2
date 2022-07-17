require('dotenv').config();
const assert = require('assert');
const sinon = require('sinon');
const UrlShortenerController = require('../../controllers/urlShortener.controller');
const CounterController = require('../../controllers/counter.controller');
const util = require('../../utils/utilities');
const UrlShortener = require('../../models/urlShortener');

describe('urlShortener controller', ()=> {
    describe('if full url already existed in db', () => {
        before(() => {
            sinon.stub(UrlShortener, 'findOne').resolves({
                fullUrl: 'http://example.com/',
                shortUrl: '12345',
                countId: 1
            });
        });
    
        it('findShortUrlOrUpsert should return a full url with short URL of 12345', async() => {
            const genUrl = await UrlShortenerController.findShortUrlOrUpsert();
            assert(genUrl === `${process.env.webHost}/12345`)
        });
    
        after(() => {
            sinon.restore();
        });
    })
    describe('if full url does not exist in db', () => {
        before(() => {
            sinon.stub(UrlShortener, 'findOne').resolves();
            sinon.stub(UrlShortenerController, 'createNewShortURL').resolves('54321');
            sinon.stub(CounterController, 'incrementCounterAndSave').resolves(1);
            sinon.stub(util, 'idToShortURL').resolves('54321');
        });
    
        it('findShortUrlOrUpsert should return a full url with short URL of 4321', async() => {
            const genUrl = await UrlShortenerController.findShortUrlOrUpsert();
            assert(genUrl === `${process.env.webHost}/54321`)
        });
    
        after(() => {
            sinon.restore();
        });
    });
    describe('get long url from short url', () => {
        before(() => {
            sinon.stub(UrlShortener, 'findOne').resolves({
                fullUrl: 'http://example.com/',
                shortUrl: '12345',
                countId: 1
            });
        });

        it('getLongURLByShortId should return full url for redirection', async() => {
            const genUrl = await UrlShortenerController.getLongURLByShortId();
            assert(genUrl === `http://example.com/`)
        });

        after(() => {
            sinon.restore();
        });
    })
});