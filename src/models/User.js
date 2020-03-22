const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  birthdate: {
    type: Date,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  income: {
    type: Number,
    require: true
  }
});

UserSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      name: this.name,
      email: this.email,
      income: this.income,
      birthdate: this.birthdate,
      _id: this._id
    },
    process.env.PRIVATE_KEY
  );
  return token;
};

module.exports = mongoose.model("User", UserSchema);
