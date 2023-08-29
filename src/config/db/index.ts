import mongoose from "mongoose";
async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/messenger");
    console.log("connect successfully");
  } catch (error) {
    console.log("Error connecting");
  }
}
export default connect;
