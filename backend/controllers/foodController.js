import cloudinary from "../config/cloudinary.js";
import Food from "../models/food.js";

// CREATE FOOD
export const createFood = async (req, res) => {
  try {
    const { name, amount, category, imageUrl } = req.body;

    if (!name || !amount || !category) {
      return res.status(400).json({ message: "Missing fields" });
    }

    let finalImageUrl = imageUrl || "";

    // Upload image to cloudinary if file exists
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "foods" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(req.file.buffer);
      });

      finalImageUrl = result.secure_url;
    }

    if (!finalImageUrl) {
      return res.status(400).json({ message: "Image is required" });
    }

    const food = await Food.create({
      name,
      amount: Number(amount),
      category,
      imageUrl: finalImageUrl,
    });

    res.status(201).json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// UPDATE FOOD
export const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, amount, category, imageUrl } = req.body;

    const food = await Food.findById(id);
    if (!food) return res.status(404).json({ message: "Food not found" });

    if (name) food.name = name;
    if (amount) food.amount = Number(amount);
    if (category) food.category = category;

    // new image upload
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "foods" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(req.file.buffer);
      });

      food.imageUrl = result.secure_url;
    } else if (imageUrl) {
      food.imageUrl = imageUrl;
    }

    await food.save();
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE FOOD
export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    await Food.findByIdAndDelete(id);

    res.json({ message: "Food deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CATEGORY
export const getFoodsByCategory = async (req, res) => {
  try {
    const foods = await Food.find({
      category: new RegExp(req.params.category, "i"),
    });

    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CATEGORIES
export const getCategories = async (req, res) => {
  try {
    const categories = await Food.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};