const express = require('express')
const path = require('path')
const fs = require('node:fs')
const app = express()


var counter = 0

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'pong.txt')

app.get('/pingpong', (req, res) => {
    res.send(`pong ${counter.toString()}`)
    fs.writeFile(filePath, counter.toString(), err => {
      if (err) {
        console.error(err)
      } 
    })
    counter += 1
})

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})