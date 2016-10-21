var listName = require('express').Router();
var Items = require('./savedItemsModels');


listName.get('/', function(req, res) {
		Items.find( req.query, function(err, items) {
			if (err) {
				return res.status(500).json({
					message: 'Internal Server Erro'
					});
				} 
				res.status(200).json(items);
			});   
    });

module.exports = listName;


