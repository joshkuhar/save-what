var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var categoryName = require('./routers/listName/category');
var Item = require('./routers/items/items');
var User = require('./user-model/user');


var config = require('./config');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));


var runServer = function(callback) {
	mongoose.connect(config.DATABASE_URL, function(err) {
		if (err && callback) {
			return callback(err);
		}

		app.listen(config.PORT, function() {
			console.log('listening on localhost:' + config.PORT);
			if (callback) {
				callback();
			}
		});
	});
};

if (require.main === module) {
	runServer(function(err){
		if(err) {
			console.error(err);
		}
	});
};

exports.app = app;
exports.runServer = runServer;

// var Items = require('./models/item');

app.use('/', categoryName);
app.use('/', Item);
app.use('/', User);





app.use('*', function(req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});





