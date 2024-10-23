import { Router } from "express";
import { getAllNotes, uploadNotes } from "../controllers/noteController.js";
import upload from "../utils/uploadNotes.js";

const router = Router();

router.post("/upload-pdf", upload.single("file"), uploadNotes);
router.get("/all-notes", getAllNotes);

export default router;
