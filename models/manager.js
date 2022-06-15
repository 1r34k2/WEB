var mongoose = require("mongoose");
var managerSchema = mongoose.Schema({
    login: String,
    role: String
});
var manager = mongoose.model("manager",managerSchema);
module.exports = manager;