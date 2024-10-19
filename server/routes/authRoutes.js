import { Router } from "express";
import { signIn, signUp, logOut } from "../controllers/authController.js";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/logout", logOut);

export default router;
