import mongoose from "mongoose";
import { DBUrl } from "../secret";

export const connectDB = async () => {
  try {
    await mongoose.connect(`${DBUrl}`);
    console.log("Database is connected successfully.");
    mongoose.connection.on("error", error => {
      console.error(`DB connection error ${error}`);
    });
    console.log(DBUrl);
  } catch (error: any) {
    console.log(`Could not connect to db ${error.toString()}`);
  }
};
