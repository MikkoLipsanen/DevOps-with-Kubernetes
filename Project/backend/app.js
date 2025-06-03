const express = require('express')
const cors = require('cors')
const { Client } = require("pg");
require('dotenv').config();

const app = express()
app.use(cors())
app.use(express.json())

const table = process.env.TABLE;
const col = process.env.COLUMN;

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

const insertValue = async(client, value) => {
  const text = `INSERT INTO ${table}(${col}) VALUES ($1) RETURNING *`
  const res = await client.query(text, [value])
  return res.rows[0]
};

const createTable = async (client) => {
  const createTableText = `
    CREATE TABLE IF NOT EXISTS ${table} (
      id SERIAL PRIMARY KEY,
      ${col} TEXT 
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
  console.log(todos);
  client.end();
  response.json(todos)
});

app.post('/api/todos', async(request, response) => {
  const todo = request.body.todo;
  if (todo.length <= 140) {
    const client = await getClient();
    const newTodo = await insertValue(client, todo)
    console.log('new: ' + newTodo)
    client.end();
    response.send(newTodo)
  } else {
    console.log('Todo exceeds allowed maximum length.')
  }
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})