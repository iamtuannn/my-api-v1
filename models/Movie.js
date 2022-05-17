import mongoose from "mongoose";

const schema = mongoose.Schema({
  tmdbID: String,
  cybersoftID: String,
});

export default mongoose.models.Movie || mongoose.model("Movie", schema);
