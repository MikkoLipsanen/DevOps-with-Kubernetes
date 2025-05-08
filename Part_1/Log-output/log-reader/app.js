const { randomBytes } = require('node:crypto')
const express = require('express')
const fs = require('node:fs')
const path = require('path')

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
const pongPath = path.join(directory, 'pong.txt')
let now = ''
let pongs = '0'

app.get('/', (req, res) => {
  if (fs.existsSync(nowPath)) {
    now = fs.readFileSync(nowPath, 'utf8')
  } 
  if (fs.existsSync(pongPath)) {
    pongs = fs.readFileSync(pongPath, 'utf8')
  }
  res.send(now + ': ' + string + '\n' + 'Ping \ Pongs: ' + pongs)
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})