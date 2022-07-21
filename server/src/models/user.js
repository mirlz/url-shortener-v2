const mongoose = require('mongoose');
const util = require('../utils/utilities');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: {
            validator: ((email) => {
                return util.validateEmail(email);
            }),
            message: 'Please fill a valid email address'
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true
    },
    token: {
        type: String
    },
    shortUrl: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'urlShortener'
    }]
});

UserSchema.virtual('shortUrlCount').get(function(){
    return this.shortUrl.length;
});

const url = mongoose.model('User', UserSchema);
module.exports = url;