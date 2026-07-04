import fs from "fs";
import path from "path";
import Food from "../models/food.js";
// Create a new food
export const createFood = async (req, res) => {
  try {
    
    const { name, amount, category, imageUrl } = req.body;
    
    console.log("Received data:", { name, amount, category, imageUrl });
    
    // Validation
    if (!name || !amount) {
      return res.status(400).json({ message: 'Name and amount are required' });
    }
    
    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }

    let finalImageUrl = imageUrl || '';
    
    // If file was uploaded
    if (req.file) {
      const baseUrl = process.env.BASE_URL || `http://localhost:5000`;
      finalImageUrl = `${baseUrl}/uploads/${req.file.filename}`;
    }

    // If no image was provided
    if (!finalImageUrl) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const food = await Food.create({
      name,
      amount: Number(amount),
      category,
      imageUrl: finalImageUrl,
      imageFilename: req.file?.filename || '',
    });

    res.status(201).json(food);
  } catch (error) {
    console.error('Error creating food:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all foods
export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });
    console.log(`Found ${foods.length} foods`);
    res.status(200).json(foods);
  } catch (error) {
    console.error('Error fetching foods:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get foods by category
export const getFoodsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const foods = await Food.find({ 
      category: { $regex: new RegExp(`^${category}$`, 'i') } 
    }).sort({ createdAt: -1 });
    res.status(200).json(foods);
  } catch (error) {
    console.error('Error fetching foods by category:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all unique categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Food.distinct('category');
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: error.message });
  }
};
export const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, amount, category, imageUrl } = req.body;

    const food = await Food.findById(id);

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    food.name = name || food.name;
    food.amount = amount ? Number(amount) : food.amount;
    food.category = category || food.category;

    if (req.file) {
      // delete old image
      if (food.imageFilename) {
        const oldImage = path.join("uploads", food.imageFilename);

        if (fs.existsSync(oldImage)) {
          fs.unlinkSync(oldImage);
        }
      }

      const baseUrl = process.env.BASE_URL;

      food.imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
      food.imageFilename = req.file.filename;
    } else if (imageUrl) {
      food.imageUrl = imageUrl;
    }

    await food.save();

    res.json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    const food = await Food.findById(id);

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    // delete image from uploads folder
    if (food.imageFilename) {
      const imagePath = path.join("uploads", food.imageFilename);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Food.findByIdAndDelete(id);

    res.json({ message: "Food deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};