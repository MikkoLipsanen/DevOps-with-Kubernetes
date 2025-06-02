const axios = require('axios');
const { Client } = require("pg");
require('dotenv').config();

const table = process.env.TABLE;
const col = process.env.COLUMN;

const wikiUrl = "https://en.wikipedia.org/wiki/Special:Random"

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

const createTable = async (client) => {
  const createTableText = `
    CREATE TABLE IF NOT EXISTS ${table} (
      id SERIAL PRIMARY KEY,
      ${col} TEXT 
    );`
  await client.query(createTableText)
};

const insertValue = async(client, value) => {
  await createTable(client);
  const text = `INSERT INTO ${table}(${col}) VALUES ($1) RETURNING *`
  const res = await client.query(text, [value])
  return res.rows[0]
};

const getUrl = async() => {
  try {
    const response = await axios.get(wikiUrl)
    const url = response.request.res.responseUrl
    return url
  } catch (error) {
    console.log(error);
  }
}

const saveUrl = async() => {
  const url = await getUrl();
  const todo = `Read ${url}`;
  const client = await getClient();
  const newTodo = await insertValue(client, todo)
}

saveUrl()


