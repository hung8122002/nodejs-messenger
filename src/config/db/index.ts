import mongoose from "mongoose";
async function connect() {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log("connect successfully");
  } catch (error) {
    console.log("Error connecting");
  }
}
export default connect;
