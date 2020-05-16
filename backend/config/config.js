exports.PORT = process.env.PORT || 3001;

exports.CLIENT_ORIGIN = process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_ORIGIN
    : 'http://localhost:3000';

exports.DB_URL = 'mongodb://admin:admin123@ds119150.mlab.com:19150/heroku_gs757z8d';

exports.SECRET_KEY = 'secret';