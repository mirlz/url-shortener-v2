const mongoose = require('mongoose');

before((done) => {
    mongoose.connect('mongodb://localhost/db_test');
    mongoose.connection
        .once('open', () => {
            console.log('connected to mongodb');
            done();
        })
        .on('error', (err)=> {
            console.warn('error: ', err);
        });
});

after((done) => {
    mongoose.connection.db.dropDatabase(() => {
        done();
    });
});