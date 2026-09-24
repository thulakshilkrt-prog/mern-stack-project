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
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// JSON
app.use(express.json());

// TEST ROUTE
app.get("/test", (req, res) => {
  res.send("Server is working");
});

// USER ROUTES
app.use("/api/users", userRoute);

// PORT
const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;

// MONGODB CONNECTION
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