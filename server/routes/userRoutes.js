import { Router } from "express";
import { getAllUser, getUser } from "../controllers/userController.js";

const router = Router();

router.get("/allusers", getAllUser);
router.get("/:id", getUser);

export default router;
