
import {
  getArticles,
  setArticle,
  getUserArticles,
  likeArticle,
  updateArticle,
  deleteArticle,
} from '../controllers/articlesController.js';
import { veryfyToken } from '../middleware/auth.js';
import express from 'express';
const router = express.Router();


// router.get('/:useeId/articles', veryfyToken, getUserArticles);

router.post('/',veryfyToken, setArticle);
router.get('/', veryfyToken, getArticles);
router.get('/:userId', veryfyToken, getUserArticles);
router.get('/:id/likes', veryfyToken, likeArticle);
router.put('/:id', veryfyToken,updateArticle);
router.delete('/:id',veryfyToken, deleteArticle);

export default router