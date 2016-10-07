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

var data = {pass: 'Yes'};

app.get('/a', function(req, res) {
	console.log(req);
    Item.find(function(err, items) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(items);
    });
});

// app.get('/', function(req, res) {
// 	console.log(req);
// 	Item.find(function(err, items) {
// 		if (err) {
// 			return res.status(500).json({
// 				message: 'Internal Server Error'
// 			});
// 		}
// 		console.log(req);
// 		res.json(items);
// 	});
// });

// app.get('/a', function(req, res) {
// 	res.json(data);
// });

// app.post('/b', function(req, res) {
// 	// console.log(req);
// 	console.log(req.body.pass);
// 	res.status(201).json(data);
// });

app.post('/b', function(req, res) {	
    Item.create({
        pass: req.body.pass
    }, function(err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(item);
    });
});


// app.post('/items', function(req, res) {
//     Item.create({
//         name: req.body.name
//     }, function(err, item) {
//         if (err) {
//             return res.status(500).json({
//                 message: 'Internal Server Error'
//             });
//         }
//         res.status(201).json(item);
//     });
// });


app.use('*', function(req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});





