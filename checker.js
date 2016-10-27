// var middle = require('./middle');
var express = require('express');
// var router = require('express').Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/foos');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var Schema = mongoose.Schema;

var carSchema = new Schema({
	name: String,
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'Owner'
	}
});
var ownerSchema = new Schema({
	name: String
});

var Car = mongoose.model('Car', carSchema);
var Owner = mongoose.model('Owner', ownerSchema);

app.post('/car', function (req, res){
	Car.create({name: req.body.name,
				owner: req.body.owner 
			}, function (err, car){
		if(err){
			console.log(err);
			return;
		}
		res.json(car);
	});
});

// 5811156da9b00f1b543c689c
app.post('/owner', function(req, res){
	Owner.create({name: req.body.name}, function(err, name){
		if(err){
			console.log(err);
			return;
		}
		res.json(name);
	});
});

app.get('/car/:owner', function(req, res){
	Car.findOne({
		name: req.params.name
	})
	.populate('owner')
	.exec(function(err, owner) {
		if(err) {
			console.log(err);
		}
		res.json(owner);
	});
});

app.get('/car/type/:name', function(req, res){
	Car.findOne({
		name: req.params.name
	}, function(err, car){
		if(err){
			console.log(err);
		}
		res.json(car);
	});
});


app.listen(8080);

// var personSchema = Schema({
// 	// _id: Number,
// 	name: String,
// 	age: Number,
// 	stories: [{type: Schema.Types.ObjectId, ref: 'Story'}]
// });

// var storySchema = Schema({
// 	_creator: {type: Number, ref: 'Person'},
// 	title: String,
// 	fans: [{type: number, ref: 'Person'}]
// });

// var Story = mongoose.model('Story', storySchema);
// var Person = mongoose.model('Person', personSchema);

// app.post('/person', function(req, res){
// 	Person.create({
// 		name: req.body.name,
// 		age: req.body.name,
// 	})
// })



// var categorySchema = Schema({
// 	name: String,
// 	items: [{
// 		type: Schema.Types.ObjectId,
// 		ref: 'Item'
// 	}]
// });

// var itemSchema = Schema({
// 	name: String
// });

// var Category = mongoose.model('Category', categorySchema);
// var Item = mongoose.model('Item', itemSchema);

// app.post('/item', function(req, res) {
// 	Item.create({
// 		name: req.body.name
// 	}, function (err, item){
// 		if (err) {
// 			console.log(err);
// 		}
// 		res.status(201).json(item);
// 	});
// });

// app.post('/category', function(req, res){
// 	Category.create({
// 		name: req.body.name,	
// 	})
// 	.populate
// })