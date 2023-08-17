import { register, login } from '../controllers/authController.js';
import { check, validationResult } from 'express-validator';

import express from 'express';
const router = express.Router();

router.post(
  '/register',
  [
    check('firstName', 'First Name is Required').not().isEmpty(),
    check('email', 'Valid Email is required').isEmail(),
    check('password', 'Password leangth should be 6 or more character').isLength({min:6}),
  ],
  register
);
router.post('/login', [
    check('email', 'Valid Email is required').isEmail(),
    check('password', 'Password leangth should be 6 or more character').isLength({min:6}),
  ], login);

 
 
export default router;
