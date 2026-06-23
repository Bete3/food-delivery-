import Food from '../models/food.js';

const getBaseUrl = (req) => `${req.protocol}://${req.get('host')}`;

export const createFood = async (req, res) => {
  const name = req.body?.name?.trim();
  const amountValue = req.body?.amount;
  const imageUrlFromBody = req.body?.imageUrl?.trim();

  if (!name || amountValue === undefined || amountValue === null || amountValue === '') {
    return res.status(400).json({ message: 'Please provide food name and amount' });
  }

  const amount = Number(amountValue);
  if (Number.isNaN(amount) || amount < 0) {
    return res.status(400).json({ message: 'Amount must be a valid number' });
  }

  let imageUrl = imageUrlFromBody;
  let imageFilename = '';

  if (req.file) {
    imageFilename = req.file.filename;
    imageUrl = `${getBaseUrl(req)}/uploads/${req.file.filename}`;
  }

  if (!imageUrl) {
    return res.status(400).json({ message: 'Please provide an image upload or image URL' });
  }

  try {
    const food = await Food.create({
      name,
      amount,
      imageUrl,
      imageFilename,
    });

    return res.status(201).json(food);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const getFoods = async (_req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });
    return res.json(foods);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};