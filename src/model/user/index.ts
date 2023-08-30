import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema({
  _id: Schema.ObjectId,
  username: { type: String, required: true, min: 6, max: 20 },
  password: { type: String, required: true, min: 6, max: 20 },
  subname: { type: String, required: true, match: /[a-zA-Z]/ },
  firstname: { type: String, required: true, match: /[a-zA-Z]/ },
  avatar: String,
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", User);
