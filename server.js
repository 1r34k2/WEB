var express = require("express"),
http = require("http"),
// импортируем библиотеку mongoose
mongoose = require("mongoose"),
app = express();
app.use(express.static(__dirname + "/client"));
app.use(express.urlencoded());
care_controller = require("./controllers/care_controller")
coloring_controller = require("./controllers/coloring_controller")
styling_controller = require("./controllers/styling_controller")
cuts_controller = require("./controllers/cuts_controller")
// подключаемся к хранилищу данных Amazeriffic в Mongo
mongoose.connect('mongodb://localhost/amazeriffic');




app.post("/care",function(req,res){
    care_controller.GetAll(req,res);
})
app.post("/cuts",function(req,res){
    cuts_controller.GetAll(req,res);
})
app.post("/styling",function(req,res){
    styling_controller.GetAll(req,res);
})
app.post("/coloring",function(req,res){
    coloring_controller.GetAll(req,res);
})
http.createServer(app).listen(27017);