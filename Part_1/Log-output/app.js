const { randomBytes } = require('node:crypto')
const express = require('express')

const app = express()

const randomString = (length) => {
  if (length % 2 !== 0) {
    length++
  }

  return randomBytes(length / 2).toString('hex')
}

const string = randomString(20)
var current = ""

setInterval(() => {
    const now = new Date().toISOString()
    current = now + ': ' + string
    console.log(current)
}, 5000)

app.get('/', (req, res) => {
  res.send(current)
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})