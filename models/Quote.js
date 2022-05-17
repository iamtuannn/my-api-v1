import mongoose from "mongoose";

const schema = mongoose.Schema({
  quote: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  title: {
    type: String,
  },
});

export default mongoose.models.Quote || mongoose.model("Quote", schema);
