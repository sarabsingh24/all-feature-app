import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import config from 'config';
import asyncHandler from 'express-async-handler';
import { check, validationResult } from 'express-validator';
import gravatar from 'gravatar';
import cloudinary from '../cloudnary/data.js';

/*  REGISTER USER  */
//@desc     Add Users
//@route    POST /api/users/register
//@access   Public

export const register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

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

  // if (!firstName || !lastName || !email || !password) {
  //   res.status(400);
  //   throw new Error('please fill the');
  // }

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ errors: [{ msg: 'user already exist' }] });
    // throw new Error('user already exist');
  }

  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'mm',
  });

  //bcrypt
  const salt = await bcrypt.genSalt(10);
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
    avatar,
    token: generateToken(),
    viewedProfile: Math.floor(Math.random() * 10000),
    impressions: Math.floor(Math.random() * 10000),
  });

  const savedUser = await newUser.save();

  if (savedUser) {
    return res.status(201).json(savedUser);
  } else {
    res.status(500);
    throw new Error('invalid user data');
  }
});

/* LOGIN USER */
//@desc     login Users
//@route    POST /api/users/login
//@access   Public

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  // if (!email || !password) {
  //   res.status(400);
  //   throw new Error('please fill all field');
  // }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      picturePath: user.picturePath,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error('invalid credentials');
  }
  // delete user.password;
  // res.status(200).json(user);
});

export const userImg = asyncHandler(async (req, res) => {
  res.send({
    message: 'Image uploaded',
    imagePath: `/${req.file.path}`,
  });
});

//JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};
/* TEst USERS */
