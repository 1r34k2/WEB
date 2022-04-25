var mongoose = require("mongoose");
var cutsSchema = mongoose.Schema({
    description: String,
    price: String
});
var cuts = mongoose.model("cuts",cutsSchema);
module.exports = cuts;