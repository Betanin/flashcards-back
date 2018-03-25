const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const loadExpress = (port) => {
    const app = express();    

    // Body
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // CORS Headers
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
        res.header('Access-Control-Allow-Credentials', true);
        next();
    });

    // Error Handler
    app.use((err, req, res, next) => {
        if (Object.prototype.isPrototypeOf.call(ServerError.prototype, err))
            return res.status(err.status || 500).json({ error: err.message });
        return res.status(500).json({ error: 'Internal Error' });
    });    
    
    const server = http.createServer(app);
    app.listen(port, () => {        
        console.log('Flashcards listening at port %s', port);
    });
    return app;
}

module.exports = loadExpress;