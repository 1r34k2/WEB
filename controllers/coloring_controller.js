var Coloring = require("../models/coloring"),
    coloring_controller = {},
    path = require('path'),
    mongoose = require("mongoose");
coloring_controller.GetAll = function(req,res){
    Coloring.find({},function(err,result){
        if(err){
            console.log(err);
            res.send(err);
        } else{
            console.log(result);
            res.json(result);
        }
    });
};
module.exports = coloring_controller;