import express from "express";
import multer from "multer";
import {
  createFood,
  getFoods,
  getFoodsByCategory,
  getCategories,
  updateFood,
  deleteFood,
} from "../controllers/foodController.js";

const router = express.Router();

// IMPORTANT: memory storage (NOT diskStorage)
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getFoods);
router.get("/categories", getCategories);
router.get("/category/:category", getFoodsByCategory);

router.post("/", upload.single("image"), createFood);
router.put("/:id", upload.single("image"), updateFood);
router.delete("/:id", deleteFood);

export default router;