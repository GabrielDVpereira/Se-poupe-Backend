import mongoose, {Schema, Document }from "mongoose";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
  name: string,
  email: string,
  birthdate: Date,
  password: string,
  income: number ,
  generateAuthToken: Function
}

const UserSchema = new Schema({
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
    process.env.PRIVATE_KEY!
  );
  return token;
};

export default mongoose.model<IUser>("User", UserSchema);
