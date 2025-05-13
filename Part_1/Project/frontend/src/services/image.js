import axios from 'axios'
import {Buffer} from 'buffer';
const baseUrl = 'http://localhost:3000/api/image'

const getImage = async () => {
  const image = await axios.get(baseUrl, {responseType: 'arraybuffer'})
  const img = Buffer.from(image.data).toString('base64')
  return img
}

export default {
  getImage
}