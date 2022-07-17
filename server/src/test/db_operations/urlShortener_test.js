const assert = require('assert');
const UrlShortener = require('../../models/urlShortener');

describe('db_test: urlshorteners collection', () => {
    describe('validation test', () => {
        it('should disallow invalid records from being saved if fullUrl is not passed in', (done) => {
            const url = new UrlShortener({ countId: 1, shortUrl: '1234'});
            url.save().catch((validationRes) => {
                const { message } = validationRes.errors.fullUrl;

                assert(message === 'fullUrl is required.');
                done();
            })
        });
        it('should disallow invalid records from being saved if shortUrl is not passed in', (done) => {
            const url = new UrlShortener({ countId: 1, fullUrl: 'http://example.com/'});
            url.save().catch((validationRes) => {
                const { message } = validationRes.errors.shortUrl;

                assert(message === 'shortUrl is required.');
                done();
            })
        });
        it('should disallow invalid records from being saved if countId is not passed in', (done) => {
            const url = new UrlShortener({ fullUrl: 'http://example.com/', shortUrl: '1234'});
            url.save().catch((validationRes) => {
                const { message } = validationRes.errors.countId;

                assert(message === 'countId is required.');
                done();
            })
        });
    });

    describe('create / read record test', () => {
        before((done) => {
            const newUrl = UrlShortener({
                fullUrl: 'http://example.com/',
                shortUrl: '1234',
                countId: 1
            });

            newUrl.save().then(() => {
                done();
            })
        })
        it('record should be created successfully', (done) => {
            UrlShortener.find({ fullUrl: 'http://example.com/'})
                .then((docs) => {
                    assert(docs.length === 1);
                    done();
                })
        });
        it('find record with fullUrl', (done) => {
            UrlShortener.findOne({ fullUrl: 'http://example.com/'})
                .then((doc) => {
                    assert(doc.shortUrl === '1234');
                    done();
                });
        });
    });
})