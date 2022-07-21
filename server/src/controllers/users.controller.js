require('dotenv').config();
const User = require('../models/user');
const util = require('../utils/utilities');
var jwt = require('jsonwebtoken');

async function findExistingUserOrUpsert(user) {
    try { 
        const existingUser = await User.findOne( {email: user.email });
        if(existingUser) {
            throw `User with ${user.email} already registered!`; 
        }
        const hashedPassword =  await util.hashPassword(user.password);
        const newUser = new User({
            email: user.email,
            password: hashedPassword
        });

        const created = await newUser.save();
        return created;
    }
    catch(e) {
        console.log('findExistingUserOrUpsert error: ', e);
        throw e;
    }
};

async function loginUser(user) {
    try {
        const existingUser = await User.findOne( {email: user.email });
        const isMatched = await util.comparePassword(existingUser, user.password);

        if(!isMatched) {
            throw 'Unable to login!';
        }
        const token = await generateAuthToken(existingUser);

        return token;
    } catch (e) {
        console.log('loginUser error: ', e);
        throw e;
    }
}

async function generateAuthToken(user) {
    const token = jwt.sign({ _id: user._id.toString() }, process.env.authTokenHashKey);

    user.token = token; 
    await user.save();
    
    return token;
}

async function storeShortUrl(user, shortUrl) {
    try {
        if(shortUrl) {
            const existingShortUrlInUser = user.shortUrl.includes(shortUrl._id);
            // only save again if shortUrl does not exist in user
            if(!existingShortUrlInUser) {
                user.shortUrl.push(shortUrl);
                const updatedUserItem = await user.save(); 

                return updatedUserItem;
            }
            return user;
        }
        throw new Error();
    } catch (e) {
        console.log('storeShortUrl error: ', e);
        throw e;
    }
}

module.exports = { findExistingUserOrUpsert, loginUser, storeShortUrl };