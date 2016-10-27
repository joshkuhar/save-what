
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dogs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// Schema takes in an object literal
// var DrinkSchema = new mongoose.Schema({
//   		name: String,
//   		flavors: [{
//   			flavor: String,
//   			available: Boolean
//   		}]
// 	});


  		//ID for buyer goes below
  	
  	// type: mongoose.Schema.Types.ObjectId,
  	// ref: 'buyer'
  	// required: true
//   }
// );

// var Milk   = mongoose.model('dairy', MilkSchema);


// Milk.create({
//   name: 'Frank'
//   // id: mongoose.Schema.Types.ObjectId 		
//   // completed: false
// }, function(err, name) {
// 	if(err) {
// 		console.log(err);
// 		return;
// 	}
// 	console.log(name);

// });

// app.post('/dairy', function(req, res){
// 	console.log(req.body);
// 	res.send(req.body);
// 	// Milk.create({size: req.body.size}, function(err, size){
// 	// 	if(err) {
// 	// 		console.log(err);
// 	// 		return;
// 	// 	}
// 	// 	res.send(size);
// 	// });
// });

var dogSchema = new mongoose.Schema({
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'person'
	},
	name: String
})

var personSchema = new mongoose.Schema({
	name: String
});

var Dog = mongoose.model('dog', dogSchema);
var Person = mongoose.model('persons', personSchema);

app.post('/dogs', function(req, res) {	
    Dog.create({
        name: req.body.name,
        size: req.body.size,
        // mongoose object id
    }, function(err, item) {
        if (err) {
        	console.log(err);
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(item);
    });
});




app.listen(8080);

























// var router = require('express').Router();


// var worked = function(req, res, next){
// 	req.worked = "I worked from export";
// 	next();
// };

// router.use(worked);


// router.get('/', function(req, res){
// 	res.send(req.worked);
// });

// module.exports = router;