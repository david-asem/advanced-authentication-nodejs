const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a valid email"],
    unique: true,
    match:[ /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
    select:false
    
  },
  resetPasswordToken: String,
  resetPasswordExpire:Date
});

//before a user is saved.
UserSchema.pre("save", async function (next) {
  let salt;
  if (!this.isModified("password")) {
    next();
  } else {
    salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,
      salt);
    next();
  }
});

//compare db password with given password
UserSchema.methods.match = async (password) => {
  
}
//create user
const User = mongoose.model("User", UserSchema);

module.exports = User;