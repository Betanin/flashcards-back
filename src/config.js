const config = () => {
    return {
        app: {
            port: process.env.APP_PORT || 3000,
            clustered: process.env.APP_CLUSTERED || 'false'
        },
        jwt: {
            password: process.env.JWT_SECRET || 'SUPER_SECRET_PASSWORD'
        },
        database: {
            uri: process.env.DATABASE_URI || 'localhost/flashcard'
        },
        log: {
            dir: process.env.LOG_DIR || require('path').join(__dirname, 'log')
        }
    }
};

module.exports = config();