const express = require('express')
const path = require('path')
const fs = require('node:fs')
const app = express()

var counter = 0

app.get('/pingpong', (req, res) => {
    res.send(`Pongs: ${counter.toString()}`)
    counter += 1
})

app.get('/', (req, res) => {
    res.send(counter.toString())
})

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})