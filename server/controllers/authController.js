import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

// Signup controller
export const signUp = async (req, res) => {
  try {
    // console.log(req.body);

    const {
      fullName,
      userName,
      password,
      confirmPassword,
      gender,
      // branch,
      // year,
      // city,
      phoneNumber,
      // collegeName,
      email,
    } = req.body;

    if (password !== confirmPassword)
      return res.status(400).json({ error: "Passwords do not match" });

    const user = await User.findOne({ userName });
    if (user) return res.status(400).json({ error: "Username already exists" });

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const profilePic = `https://avatar.iran.liara.run/public/${
      gender === "Male" ? "boy" : gender === "Female" ? "girl" : ""
    }?username=${userName}`;

    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      // branch,
      // year,
      // city,
      phoneNumber,
      // collegeName,
      profilePic,
      email,
    });

    if (newUser) {
      await newUser.save();
      generateTokenAndSetCookie(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
        success: 1,
      });
    } else {
      res.status(400).json({ error: "Invalid data", success: 0 });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// signin controller
export const signIn = async (req, res) => {
  try {
    // console.log(req.body);

    const { userName, password } = req.body;

    const user = await User.findOne({
      userName: { $regex: new RegExp(`^${userName}$`, "i") },
    });

    // console.log(user._id);

    if (!user) {
      return res.status(400).json({ message: "User not found", success: 0 });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ message: "Incorrect password", success: 0 });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      profilePic: user.profilePic,
      success: 1,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error", success: 0 });
  }
};

// logOut controller
export const logOut = (req, res) => {
  try {
    // Clear the JWT cookie by using res.clearCookie
    res.clearCookie("jwt", {
      httpOnly: true, // Ensure this matches how you set the cookie initially
      // secure: process.env.NODE_ENV === "production", // Ensure this matches your environment
      sameSite: "Strict", // SameSite policy (optional, based on your original cookie settings)
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update profile controller
export const updateUserDetails = async (req, res) => {
  try {
    const token = req.cookies.jwt; // Ensure the JWT is being sent as a cookie
    const secretKey = process.env.JWT_SECRET_KEY; // Tking secret key from the environment variable

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.userId;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the fields from the request body that the user wants to update
    const {
      headLine,
      bio,
      branch,
      collegeName,
      year,
      state,
      city,
      country,
      profilePic,
    } = req.body;

    if (headLine) user.headLine = headLine;
    if (bio) user.bio = bio;
    if (branch) user.branch = branch;
    if (collegeName) user.collegeName = collegeName;
    if (year) user.year = year;
    if (state) user.state = state;
    if (city) user.city = city;
    if (country) user.country = country;
    if (profilePic) user.profilePic = profilePic;

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
