import mongoose from "mongoose";

const connectToMongoDb = async () => {
  try {
    // console.log(process.env.MONGODB_URL);
    await mongoose.connect(
      "mongodb+srv://derupanjan2021:ws43f51nQJxXUc5A@cluster0.zj93q.mongodb.net/note-app-db?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to the database succesfully");
  } catch (err) {
    console.log("Error connecting to database", err.message);
  }
};

export default connectToMongoDb;
