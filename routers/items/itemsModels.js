var mongoose = require('mongoose');

var ItemsSchema = new mongoose.Schema({
	item: {type: Object, required: true}
});

// var Item = mongoose.model('Item', ItemSchema);
var Item = mongoose.model('Items', ItemsSchema);

// module.exports = Item;
module.exports = Item;