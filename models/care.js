var mongoose = require("mongoose");
var careSchema = mongoose.Schema({
    description: String,
    price: String
});
var care = mongoose.model("care",careSchema);
module.exports = care;