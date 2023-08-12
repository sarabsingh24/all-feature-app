import asyncHandler from 'express-async-handler';
import Article from '../models/Article.js';
//@desc     Fetch Articles
//@route    GET /api/articles/
export const getArticles = asyncHandler(async (req, res) => {
  const article = await Article.find();

  res.status(201).json(article);
});

//@desc     Add Article
//@route    POST /api/articles/
export const setArticle = asyncHandler(async (req, res) => {
  const { title, text } = req.body;
  if (!title) {
    res.status(400);
    throw new Error('Please add a title value controller');
  }
  if (!text) {
    res.status(400);
    throw new Error('Please add a text value controller');
  }

  const article = await Article.create({
    title: title,
    text: text,
  });

  res.status(201).json(article);
});

//@desc     Update single Article
//@route    PATCH /api/articles/:id
export const updateArticle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const article = await Article.findById(id);
  if (!article) {
    res.status(400);
    throw new Error('Article not found');
  }

  const updateArticle = await Article.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updateArticle);
});

//@desc     Remove single Article
//@route    DELETE /api/articles/:id
export const deleteArticle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const article = await Article.findById(id);

  if (!article) {
    res.status(400);
    throw new Error('Article not found');
  }

   await article.deleteOne();

  res.status(200).json({id:id});
});
