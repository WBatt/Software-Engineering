//grab PACKAGES
var  mongoose = require('mongoose');
var Schema = mongoose.Schema;

//item Schema
var ItemSchema = new Schema({
  name: {type: String, required: true},
  category: type: String
});

//return model
module.exports = mongoose.model('Allergy', ItemSchema);
