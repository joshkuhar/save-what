var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
	item: Object
});

// var Item = mongoose.model('Item', ItemSchema);
var Item = mongoose.model('eachitem', ItemSchema);

// module.exports = Item;
module.exports = Item;	