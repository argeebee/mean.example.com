var config = {};
config.session = {};
config.cookie = {};

// Database
config.mongodb = 'mongodb://localhost/mean-cms';

// Session
config.session.secret='monkey';

// Cookie
config.cookie.domain = 'localhost:3000';

module.exports = config;