import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = () =>
        mongoose.connect(process.env.DB_URL).then(() => {
                console.log("Database connected");
        }).catch((err) => {
                console.error("Database connection error:-", err);
        });