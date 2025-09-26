import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(String(process.env.MONGO_CONNECTION));
    console.log(
      "--- Connection to the database has been established successfully. ---"
    );
  } catch (error) {
    console.log(`Unable to connect to the database: ${error}`);
  }
};

export default connectDatabase;
