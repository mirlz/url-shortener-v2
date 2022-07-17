const Counter = require('../models/counter');

async function incrementCounterAndSave() {
    try {
        const count = await Counter.findByIdAndUpdate(
            { _id: 'counterId' },
            { $inc: { seq: 1 } }, 
            { new: true, upsert: true }
        );

        return count.seq;
    } catch (e) {
        console.log('increment counter error: ', e);
        throw e;
    }
}

module.exports = {incrementCounterAndSave};