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

  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error('please fill the');
  }

  const createUser = await User.findOne({ email });
  if (createUser) {
    res.status(400);
    throw new Error('user already exist');
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

  if (savedUser) {
    res.status(201).json(savedUser);
  } else {
    res.status(400);
    throw new Error('invalid user data');
  }
});

/* LOGIN USER */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('please fill all field');
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      firstName:user.firstName,
      lastName:user.lastName,
      email: user.email,
     
    });
  } else {
    res.status(400);
    throw new Error('invalid credentials');
  }

  res.status(200).json(loginUser);
});

/* TEst USERS */
