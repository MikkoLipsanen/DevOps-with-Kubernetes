const express = require('express')

const app = express()

var counter = 0

app.get('/pingpong', (req, res) => {
    res.send(`pong ${counter}`)
    counter += 1
})

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})