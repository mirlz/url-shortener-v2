const assert = require('assert');
const mongoose = require('mongoose');
const Counter = require('../../models/counter');

describe('db_test: counter collection', () => {
    let counter; 
 
    beforeEach(async() => {
        counter = await Counter.findByIdAndUpdate(
            { _id: 'counterId' },
            { $inc: { seq: 1 } }, 
            { new: true, upsert: true }
        );
    });

    it('seq should increase by 1', (done) => {
        assert(counter.seq === 1);
        done();
    });

    it('record in counter collection should only have 1 by this point', (done) => {
        Counter.find({})
            .then(doc => {
                assert(doc.length === 1);
                done();
            })
    });
});