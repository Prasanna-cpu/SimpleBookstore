import mongoose from 'mongoose'

export const connectDB = async (DATABASE_URL) => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Database connected");
  } catch (error) {
    console.log("Error is connecting DB", error);
  }
};
