var Styling = require("../models/styling"),
    styling_controller = {},
    path = require('path'),
    mongoose = require("mongoose");
styling_controller.GetAll = function(req,res){
    Styling.find({},function(err,result){
        if(err){
            console.log(err);
            res.send(err);
        } else{
            console.log(result);
            res.json(result);
        }
    });
};
module.exports = styling_controller;