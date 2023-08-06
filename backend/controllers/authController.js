import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';

/*  REGISTER USER  */

export const register = asyncHandler(async (req, res) => {
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

  if (!email) {
    res.status(400);
    throw new Error('please add email 123');
  } else if (!password) {
    res.status(400);
    throw new Error('please add password');
  }
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const savedUser = await User.create({
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

  res.status(201).json(savedUser);
});

/* LOGIN USER */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(400);
    throw new Error('please add email');
  } else if (!password) {
    res.status(400);
    throw new Error('please add password');
  }

const loginUser = await User.findOne(email);

  res.status(200).json(loginUser);
});

/* TEst USERS */
