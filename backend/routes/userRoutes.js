import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addUser, loginUser, getUser } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/", addUser);
router.post("/login", loginUser);
router.get("/me", protect, getUser);

export default router;