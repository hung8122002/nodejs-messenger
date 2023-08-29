import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema({
  _id: Schema.ObjectId,
  username: String,
  password: String,
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", User);
