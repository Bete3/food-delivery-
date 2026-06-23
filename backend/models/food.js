import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a food name'],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Please add an amount'],
      min: 0,
    },
    imageUrl: {
      type: String,
      required: [true, 'Please add a food image'],
      trim: true,
    },
    imageFilename: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const Food = mongoose.model('Food', foodSchema);

export default Food;