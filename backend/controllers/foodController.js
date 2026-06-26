import Food from '../models/food.js';  // Make sure this path is correct

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