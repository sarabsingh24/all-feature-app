import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

//@desc     Fetch Users
//@route    GET /api/users/
export const getUsers = asyncHandler(async (req, res) => {
  const getUserList = await User.find();

  res.status(200).json(getUserList);
});

//@desc     Add Users
//@route    POST /api/users/
//Register user command

//@desc     Update single Users
//@route    PATCH /api/users/:id
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true });

  res.status(200).json(updateUser);
});

//@desc     Remove single Users
//@route    DELETE /api/users/:id
export const deleteUser = asyncHandler(async (req, res) => {
 const { id } = req.params;

await User.remove()

res.status(200).json({id:id});

});
