import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Others"],
    },
    profilePic: {
      type: String,
      default: "",
    },
    headLine: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    branch: {
      type: String,
      default: "",
    },
    collegeName: {
      type: String,
      default: "",
    },
    year: {
      type: Number,
      default: 0,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    posts: {
      type: [mongoose.Schema.Types.ObjectId], // Array of ObjectIds referencing posts
      default: [], // Default value is an empty array
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

export default User;
