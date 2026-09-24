import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    adress: {
      type: String,
      required: true,
    },

    countryCode: {
      type: String,
      required: true,
      default: "+94",
    },

    phone: {
      type: String,
      required: true,
    },

    action: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;