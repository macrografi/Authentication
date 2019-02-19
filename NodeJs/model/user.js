const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdOn: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
