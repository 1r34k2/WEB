var mongoose = require("mongoose");
var itemSchema = mongoose.Schema({
    name: String,
    price: String,
    tag: String
});
var item = mongoose.model("item",itemSchema);
module.exports = item;