var Manager = require("../models/manager"),
    manager_controller = {},
    path = require('path'),
    mongoose = require("mongoose");
    manager_controller.GetAll = function(req,res){
        Manager.find({},function(err,result){
            if(err){
                console.log(err);
                res.send(err);
            } else{
                console.log(result);
                res.json(result);
            }
        });
    };        
    manager_controller.create = function(req, res) {
        console.log('Вызвано действие: создать менеджера');
        var login = req.body.login,
        role = req.body.role;
        Manager.find({ "login": login }, function(err, result) {
            if (err ) {
                console.log(err);
                res.send(500, err);
            } else if (result.length !== 0) {
                res.status(501).send("Менеджер уже существует");
                console.log(err);
                console.log("Менеджер уже существует");
            } else {
                var newManager = new Manager({
                    "login": login,
                    "role":role
                });
                newManager.save(function(err, result) {
                    console.log(err);
                    if (err !== null) {
                        res.json(500, err);
                    } else {
                        res.json(200);
                        console.log(result);
                    }
                });
            }
        });
    };
    manager_controller.delete = function(req, res) {
        console.log("Вызвано действие: удалить менеджера");
        var login = req.params.login;
        Manager.find({ "login": login }, function(err, result) {
            if (err !== null) {
                console.log(err);
                res.send(500, err);
            } else {
                console.log("uebok");
                Manager.deleteOne({ "login": login }, function(err, manager) {
                    if (err !== null) {
                        res.status(500).json(err);
                    } 
                    else{
                        console.log("uebok");
                        res.status(200);
                    }
                });
            }
        });
    }
    manager_controller.show = function(req, res){
        console.log("Действие: показать manager");
        Manager.find({'login': req.params.login}, function(err, result){
            if(err){
                console.log(err);
            } else if (result.length !== 0) {
                if(req.params.role === "manager") res.sendfile('./client/manager.html');
                else res.sendfile("./client/admin.html")
            } else {
                res.send(404);
            }
        });
    };
    manager_controller.update = function(req, res) {
        console.log("Вызвано действие: обновить менеджера");
        var login = req.params.login;
        console.log("Старый логин менеджера: " + login);
        var newUsername = { $set: { login: req.body.login, role: req.body.role } };
        console.log("Новый логин менеджера: " + req.body.login);
        Manager.updateOne({ "login": login }, newUsername, function(err, manager) {
            if (err !== null) {
                res.status(500).json(err);
            } else {
                console.log('Изменен');
                res.json(200);
            }
        });
    };
module.exports = manager_controller;