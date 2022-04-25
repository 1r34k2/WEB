var mongoose = require("mongoose");
var coloringSchema = mongoose.Schema({
    description: String,
    price: String
});
var coloring = mongoose.model("coloring",coloringSchema);
module.exports = coloring;