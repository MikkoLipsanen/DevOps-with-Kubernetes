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
const filePath = path.join(directory, 'now.txt')

app.get('/', (req, res) => {
  const now = fs.readFileSync(filePath, 'utf8')
  res.send(now + ': ' + string)
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})