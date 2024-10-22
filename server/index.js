import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import connectToMongoDb from "./db/connectToMongodb.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import Note from "./models/noteModel.js";
import User from "./models/userModel.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use("/uploads", express.static("uploads"));

const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://spontaneous-stardust-0bdf9a.netlify.app/", // Netlify production
];

// CORS configuration
app.use(
  cors({
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
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);

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
