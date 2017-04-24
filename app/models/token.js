//grab packages that we need for the token model
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//token schema
var TokenSchema = new Schema({
    token: { type: String, unique:true},
    user: {type: String, unique: false, ref: 'User'},
    is_used: Boolean,
    is_valid: Boolean
});


module.exports = mongoose.model("Token", TokenSchema);
