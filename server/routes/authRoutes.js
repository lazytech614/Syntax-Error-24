import { Router } from "express";
import {
  signIn,
  signUp,
  logOut,
  updateUserDetails,
} from "../controllers/authController.js";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/logout", logOut);
router.put("/update-profile", updateUserDetails);

export default router;
