var Record = require("../models/record"),
    record_controller = {},
    path = require('path'),
    mongoose = require("mongoose");
    record_controller.GetAll = function(req,res){
        Record.find({},function(err,result){
            if(err){
                res.send(err);
            } else{
                res.json(result);
            }
        });
    };
    record_controller.create = function(req, res) {
        console.log('Вызвано действие: создать запись');
        var surname = req.body.surname,
        name = req.body.name,
        tel = req.body.tel;
        Record.find({ "surname": surname,"name":name,"tel":tel }, function(err, result) {
            if (err) {
                console.log(err);
                res.send(500, err);
            } else if (result.length !== 0) {
                res.status(501).send("Запись уже существует");
                console.log(err);
                console.log("Запись уже существует");
            } else {
                var newRecord = new Record({
                    "surname": surname,
                    "name": name,
                    "tel": tel,
                    "date": "",
                    "time": "",
                    "status" : "Обрабатывается"
                });
                newRecord.save(function(err, result) {
                    res.json(200);
                });
            }
        });
    };
    record_controller.update = function(req, res) {
        var _id = req.params._id;
        var newRecord = { $set: { date: req.body.date, time: req.body.time,status: req.body.status } };
        Record.updateOne({ "_id": _id }, newRecord, function(err, record) {
            if (err !== null) {
                res.status(500).json(err);
            } else {
                res.json(200);
            }
        });
    };
    record_controller.delete = function(req, res) {
        var _id = req.params._id;
        Record.find({ "_id": _id  }, function(err, result) {
            if (err) {
                console.log(err);
                res.send(500, err);
            } else if (result.length !== 0) {
                Record.deleteOne({ "_id": _id }, function(err, record) {
                    res.json(200);
                });
            } else {
                res.status(404).send("Записи не существует");
                console.log(err);
            }
        });
    }
module.exports = record_controller;