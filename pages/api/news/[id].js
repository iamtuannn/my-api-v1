import dbConnect from '../../../lib/dbConnect'
import cors from '../../../lib/cors'
import News from '../../../models/News'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await cors(req, res)

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const news = await News.findById(id)
        if (!news) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json(news)
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const news = await News.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!news) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json(news)
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedNews = await News.deleteOne({ _id: id })
        if (!deletedNews) {
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
