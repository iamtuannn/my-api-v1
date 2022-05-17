import mongoose from "mongoose";

const schema = mongoose.Schema({
  title: String,
  titleUrl: String,
  imageUrl: String,
  published: String,
  excerpt: String,
  popular: Boolean,
  trending: Boolean,
  body: String,
});

export default mongoose.models.News || mongoose.model("News", schema);
