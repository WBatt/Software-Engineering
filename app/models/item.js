//grab PACKAGES
var  mongoose = require('mongoose');
var Schema = mongoose.Schema;

//item Schema
var ItemSchema = new Schema({
  name: {type: String},
    upvotes: {type: Number, min:0},
    downvotes: {type: Number, min:0},

}, {
  strict: false
});

//return model
module.exports = mongoose.model('Item', ItemSchema);
