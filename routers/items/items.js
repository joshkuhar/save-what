var itemRow = require('express').Router();
var Item = require('./itemsModels');

itemRow.post('/', function(req, res) {	
	console.log(req.body);
    Item.create({item: req.body.item}, function(err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(item);
    });
});





module.exports = itemRow;