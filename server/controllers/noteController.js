import jwt from "jsonwebtoken";
import Note from "../models/noteModel.js";
import User from "../models/userModel.js";

export const uploadNotes = async (req, res) => {
  try {
    const token = req.cookies.jwt; // Ensure the JWT is being sent as a cookie
    const secretKey = process.env.JWT_SECRET_KEY;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    let userId;

    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.error("Token verification failed:", err);
        return res.status(403).json({ message: "Token is not valid" });
      }
      userId = decoded.userId; // Adjust according to your token payload
    });

    // Check if userId is null or undefined
    // console.log("User ID:", userId);
    if (!userId) {
      // console.log("Here");
      return res.status(400).json({ message: "User ID not found in token" });
    }

    const newNote = new Note({
      title: req.body.title,
      content: req.file.filename,
      authorId: userId,
      code: req.body.code,
      name: req.body.name,
      description: req.body.description,
    });

    if (newNote) {
      await newNote.save();
      await User.findByIdAndUpdate(
        userId,
        { $push: { posts: newNote._id } },
        { new: true } // This returns the updated document
      );
      return res.json({ message: "File uploaded successfully", success: 1 });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().populate({
      path: "authorId", // Populate the 'authorId' field
      select: "fullName profilePic branch year collegeName", // Only select these fields from the User model
    });

    res.json(notes);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};
