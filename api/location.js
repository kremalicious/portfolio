import axios from 'axios'

export default async function getLocationHandler(req, res) {
  if (!process.env.NOMADLIST_PROFILE) return

  try {
    const response = await axios(
      `https://nomadlist.com/@${process.env.NOMADLIST_PROFILE}.json?key=${process.env.NOMADLIST_KEY}`
    )
    if (!response?.data) return
    res.json(response.data.location)
  } catch (error) {
    res.status(500).send(error)
  }
}
