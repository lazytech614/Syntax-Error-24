import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import connectToMongoDb from "./db/connectToMongodb.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from "cors";

const app = express();
const port = 3000;

dotenv.config();
// console.log(process.env.MONGODB_URL);

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", (req, res) => {
  console.log(req.file);
});

app.listen(port, () => {
  connectToMongoDb();
  console.log(`Server is running on http://localhost:${port}`);
});
