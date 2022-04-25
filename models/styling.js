var mongoose = require("mongoose");
var stylingSchema = mongoose.Schema({
    description: String,
    price: String
});
var styling = mongoose.model("styling",stylingSchema);
module.exports = styling;