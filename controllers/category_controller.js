var Category = require("../models/category"),
    Item = require("../models/item")
    category_controller = {},
    path = require('path'),
    mongoose = require("mongoose");
category_controller.GetAll = function(req,res){
    Category.find({},function(err,result){
        if(err){
            res.send(err);
        } else{
            res.json(result);
        }
    });
};
category_controller.update = function(req, res) {
    var newCategory = { $set: { name: req.body.name } };
    var newTag = {$set:{tag:req.body.name}};
    Item.updateMany({"tag": req.params.name},newTag,function(){
        Category.updateOne({ "name": req.params.name }, newCategory, function(err, item) {
            if (err !== null) {
                res.status(500).json(err);
            } else {
                res.json(200);
            }
        });
    }
    )
};
category_controller.delete = function(req, res) {
    var name = req.params.name;
    Category.find({ "name": name  }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else {
            Item.deleteMany({"tag":name},function(){
                Category.deleteOne({ "name": name }, function(err, item) {
                    if (err !== null) {
                        res.status(500).json(err);
                    } else {
                        res.json(200);
                    } 
                    }
                );
            })
    }});
}
category_controller.create = function(req, res) {
    var name = req.body.name
    Category.find({ "name": name }, function(err, result) {
        if (err ) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
            res.status(501).send("Категория уже существует");
            console.log(err);
            console.log("Категория уже существует");
        } else {
            var newItem = new Category({
                "name": name
            });
            newItem.save(function(err, result) {
                console.log(err);
                if (err !== null) {
                    res.json(500, err);
                } else {
                    res.json(200, result);
                    console.log(result);
                }
            });
        }
    });
};
module.exports = category_controller;