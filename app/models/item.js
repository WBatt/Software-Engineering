//grab PACKAGES
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var allergy = require("./allergy");
//item Schema
var ItemSchema = new Schema(
  {
    name: { type: String },
    ingredients: { type: String },
    upvotes: {type: Number, min:0},
    downvotes: {type: Number, min:0},
      allChanged: {type: Boolean},
    flagCategories: {
      all: [],
      egg: [String],
      soy: [String],
      shellfish: [String],
      peanuts: [String],
      milk: [String],
      wheat: [String],
      other: [String],
      fish: [String],
      meat: [String],
      gluten: [String]
    }
  },
  {
    strict: false
  }
);


ItemSchema.pre('validate', function(next) {
  var item = this;
  item.allChanged = false;





  next();
});
//return model
module.exports = mongoose.model("Item", ItemSchema);
