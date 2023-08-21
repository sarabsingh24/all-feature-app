import {
  getUsers,
  getUser,
  getUserProfile,
  getUserFriends,
  addRemoveFriend,
 

  deleteUser,
} from '../controllers/userController.js';
import { veryfyToken } from '../middleware/auth.js';
import express from 'express';
const router = express.Router();

router.get('/',veryfyToken, getUsers);
router.get('/me', veryfyToken, getUser);
router.get('/:id',veryfyToken, getUserProfile);
router.get('/:id/friends', veryfyToken, getUserFriends);
router.get('/:id/friends/friendId', veryfyToken, addRemoveFriend);

router.delete('/:id', deleteUser);

export default router;
