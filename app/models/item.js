//grab PACKAGES
var  mongoose = require('mongoose');
var Schema = mongoose.Schema;
var allergy = require('./allergy');
//item Schema
var ItemSchema = new Schema({
  name: {type: String},
    ingredients: {type: String}
}, {
  strict: false
});
ItemSchema.pre('save', function(next){
  var item = this;

  allergy.find({}, function(err, allergies){
    allergies.forEach(function(allergyI)
    {
        //console.log(allergyI.name);
        if(item.ingredients.search(allergyI.name) != -1)
        {

        }
    })

  });

  next();
});
//return model
module.exports = mongoose.model('Item', ItemSchema);
