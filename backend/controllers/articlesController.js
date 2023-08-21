import asyncHandler from 'express-async-handler';
import Article from '../models/Article.js';
import User from '../models/User.js';

//@desc     Add Article
//@route    POST /api/articles/
//@discription: the person who has logined, we are using middleware to check the web token has also been passed and we are getting req.user.id from the web token check: generateToken function in authContrioller  (by Trivers media)

export const setArticle = asyncHandler(async (req, res) => {

  
  try {
    const { title,description, picturePath } = req.body;
    
    // req.user.id is getting from verifytoken middleware
    const user = await User.findById(req.user.id);

    const newArticle = new Article({
      userId: req.user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      title,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    await newArticle.save();

    const article = await Article.find().sort('-createdAt');
    res.status(201).json(article);
  } catch (err) {
    res.status(409);
    throw new Error('post not created');
  }
});


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
  console.log(req.user.id);
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
  // if (article.user.toString() !== user.id) {
  //   res.status(401);
  //   throw new Error('User not authorised');
  // }

  const updateArticle = await Article.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  // res.status(200).json(updateArticle);
  const allPost = await Article.find().sort('-createdAt');
  res.status(201).json(allPost);
});

export const likeArticle = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  console.log(req.body);
  try {
    const { id } = req.params;
    const article = await Article.findById(id);
    // req.user.id is getting from verifytoken middleware
    const isLiked = article.likes.get(userId);
    if (isLiked) {
      article.likes.delete(userId);
    } else {
      article.likes.set(userId, true);
    }
   await Article.findByIdAndUpdate(
      id,
      {
        likes: article.likes,
      },
      { new: true }
    );

    // res.status(200).json(updatedArticle);
     const allPost = await Article.find().sort('-createdAt');
     res.status(200).json(allPost);
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
  
  // if (article.user.toString() !== user.id) {
  //   res.status(401);
  //   throw new Error('User not authorised');
  // }

  await article.deleteOne();

  // res.status(200).json({ id: id });
  const allPost = await Article.find().sort('-createdAt');
  res.status(201).json(allPost);
});
