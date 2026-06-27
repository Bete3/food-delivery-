import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import {
  createFood,
  getFoods,
  getFoodsByCategory,
  getCategories,
  updateFood,
  deleteFood,
} from "../controllers/foodController.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.resolve(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({ storage });

router.get('/', getFoods);
router.get('/categories', getCategories);
router.get('/category/:category', getFoodsByCategory);
router.post('/', upload.single('image'), createFood);
router.put("/:id", upload.single("image"), updateFood);
router.delete("/:id", deleteFood);
export default router;