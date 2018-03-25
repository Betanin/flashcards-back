const morgan = require('morgan');

const logger = (app, logDirectory) => {

    const logFormat = '| :date[iso] | :remote-addr | :remote-user | :method | :url | :status | :response-time ms | :res[content-length] B |';

    let accessLogStream = (process.env.NODE_ENV === 'production') 
        ? setLogStreamToFilePersistence()
        : setLogStreamToConsole();
    
    app.use(morgan(logFormat, {
        skip: (req, res) => {
            return res.statusCode < 500 && process.env.NODE_ENV === 'production';
        },
        stream: accessLogStream
    }));
};

const setLogStreamToConsole = () => {
    return {
        write: (msg) => console.log(msg)
    }
}

const setLogStreamToFilePersistence = () => {
    const fs = require('fs');        
    const rfs = require('rotating-file-stream');
    
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

    return rfs('flashcards.log', {
        interval: '1d',
        path: logDirectory
    });
}

module.exports = logger;