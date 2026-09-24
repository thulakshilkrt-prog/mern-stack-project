import User from "../model/userModel.js";

console.log("CONTROLLER USER:", User);
console.log("CONTROLLER USER FIND:", typeof User.find);

// CREATE USER
export const create = async (req, res) => {
  try {
    const {
      name,
      email,
      adress,
      countryCode,
      phone,
      action,
    } = req.body;

    if (!name || !email || !adress || !countryCode || !phone) {
      return res.status(400).json({
        message: "Please fill all required fields.",
      });
    }

    // Check duplicate email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists.",
      });
    }

    const newUser = new User({
      name,
      email,
      adress,
      countryCode,
      phone,
      action: action || "Active",
    });

    await newUser.save();

    return res.status(201).json({
      message: "User added successfully!",
      user: newUser,
    });
  } catch (error) {
    console.error("CREATE USER ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json(users);
  } catch (error) {
    console.error("GET USERS ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// GET USER BY ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("GET USER ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const {
      name,
      email,
      adress,
      countryCode,
      phone,
      action,
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
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

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.status(200).json({
      message: "User updated successfully!",
      user: updatedUser,
    });
  } catch (error) {
    console.error("UPDATE USER ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.status(200).json({
      message: "User deleted successfully!",
    });
  } catch (error) {
    console.error("DELETE USER ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

