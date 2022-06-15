const category_controller = require("./controllers/category_controller");

var express = require("express"),
http = require("http"),
// импортируем библиотеку mongoose
mongoose = require("mongoose"),
app = express();
app.use(express.static(__dirname + "/client"));
app.use('/manager/:login', express.static(__dirname + "/client"));
app.use(express.urlencoded());
item_controller = require("./controllers/item_controller")
record_controller = require("./controllers/record_controller")
manager_controller = require("./controllers/manager_controller")
// подключаемся к хранилищу данных Amazeriffic в Mongo
mongoose.connect('mongodb://localhost/amazeriffic');

app.get("/reg.html", (req, res) => {
    req.sendFile(path.join(staticPath, "html/reg.html"));
    })
    
    app.get("/index.html", (req, res) => {
    req.sendFile(path.join(staticPath, "html/index.html"));
    })
    
    app.get("/about.html", (req, res) => {
    req.sendFile(path.join(staticPath, "html/about.html"));
    })
    
    app.get("/support.html", (req, res) => {
    req.sendFile(path.join(staticPath, "html/support.html"));
    })



app.get("/manager",manager_controller.GetAll)
app.get("/record",record_controller.GetAll)
app.post("/record",record_controller.create)
app.delete("/manager/:login",manager_controller.delete)
app.post("/manager",manager_controller.create)
app.get("/manager/:login", manager_controller.show);
app.put("/manager/:login", manager_controller.update);
app.get("/item",item_controller.GetAll)
app.put("/item/:_id",item_controller.update);
app.delete("/item/:_id",item_controller.delete);
app.post("/item",item_controller.create)
app.get("/record",record_controller.GetAll);
app.put("/record/:_id",record_controller.update);
app.delete("/record/:_id",record_controller.delete);
app.get("/category",category_controller.GetAll)
app.post("/category",category_controller.create)
app.put("/category/:name",category_controller.update)
app.delete("/category/:name",category_controller.delete)
http.createServer(app).listen(27017);