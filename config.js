exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://jkuhar:password@ds011314.mlab.com:11314/value-app' :
                            'mongodb://localhost/app-dev');
exports.PORT = process.env.PORT || 8080;

