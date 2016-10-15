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

exports.app = app;
exports.runServer = runServer;

var Items = require('./models/item');

// var data = {pass: 'Yes'};

app.get('/a', function(req, res) {
    // console.log(req);
    Items.find( req.query, function(err, items) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json(items);
    });
});
//

app.post('/b', function(req, res) {	
    Items.create({
        items: req.body.items,
        name: req.body.name
        // mongoose object id
    }, function(err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(item);
    });
});

app.delete('/b/:id', function(req, res) {
    console.log(req);
    Items.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
        }
        // console.log(res);
        res.status(204).end();

    });
});

app.put('/b/:id', function(req, res) {
    console.log(req.params.id);
    console.log(req.body);
    Items.findByIdAndUpdate(req.params.id, {
        items: req.body.items, 
        name: req.body.name
    }, function(err) {
        if (err) {
            console.log(err);
        }
        res.status(201).end();
    });
});


app.use('*', function(req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});





