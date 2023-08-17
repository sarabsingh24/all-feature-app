import jwt from 'jsonwebtoken';


import User from '../models/User.js';
import asyncHandler from 'express-async-handler';

export const veryfyToken = asyncHandler(async (req, res, next) => {
 
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        //get token from headers
        token = req.headers.authorization.split(' ')[1];

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //get user from token
        req.user = await User.findById(decoded.id).select('-password');
        next();
      } catch (err) {
        res.status(401);
        throw new Error('Not Authorised');
      }
    }

    if (!token) {
      res.status(401);
      throw new Error('Not Authorised,no token');
    }
});
