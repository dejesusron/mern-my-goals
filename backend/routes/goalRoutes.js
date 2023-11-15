import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getGoals, getGoal, addGoal, updateGoal, deleteGoal } from "../controllers/goalControllers.js";

const router = express.Router();

router.get("/", protect, getGoals);
router.post("/", protect, addGoal);
router.get("/:id", protect, getGoal);
router.put("/:id", protect, updateGoal);
router.delete("/:id", protect, deleteGoal);

export default router;