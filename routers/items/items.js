var itemRow = require('express').Router();
var Item = require('./itemsModels');

itemRow.post('/', function(req, res) {	
	console.log(req.body);
	console.log(req.body.item);


    Item.create({ item: req.body.item }, function(err, item) {
    	console.log(item);
        if (err) {
        	console.log(item);
        	console.log(err);
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(item);
    });
});


module.exports = itemRow;