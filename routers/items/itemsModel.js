var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// var mongoose = require('mongoose');
// var Schema = new mongoose.Schema;

var ItemSchema = Schema({
	item: {
		name: {
			type: String,
			required: true
		},
		price: {
			type: String,
			required: true
		},
		category: {
			required: true,
			type: Schema.Types.ObjectId,
			// type: Schema.Types.ObjectId,
			ref: 'Category'
		}
	}
});

var Item = mongoose.model('Item', ItemSchema);


module.exports = Item;	