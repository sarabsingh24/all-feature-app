import asyncHandler from 'express-async-handler';
import Article from '../models/Article.js';
import User from '../models/User.js';

//@desc     Add Article
//@route    POST /api/articles/
//@discription: the person who has logined, we are using middleware to check the web token has also been passed and we are getting req.user.id from the web token check: generateToken function in authContrioller  (by Trivers media)

export const setArticle = asyncHandler(async (req, res) => {
  try {
    const { description, picturePath } = req.body;
    // req.user.id is getting from verifytoken middleware
    const user = await User.findById(req.user.id);

    const newArticle = new Article({
      userId: req.user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    await newArticle.save();

    const article = await Article.find();
    res.status(201).json(article);
  } catch (err) {
    res.status(409);
    throw new Error('post not created');
  }
});

// export const setArticleOLD = asyncHandler(async (req, res) => {
//   const { title, text, likes, dislikes } = req.body;
//   if (!title) {
//     res.status(400);
//     throw new Error('Please add a title value controller');
//   }
//   if (!text) {
//     res.status(400);
//     throw new Error('Please add a text value controller');
//   }

//   const article = await Article.create({
//     title: title,
//     text: text,
//     likes: 99,
//     dislikes: 88,
//     user: req.user.id,
//   });

//   res.status(200).json(article);
// });

//@desc     Fetch Articles
//@route    GET /api/articles/
export const getArticles = asyncHandler(async (req, res) => {
  try {
    const article = await Article.find().sort('-createdAt');
    res.status(200).json(article);
  } catch (err) {
    res.status(404);
    throw new Error('Article not created');
  }
});

//@desc     Fetch Articles
//@route    GET /api/articles/
export const getUserArticles = asyncHandler(async (req, res) => {
  try {
    // req.user.id is getting from verifytoken middleware
    const article = await Article.find({ userId: req.user.id });
    res.status(200).json(article);
  } catch (err) {
    res.status(404);
    throw new Error('Article not created');
  }
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

  const user = await User.findById(req.user.id);

  //check user exist
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  //match user
  if (article.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorised');
  }

  const updateArticle = await Article.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updateArticle);
});

export const likeArticle = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);
    // req.user.id is getting from verifytoken middleware
    const isLiked = article.likes.get(req.user.id);
    if (isLiked) {
      article.likes.delete(req.user.id);
    } else {
      article.likes.set(req.user.id, true);
    }
    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      {
        likes: article.likes,
      },
      { new: true }
    );

    res.status(200).json(updatedArticle);
  } catch (err) {
    res.status(404);
    throw new Error('Article lokes not updated');
  }
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

  const user = await User.findById(req.user.id);

  //check user exist
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  //match user
  if (article.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorised');
  }

  await article.deleteOne();

  res.status(200).json({ id: id });
});
