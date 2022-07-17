require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const ShortenURLController = require('./controllers/urlShortener.controller');
const app = express();
const util = require('./utils/utilities');
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

app.post('/shortenUrl', async (req, res) => {
    const { longURL } = req.body;

    try {
        const isValid = await util.isValidURL(longURL);

        if (isValid) {
            const genUrl = await ShortenURLController.findShortUrlOrUpsert(longURL);
            res.send(genUrl);
        }
    }
    catch (e) {
        console.log(e)
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
        console.log(err);
        res.status(500).json('Server Error');
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Express running → PORT ${process.env.PORT || 3000}`);
});