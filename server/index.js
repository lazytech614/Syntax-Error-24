import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import connectToMongoDb from "./db/connectToMongodb.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from "cors";
import Note from "./models/noteModel.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "./models/userModel.js";
// import Note from "./models/noteModel.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import FormData from "form-data";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// console.log(process.env.MONGODB_URL);

app.use("/uploads", express.static("uploads"));
// app.use(cors({ credentials: true, origin: '*' }));
const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://spontaneous-stardust-0bdf9a.netlify.app", // Netlify production
];

// CORS configuration
app.use(cors({
  credentials: true,
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Block the request
    }
  },
}));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/upload", uploadRoutes);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + file.originalname);
  },
});

const upload = multer({ storage: storage });

// const noteSchema = mongoose.model(Note);

app.get("/test-pdf", (req, res) => {
  res.sendFile(__dirname + "/uploads/1729359377191-334566132Tutorial 4.pdf"); // Adjust the path as needed
});

// app.post("/api/upload-pdf", upload.single("file"), async (req, res) => {
//   try {
//     const token = req.cookies.jwt;
//     const secretKey = process.env.JWT_SECRET_KEY;
//     let userId;

//     jwt.verify(token, secretKey, (err, decoded) => {
//       if (err) {
//         console.error("Token verification failed:", err);
//         return;
//       }

//       // Access the userId from the decoded token
//       userId = decoded.userId; // Adjust the key according to your token payload
//     });
//     const newNote = new Note({
//       title: req.body.title,
//       content: req.file.filename,
//       authorId: userId,
//       code: req.body.code,
//       name: req.body.name,
//       description: req.body.description,
//     });

//     if (newNote) {
//       await newNote.save();
//       await User.findByIdAndUpdate(
//         userId,
//         { $push: { posts: newNote._id } },
//         { new: true } // This returns the updated document
//       );
//       return res.json({ message: "File uploaded successfully", success: 1 });
//     }
//   } catch (err) {
//     console.log(err.message);
//     return res.status(500).json({ error: err.message });
//   }
// });

app.post("/api/upload-pdf", upload.single("file"), async (req, res) => {
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
});

app.get("/api/notes", async (req, res) => {
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
});

// app.post("/upload-pdf", upload.single("pdf"), async (req, res) => {
//   try {
//     // const filePath = req.file.path;

//     const filePath = req.body.path;
//     console.log(filePath);

//     const formData = new FormData();
//     formData.append("pdf", fs.createReadStream(filePath));

//     const response = await fetch("http://127.0.0.1:4000/process-pdf", {
//       method: "POST",
//       headers: {
//         ...formData.getHeaders(),
//       },
//       body: formData,
//     }).then((res) => res.json());

//     console.log(response);
//   } catch (err) {
//     console.log(err);
//   } finally {
//     // fs.unlinkSync(req.file.path);
//   }
// });

app.patch("/notes/:id/reaction", async (req, res) => {
  const { id } = req.params;
  const { type } = req.body; // type can be 'like' or 'dislike'

  try {
    const update =
      type === "like" ? { $inc: { likes: 1 } } : { $inc: { dislikes: 1 } };
    const note = await Note.findByIdAndUpdate(id, update, { new: true });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/notes/:noteId/like", async (req, res) => {
  const { userId } = req.body; // Assuming you're sending the user's ID in the request body
  const noteId = req.params.noteId;

  try {
    // Find the note by ID
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Increment likes on the note
    note.likes += 1;
    await note.save();

    // Find the author of the note to update their rating
    const user = await User.findById(note.authorId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Increment the user's rating
    user.rating += 1;
    await user.save();

    res
      .status(200)
      .json({ message: "Note liked successfully", rating: user.rating });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/search", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    // Perform case-insensitive search on the name, code, or title
    const notes = await Note.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, // 'i' for case-insensitive search
        { code: { $regex: query, $options: "i" } },
        { title: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json(notes);
  } catch (error) {
    console.error("Error searching notes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  connectToMongoDb();
  console.log(`Server is running on http://localhost:${port}`);
});
