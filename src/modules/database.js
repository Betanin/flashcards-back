const mongoose = require('mongoose');

module.exports = (uri) => {

    mongoose.connect('mongodb://' + uri)

    mongoose.connection.on('connected', () =>
        console.log('Connected to MongoDB Server on "%s"', uri)
    );

    mongoose.connection.on('error', error => 
        console.log('Connection error: %s', error)
    );

    mongoose.connection.on('disconnected', () =>
        console.log('Disconnected from MongoDB Server')
    );

    process.on('SIGINT', () =>
        mongoose.connection.close(() => {
            console.log('Application terminated, connection to MongoDB Server closed.');
            process.exit(0);
        })
    );
}
