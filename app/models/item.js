//grab PACKAGES
var  mongoose = require('mongoose');
var Schema = mongoose.Schema;

//item Schema
var ItemSchema = new Schema({
  name: {type: String, required: true},
  description: String,
  exp_date: {type: Date, required: true }
});

//return model
module.exports = mongoose.model('Item', ItemSchema);
