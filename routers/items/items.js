var itemRouter = require('express').Router();
var Item = require('./itemsModel');
var Category = require('../listName/categoryModel');
// var Category = require('./categoryModel');  


itemRouter.post('/item/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    Item.create({ 
        item: {
            name: req.body.item.name,
            price: req.body.item.price,
            category: req.params.id
            }
        }, function(err, item) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                message: 'Internal Server Error'
            });
            } 
            else {
                Category.findOneAndUpdate({_id:req.params.id}, {
                    $addToSet: {
                        items: item._id
                    }
                }, function(err2, cat){
                    if(err2) {
                        console.log(err2);
                    } else {
                        res.status(201).json(item);
                    }
                });
            }
        // res.status(201).json(item);
    });
});

itemRouter.put('/item/:id', function(req, res){
    Item.update({_id: req.params.id}, 
        {$set: { "item.name": req.body.item.name} },
        function(err){
        if(err){
            console.log(err);
            return;
        }
        res.status(201).end();
    });
});

itemRouter.delete('/item/:id', function(req, res) {
    console.log('hit');
    Item.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
                console.log(err);
                return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(202).end();
    });
});


module.exports = itemRouter;