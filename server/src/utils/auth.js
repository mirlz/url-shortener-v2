require('dotenv').config();
const jwt =require('jsonwebtoken');
const User = require('../models/user');

async function auth(req, res, next) {
    try {
        const authHeader = req.header('authorization');

        //check token
        if(authHeader==null){
            return res.status(401).json({error:"Access-denied"});
        }

        //check validity
        const decoded = jwt.verify(authHeader, process.env.authTokenHashKey);
        const user = await User.findOne({ _id: decoded._id, token: authHeader});

        if(!user) {
            throw 'Please authenticate!';
        }

        req.token = authHeader;
        req.user = user;
        next();
    } catch (e) {
        res.status(400).json(e);
    }
};

module.exports = auth;