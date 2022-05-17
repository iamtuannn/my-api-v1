import dbConnect from '../../../lib/dbConnect'
import Movie from '../../../models/Movie'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const movies = await Movie.findById(id)
        if (!movies) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json(movies)
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const movies = await Movie.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!movies) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json(movies)
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedMovie = await Movie.deleteOne({ _id: id })
        if (!deletedMovie) {
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
