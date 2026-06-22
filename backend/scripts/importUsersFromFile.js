/**
 * Simple migration script to import users from a JSON file into MongoDB.
 * - Place a `users.json` file next to this script containing an array of
 *   objects: { "name": "Alice", "email": "alice@example.com", "password": "plaintext" }
 * - Set MONGODB_URI in your environment (or a .env file) to your Atlas connection string
 * - Run: node importUsersFromFile.js
 *
 * This script will hash passwords using bcrypt and create users using Mongoose.
 */

import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI is not set in environment.');
  process.exit(1);
}

const usersFile = path.resolve(process.cwd(), 'users.json');
if (!fs.existsSync(usersFile)) {
  console.error(`Missing users.json at ${usersFile}. Create one with an array of users.`);
  process.exit(1);
}

const userData = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, lowercase: true, trim: true },
  password: String,
}, { timestamps: true });

// Use the same model name as the app so documents land in the same `users` collection
const User = mongoose.model('User', userSchema);

const run = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    for (const u of userData) {
      const email = (u.email || '').trim().toLowerCase();
      if (!email || !u.password) {
        console.warn('Skipping user missing email or password', u);
        continue;
      }

      const exists = await User.findOne({ email }).lean();
      if (exists) {
        console.log('User already exists, skipping:', email);
        continue;
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(u.password, salt);

      await User.create({ name: u.name || '', email, password: hashed });
      console.log('Inserted:', email);
    }

    console.log('Done.');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.disconnect();
  }
};

run();
