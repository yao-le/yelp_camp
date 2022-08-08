const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

UserSchema.plugin(passportLocalMongose);

module.exports = mongoose.model("User", UserSchema);
