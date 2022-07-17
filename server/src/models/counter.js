const mongoose = require('mongoose');

var CounterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

var counter = mongoose.model('counter', CounterSchema);

module.exports = counter;