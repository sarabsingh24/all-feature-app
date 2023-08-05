import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler'

/*  REGISTER USER  */

export const register = asyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!email) {
      res.status(400);
      throw new Error('please add email 123');
    } else if (!password) {
      res.status(400);
      throw new Error('please add password');
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export const register___OLD = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGIN USER */
export const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      res.status(400);
      throw new Error('please add email');
    } else if (!password) {
      res.status(400);
      throw new Error('please add password');
    }

    res.status(200).json({ message: 'set goal' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* TEst USERS */
