
import {
  getArticles,
  setArticle,
  updateArticle,
  deleteArticle,
} from '../controllers/articlesController.js';
import express from 'express';
const router = express.Router();

router.get('/', getArticles);
router.post('/', setArticle);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

export default router