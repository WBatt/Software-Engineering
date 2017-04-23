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



  item.flagCategories.all = [];
  allergy.find({}, function(err, allergies) {
    allergies.forEach(function(allergyI) {
      if (item.ingredients.search(allergyI.name.toLowerCase()) != -1) {

        console.log("MATCH", allergyI.name, allergyI.category);
        item.allChanged = true;
        item.markModified('allChanged');

        item.flagCategories.all.push(allergyI.name);
        item.markModified('flagCategories.all');

        switch (allergyI.category.toString()) {
          case "egg":
            item.flagCategories.egg.push(allergyI.name);
            break;
          case "soy":
            item.flagCategories.soy.push(allergyI.name);
            break;
          case "shellfish":
            item.flagCategories.shellfish.push(allergyI.name);
            break;
          case "peanuts":
            item.flagCategories.peanuts.push(allergyI.name);
            break;
          case "milk":
            item.flagCategories.milk.push(allergyI.name);
            break;
          case "wheat":
            item.flagCategories.wheat.push(allergyI.name);
            break;
          case "other":
            item.flagCategories.other.push(allergyI.name);
            break;
          case "fish":
            item.flagCategories.fish.push(allergyI.name);
            break;
          case "meat":
            item.flagCategories.meat.push(allergyI.name);
            break;
          case "gluten":
            item.flagCategories.gluten.push(allergyI.name);
            break;
        }
      }
    });
  });

  next();
});
//return model
module.exports = mongoose.model("Item", ItemSchema);
