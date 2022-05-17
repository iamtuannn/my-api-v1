import dbConnect from '../../../lib/dbConnect'
import Quote from '../../../models/Quote'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const quote = await Quote.findById(id)
        if (!quote) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json(quote)
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const quote = await Quote.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!quote) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json(quote)
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedQuote = await Quote.deleteOne({ _id: id })
        if (!deletedQuote) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
