//grab the packages that we need for the user model
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");

//user schema
var UserSchema = new Schema({
  name: String,
  email: String,
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: false, select: false },
  date_registered: { type: Date, required: false },
  last_logged: { type: Date, required: false },
  allergic_to_milk: { type: Boolean, required: false },
  allergic_to_eggs: { type: Boolean, required: false },
  allergic_to_fish: { type: Boolean, required: false },
  allergic_to_shellfish: { type: Boolean, required: false },
  allergic_to_tree_nuts: { type: Boolean, required: false },
  allergic_to_peanuts: { type: Boolean, required: false },
  allergic_to_wheat: { type: Boolean, required: false },
  allergic_to_soybeans: { type: Boolean, required: false },
  allergic_to_gluten: { type: Boolean, required: false },
  facebook: { type: Object, required: false }
});

//hash the password before the user is saved
UserSchema.pre("save", function(next) {
  var user = this;

  //hash the password only if the password has been changed or user is new
  if (!user.isModified("password")) return next();

  //generate the hash
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) return next(err);

    //change the password to the hashed version
    user.password = hash;
    next();
  });
});

//method to compare a given password with the database hash
UserSchema.methods.comparePassword = function(password) {
  var user = this;

  return bcrypt.compareSync(password, user.password);
};

//return the model
module.exports = mongoose.model("User", UserSchema);
