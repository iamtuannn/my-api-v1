import dbConnect from "../../../lib/dbConnect";
import News from "../../../models/News";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const news = await News.find(
          {}
        ); /* find all the data in our database */
        res.status(200).json({ totalNews: news.length, news: news });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const news = await News.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: news });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
