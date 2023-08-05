import asyncHandler from 'express-async-handler';


//@desc     Fetch Users
//@route    GET /api/users/
export const getUsers = asyncHandler(async (req, res) => {
  try {
    res.status(201).json({ message: 'get user.......' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//@desc     Add Users
//@route    POST /api/users/
export const setUser = asyncHandler(async (req, res) => {
  try {
    res.status(201).json({ message: 'set user.......' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//@desc     Update single Users
//@route    PATCH /api/users/:id
export const updateUser = asyncHandler(async (req, res) => {
  try {
    res.status(201).json({ message: 'update user.......' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//@desc     Remove single Users
//@route    DELETE /api/users/:id
export const deleteUser = asyncHandler(async (req, res) => {
  try {
    res.status(201).json({ message: 'delete user.......' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
