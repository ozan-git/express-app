import mongoose from 'mongoose'
import config from './configdb.js'

const CONNECTION_URL = 'mongodb://' + config.db.url + '/' + config.db.name;

// Connect to the database
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
});

mongoose.connection.on('reconnected', () => {
    console.log('Mongoose default connection is reconnected');
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose default connection has occured', err, 'error');
    mongoose.disconnect(); // Close the connection and try again
});

