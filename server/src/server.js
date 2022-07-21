require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const ShortenURLController = require('./controllers/urlShortener.controller');
const UsersController = require('./controllers/users.controller');
const app = express();
const util = require('./utils/utilities');
const auth = require('./utils/auth');
const bodyParser = require("body-parser");

mongoose.connect(`mongodb://${process.env.dbHost}/${process.env.dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("connected to db"))
    .catch(() => console.log("error connecting"));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.post('/shortenUrl', auth, async (req, res) => {
    const { longURL } = req.body;
    const { user } = req;

    try {
        const isValid = await util.isValidURL(longURL);

        if (isValid) {
            const genUrl = await ShortenURLController.findShortUrlOrUpsert(longURL);
            await UsersController.storeShortUrl(user, genUrl);
            res.send(`${process.env.webHost}/${genUrl.shortUrl}`);
        }
    }
    catch (e) {
        console.log('POST: /shortenUrl error: ',e)
        res.status(400).send(e);
    }
});

app.get('/:shortId', async (req, res) => {
    const { shortId } = req.params;

    try {
        const genUrl = await ShortenURLController.getLongURLByShortId(shortId, res);

        if (genUrl) {
          return res.redirect(genUrl);
        } else {
            res.status(404).json('Not found');
        }
      } catch (err) {
        console.log('GET: /:shortId error: ',err);
        res.status(500).json('Server Error');
    }
});

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const user = { email, password };

    try {
        const createdUser = await UsersController.findExistingUserOrUpsert(user);
        res.status(200);
        res.send(`${createdUser.email} is created!`);
    } catch (err) {
        console.log('POST /register error: ', err);
        res.status(400).json(err);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = { email, password };

    try {
        const sessionToken = await UsersController.loginUser(user);
        res.status(200);
        res.send(sessionToken);
    } catch (err) {
        console.log('POST /login error: ', err);
        res.status(400).json(err);
    }
});

app.post('/logout', auth, async(req, res) => {
    const { user } = req;

    try { 
        user.token = '';
        await user.save();

        res.send('Logout successfully!')
    } catch (e) {
        res.status(500).json(e);
    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Express running → PORT ${process.env.PORT || 3000}`);
});