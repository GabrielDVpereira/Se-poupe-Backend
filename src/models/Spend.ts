import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User";

export interface ISpend extends Document {
  name: string;
  value: string;
  local: string;
  category: string;
  date: Date;
  user: IUser["_id"];
}

const SendSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  local: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model<ISpend>("Spend", SendSchema);
