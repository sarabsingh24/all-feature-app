import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

//@desc     Fetch Users================================================
//@route    GET /api/users/
export const getUsers = asyncHandler(async (req, res) => {
  const getUserList = await User.find();
  res.status(200).json(getUserList);
});

//@desc     Fetch User================================================
//@route    GET /api/users/:id
//@access   Private
export const getUser = asyncHandler(async (req, res) => {
  const { _id, firstName, email } = await User.findById(req.params.id);
  // const { _id, firstName, email } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    firstName,
    email,
  });
});

//@desc     user friends list================================================
//@route    PATCH /api/users/:id/friends
export const getUserFriends = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const friends = await Promise.all(
      user.friends.map(({ id }) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(400);
    throw new Error({ message: error.message });
  }
});

//@desc     user friends list================================================
//@route    PATCH /api/users/:id/friends/friendId
export const addRemoveFriend = asyncHandler(async (req, res) => {
  try {
    const { id, friendId } = req.params;

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter(({ id }) => id !== friendId);
      friend.friends = friend.friends.filter(({ id }) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends(id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map(({ id }) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(400);
    throw new Error({ message: error.message });
  }
});

//@desc     Update single Users================================================
//@route    PATCH /api/users/:id
export const updateUser = asyncHandler(async (req, res) => {
  const article = await User.findById(req.params.id);

  if (!article) {
    res.status(401);
    throw new Error('article not found');
  }

  const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true });

  res.status(200).json(updateUser);
});

//@desc     Remove single Users================================================
//@route    DELETE /api/users/:id
export const deleteUser = asyncHandler(async (req, res) => {
  await User.remove();

  res.status(200).json({ id: req.params.id });
});
