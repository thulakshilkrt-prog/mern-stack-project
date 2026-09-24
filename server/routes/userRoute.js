import express from "express";
import User from "../model/userModel.js";

const router = express.Router();

// CREATE USER
router.post("/", async (req, res) => {
  try {
    const { name, email, adress, countryCode, phone, action } = req.body;

    if (!name || !email || !adress || !countryCode || !phone) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists.",
      });
    }

    const newUser = await User.create({
      name,
      email,
      adress,
      countryCode,
      phone,
      action: action || "Active",
    });

    res.status(201).json({
      message: "User added successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("CREATE ERROR:", error);

    res.status(500).json({
      message: "Failed to add user",
      error: error.message,
    });
  }
});

// GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    console.error("GET ERROR:", error);

    res.status(500).json({
      message: "Failed to get users",
      error: error.message,
    });
  }
});

// GET ONE USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("GET ONE ERROR:", error);

    res.status(500).json({
      message: "Failed to get user",
      error: error.message,
    });
  }
});

// UPDATE USER
router.put("/update/:id", async (req, res) => {
  try {
    const { name, email, adress, countryCode, phone, action } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        adress,
        countryCode,
        phone,
        action: action || "Active",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);

    res.status(500).json({
      message: "Failed to update user",
      error: error.message,
    });
  }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);

    res.status(500).json({
      message: "Failed to delete user",
      error: error.message,
    });
  }
});

export default router;