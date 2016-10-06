var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config');

var app = express();
app.use(bodyParser.json());
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

// app.listen(process.env.PORT || 8080);

exports.app = app;
exports.runServer = runServer;

var Item = require('./models/item');

app.get('/', function(req, res) {
	Item.find(function(err, items) {
		if (err) {
			return res.status(500).json({
				message: 'Internal Server Error'
			});
		}
		res.json(items);
	});
});