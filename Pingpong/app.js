const express = require('express')
const { Client } = require("pg");
require('dotenv').config();
const app = express()

process.on('uncaughtException', function (err) {
  console.log(err);
});

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
  const text = `INSERT INTO ${table}(${col}) VALUES ($1)`
  await client.query(text, [value])
};

const createTable = async (client) => {
  const createTableText = `
    CREATE TABLE IF NOT EXISTS ${table} (
      id SERIAL PRIMARY KEY,
      ${col} SMALLINT DEFAULT 0
    );`
  await client.query(createTableText)
  await insertValue(client, 0)

};

const getCounter = async(client) => {
  await createTable(client)
  const text = `SELECT ${col} FROM ${table} WHERE id = 1`
  const result = await client.query(text)
  return result.rows[0]
};

const updateCounter = async (client, value) => {
  const text = `UPDATE ${table} SET ${col} = $1 WHERE id = $2`
  const values = [value, 1];
  const res = await client.query(text, values)
};

app.get('/pingpong', async(req, res) => {
  const client = await getClient();
  const counter = await getCounter(client);
  res.send(`Pongs: ${counter.count}`)
  await updateCounter(client, counter.count + 1)
  client.end();
})

app.get('/', async(req, res) => {
  const client = await getClient();
  const counter = await getCounter(client);
  res.send(counter.count)
  client.end();
})

app.get('/healthz', async(req, res) => {
  const client = await getClient();
  const status = client ? 200 : 500
  console.log(`Received a request to healthz and responding with status ${status}`)
  res.sendStatus(status)
})

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})