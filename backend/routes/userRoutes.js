import {
  getUsers,
  getUser,
  getUserFriends,
  addRemoveFriend,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { veryfyToken } from '../middleware/auth.js';
import express from 'express';
const router = express.Router();

router.get('/',veryfyToken, getUsers);
router.get('/', veryfyToken, getUser);
router.get('/:id/friends', veryfyToken, getUserFriends);
router.get('/:id/friends/friendId', veryfyToken, addRemoveFriend);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
