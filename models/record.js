var mongoose = require("mongoose");
var recordSchema = mongoose.Schema({
    surname : String,
    name : String,
    tel : String,
    date: String,
    time: String,
    status: String
});
var record = mongoose.model("record",recordSchema);
module.exports = record;