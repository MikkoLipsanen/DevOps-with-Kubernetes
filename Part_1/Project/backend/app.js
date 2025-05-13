const express = require('express')
const path = require('path')
const fs = require('node:fs')
const cors = require('cors')

const app = express()
app.use(cors())

let todos = [
  "TODO 1", "TODO 2", "TODO 3"
]

picsumUrl = 'https://picsum.photos/200'

const imgPath = path.join('/', 'usr', 'src', 'app', 'files', 'img.jpg')

async function loadImage(url, savePath) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer, 'binary');
    fs.writeFileSync(savePath, buffer);
}

loadImage(picsumUrl, imgPath)

setInterval(() => {
  loadImage(picsumUrl, imgPath)
}, 3600000)

app.get('/api/todos', (request, response) => {
  response.json(todos)
})

app.get('/api/image', (request, response) => {
  response.sendFile(imgPath)
})

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})