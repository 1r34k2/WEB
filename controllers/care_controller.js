var Care = require("../models/care"),
    care_controller = {},
    path = require('path'),
    mongoose = require("mongoose");
care_controller.GetAll = function(req,res){
    Care.find({},function(err,result){
        if(err){
            res.send(err);
        } else{
            res.json(result);
        }
    });
};
module.exports = care_controller;
