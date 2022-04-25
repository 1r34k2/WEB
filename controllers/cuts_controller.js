var Cuts = require("../models/cuts"),
    cuts_controller = {},
    path = require('path'),
    mongoose = require("mongoose");
cuts_controller.GetAll = function(req,res){
    Cuts.find({},function(err,result){
        if(err){
            console.log(err);
            res.send(err);
        } else{
            console.log(result);
            res.json(result);
        }
    });
};
module.exports = cuts_controller;