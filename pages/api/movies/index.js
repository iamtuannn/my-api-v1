import dbConnect from "../../../lib/dbConnect";
import cors from "../../../lib/cors";
import Movie from "../../../models/Movie";
import News from "../../../models/News";
export default async function handler(req, res) {
  const { method } = req;

  await cors(req, res)

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const movies = await Movie.find(
          {}
        ); /* find all the data in our database */

        res.status(200).json({ totalMovies: movies.length, movies });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const movies = await Movie.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: movies });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
