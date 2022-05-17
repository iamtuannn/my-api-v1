import dbConnect from "../../../lib/dbConnect";
import Quote from "../../../models/Quote";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const quotes = await Quote.find(
          {}
        ); /* find all the data in our database */
        res.status(200).json({ totalQuote: quotes.length, quotes: quotes });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const quote = await Quote.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: quote });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
