import {
  getUsers,
  setUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import express from 'express';
const router = express.Router();

router.get('/', getUsers);
router.post('/', setUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

// router.post('/', userList);

export default router;
