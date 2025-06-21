const axios = require('axios');
const { Client } = require("pg");
require('dotenv').config();

const table = process.env.TABLE;
const textCol = process.env.TEXT_COLUMN;
const doneCol = process.env.DONE_COLUMN;

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
      ${textCol} TEXT,
      ${doneCol} BOOLEAN  
    );`
  await client.query(createTableText)
};

const insertValue = async(client, todo) => {
  await createTable(client);
  const text = `INSERT INTO ${table}(${textCol}, ${doneCol}) VALUES ($1, $2) RETURNING *`
  const values = [todo[textCol], todo[doneCol]]
  const res = await client.query(text, values)
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
  const todo = {
    [textCol]: `Read ${url}`,
    [doneCol]: false
  }
  const client = await getClient();
  const newTodo = await insertValue(client, todo)
  client.end();
}

saveUrl()


