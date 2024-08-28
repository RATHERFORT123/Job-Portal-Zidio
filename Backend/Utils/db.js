import mongoose from "mongoose";
// let url =
//   "mongodb+srv://rathorechetan114:<password>@cluster0.negnxui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
