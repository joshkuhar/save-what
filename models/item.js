var mongoose = require('mongoose');

// var ItemSchema = new mongoose.Schema({
// 	pass: { type: String, required: true }
// });
var ItemsSchema = new mongoose.Schema({
	items: {type: Array, required: true},
	name: {type: String, required: true, unique: true}
});

// var Item = mongoose.model('Item', ItemSchema);
var Items = mongoose.model('Items', ItemsSchema);

// module.exports = Item;
module.exports = Items;