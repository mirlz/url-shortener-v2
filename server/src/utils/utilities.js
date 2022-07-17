const dns = require('dns');

function isValidURL(url) {
    return new Promise((resolve, reject) => {
        try {
            const urlObj = new URL(url);
            dns.lookup(urlObj.hostname, err => {
                if (err) {
                    reject(err);
                };
                resolve(true);
            });
        } catch (e) {
            reject('Invalid URL');
        }   
    });
}

function idToShortURL(n) 
{
    // Map to store 62 possible characters
    let map = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  
    let shorturl = [];
  
    // Convert given integer id to a base 62 number
    while (n) 
    {
        // use above map to store actual character
        // in short url
        shorturl.push(map[Math.round(n % 62)]);
        n = Math.floor(n / 62);
        if(shorturl.length <= 7) { 
            n = Date.now() + Math.random();
        }
    }
  
    // Reverse shortURL to complete base conversion
    shorturl.reverse();
  
    return shorturl.join("").slice(0, 7);
}
  
module.exports = {isValidURL, idToShortURL};