const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

let todos = [
  "TODO 1", "TODO 2", "TODO 3"
]

app.get('/api/todos', (request, response) => {
  response.json(todos)
})

app.post('/api/todos', (request, response) => {
  const todo = request.body.todo
  todos = todos.concat(todo)
  response.send(todo)
})

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})