import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoute from "./routes/userRoute.js";

dotenv.config();

const app = express();

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// JSON
app.use(express.json());

// Test
app.get("/test", (req, res) => {
  res.send("Server is working");
});

// User routes
app.use("/api/users", userRoute);

// Port
const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;

// MongoDB connection
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("DB connected successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });