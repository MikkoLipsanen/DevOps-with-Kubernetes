const { randomBytes } = require('node:crypto')
const express = require('express')
const fs = require('node:fs')
const path = require('path')
const axios = require('axios')

const pingpongUrl = 'http://pingpong-svc:2345'

const getPong = async() => {
  try {
    const response = await axios.get(pingpongUrl)
    return response.data
  } catch (error) {
    console.log(error);
  }
}

const app = express()

const randomString = (length) => {
  if (length % 2 !== 0) {
    length++
  }

  return randomBytes(length / 2).toString('hex')
}

const string = randomString(20)

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const nowPath = path.join(directory, 'now.txt')

let now = ''

app.get('/', async (req, res) => {
  if (fs.existsSync(nowPath)) {
    now = fs.readFileSync(nowPath, 'utf8')
  } 
  const pongs = await getPong()
  res.send(now + ': ' + string + '\n' + 'Ping \ Pongs: ' + pongs)
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})