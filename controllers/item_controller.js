var Item = require("../models/item"),
    item_controller = {},
    path = require('path'),
    mongoose = require("mongoose");
item_controller.GetAll = function(req,res){
    Item.find({},function(err,result){
        if(err){
            res.send(err);
        } else{
            res.json(result);
        }
    });
};
item_controller.update = function(req, res) {
    var newItem = { $set: { name: req.body.name, price: req.body.price,tag:req.body.tag } };
    Item.updateOne({ "_id": req.params._id }, newItem, function(err, item) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            res.json(200);
        }
    });
};
item_controller.delete = function(req, res) {
    var _id = req.params._id;
    Item.find({ "_id": _id  }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else {
            Item.deleteOne({ "_id": _id }, function(err, item) {
            res.json(200); 
        })
        }});
};
item_controller.create = function(req, res) {
    var name = req.body.name,
    price = req.body.price,
    tag = req.body.tag;
    Item.find({ "name": name }, function(err, result) {
        if (err ) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
            res.status(501).send("Услуга уже существует");
            console.log(err);
            console.log("Услуга уже существует");
        } else {
            var newItem = new Item({
                "name": name,
                "price":price,
                "tag":tag
            });
            newItem.save(function(err, result) {
                    res.json(200);
            });
        }
    });
};
module.exports = item_controller;