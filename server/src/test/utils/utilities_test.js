const assert = require('assert');
const util = require('../../utils/utilities');

describe('Utility functions', () => {
    describe('isValidURL', () => {
        it('should return true if valid url is being passed in', async () => {
            const isValid = await util.isValidURL('http://google.com');
            assert(isValid === true);
        });

        it('should return error if invalid url is being passed in', async() => {
            await assert.rejects(util.isValidURL('/google.com'));
        })
    })

    describe('idToShortURL', () => {
        it('should return shortUrl generated from id', (done) => {
            const id = 1;
            const shortUrl = util.idToShortURL(id);

            assert(shortUrl !== id);
            done();
        });

        it('shortURL should at least be 7 characters long', (done) => {
            const id = 1;
            const shortUrl = util.idToShortURL(id);

            assert(shortUrl.length === 7);
            done();
        })
    });
})