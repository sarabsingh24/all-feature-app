import {
  getUsers,
  
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import express from 'express';
const router = express.Router();

router.get('/', getUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
