const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  income: {
    type: Number,
    required: true,
  },
});

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      name: this.name,
      email: this.email,
      income: this.income,
      birthdate: this.birthdate,
      _id: this._id,
    },
    process.env.PRIVATE_KEY
  );
  return token;
};

module.exports = mongoose.model("User", UserSchema);
