var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
   
    name : String,

    author : String,

    ing : String,
    
    ingredients : [String]

});

module.exports = mongoose.model('Recipe',RecipeSchema);
