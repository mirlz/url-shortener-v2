const assert = require('assert');
const mongoose = require('mongoose');
const sinon = require('sinon');
const CounterController = require('../../controllers/counter.controller');
const Counter = require('../../models/counter');

describe('counter controller', ()=> {
    before(() => {
        sinon.stub(Counter, 'findByIdAndUpdate').resolves({ 
            _id: 'counterId',
             __v: 0, seq: 1 
        });
    });

    it('incrementCounterAndSave function should initiate with counter of 1', async () => {
        const counter = await CounterController.incrementCounterAndSave();

        assert(counter === 1);
    });

    after(() => {
        sinon.restore();
    });
});