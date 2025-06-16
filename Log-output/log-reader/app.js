const { randomBytes } = require('node:crypto')
const express = require('express')
const fs = require('node:fs')
const path = require('path')
const axios = require('axios')

const app = express()

const pingpongUrl = 'http://pingpong-svc:2345'

const getPong = async() => {
  try {
    const response = await axios.get(pingpongUrl)
    return response.data
  } catch (error) {
    console.log(error);
  }
}

const getFile = (path) => {
  if (fs.existsSync(path)) {
    file = fs.readFileSync(path, 'utf8')
    return file
  } else {
    console.log(`File at ${path} not found`)
  }
}

const randomString = (length) => {
  if (length % 2 !== 0) {
    length++
  }

  return randomBytes(length / 2).toString('hex')
}

const string = randomString(20)

const fileDirectory = path.join('/', 'usr', 'src', 'app', 'files')
const confDirectory = path.join('/', 'usr', 'src', 'app', 'config')
const nowPath = path.join(fileDirectory, 'now.txt')
const infoPath = path.join(confDirectory, 'information.txt')

const message = process.env.MESSAGE

let now = ''
let info = ''

app.get('/', async (req, res) => {
  now = getFile(nowPath)
  info = getFile(infoPath)

  const pongs = await getPong()

  const infoString = 'file content: ' + info
  const messageString = 'env variable: MESSAGE=' + message 
  const timeString = now + ': ' + string
  const pongString = 'Ping \ Pongs: ' + pongs
  res.send(infoString + '\n' + messageString + '\n' + timeString + '\n' + pongString)
})

const PORT = process.env.PORT || 3000

app.get('/healthz', async(req, res) => {
  const pongs = await getPong()
  const status = pongs ? 200 : 500
  console.log(`Received a request to healthz and responding with status ${status}`)
  res.sendStatus(status)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})