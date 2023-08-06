import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add title value scheema'],
    },
    text: {
      type: String,
      required: [true, 'Please add text value scheema'],
    },
  },
  { timestamps: true }
);

const Article = mongoose.model('Article', ArticleSchema);
export default Article;
