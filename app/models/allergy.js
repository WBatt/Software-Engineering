//grab PACKAGES
var  mongoose = require('mongoose');
var Schema = mongoose.Schema;

//allergy Schema
var AllergySchema = new Schema({
  name: {type: String, required: true},
  category: String
});

//return model
module.exports = mongoose.model('Allergies', AllergySchema);
