import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Article = mongoose.model('Article', ArticleSchema);
export default Article;


//  {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: 'User',
//     },
//     title: {
//       type: String,
//       required: [true, 'Please add title value scheema'],
//     },
//     text: {
//       type: String,
//       required: [true, 'Please add text value scheema'],
//     },
//     likes: {
//       type: Number,
//     },
//     dislikes: {
//       type: Number,
//     },
  
//   },