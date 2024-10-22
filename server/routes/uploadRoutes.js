import { Router } from "express";
import { uploadNotes } from "../controllers/uploadController.js";
import upload from "../utils/uploadNotes.js";

const router = Router();

router.post("/upload-pdf", upload.single("file"), uploadNotes);

export default router;
