const express = require('express')
const cors = require('cors')
const { Client } = require("pg");
require('dotenv').config();

const app = express()
app.use(cors())
app.use(express.json())

const table = process.env.TABLE;
const textCol = process.env.TEXT_COLUMN;
const doneCol = process.env.DONE_COLUMN;

const getClient = async () => {
  const client = new Client({
    password: process.env.POSTGRES_PASSWORD,
    user: process.env.POSTGRES_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.POSTGRES_DB,
  });
  await client.connect();
  return client;
};

const insertValue = async(client, todo) => {
  const text = `INSERT INTO ${table}(${textCol}, ${doneCol}) VALUES ($1, $2) RETURNING *`
  const values = [todo[textCol], todo[doneCol]]
  const res = await client.query(text, values)
  client.end();
  return res.rows[0]
};

const createTable = async (client) => {
  const createTableText = `
    CREATE TABLE IF NOT EXISTS ${table} (
      id SERIAL PRIMARY KEY,
      ${textCol} TEXT,
      ${doneCol} BOOLEAN 
    );`
  await client.query(createTableText)
};

const getTodos = async(client) => {
  await createTable(client)
  const text = `SELECT * FROM ${table}`
  const result = await client.query(text)
  return result.rows
};

app.get('/api/todos', async(request, response) => {
  const client = await getClient();
  const todos = await getTodos(client);
  console.log(todos)
  client.end();
  response.json(todos)
});

app.post('/api/todos', async(request, response) => {
  const todo = {
    [textCol]: request.body.todo,
    [doneCol]: false
  }
  
  if (todo[textCol].length <= 140) {
    const client = await getClient();
    const newTodo = await insertValue(client, todo)
    console.log(newTodo)
    client.end();
    response.send(newTodo)
  } else {
    console.log('Todo exceeds allowed maximum length.')
  }
})

app.put('/api/todos/:id', async (req, res) => {
  const client = await getClient();
  const newTodo = req.body.todo
  const id = req.params.id
  const update = `UPDATE ${table} SET ${doneCol} = $1 WHERE id = $2`;
  const values = [newTodo.done, id]
  const result = await client.query(update, values);
  client.end();
  res.json(newTodo);
});

app.get('/healthz', async(req, res) => {
  const client = await getClient();
  const status = client ? 200 : 500
  console.log(`Received a request to healthz and responding with status ${status}`)
  res.sendStatus(status)
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})