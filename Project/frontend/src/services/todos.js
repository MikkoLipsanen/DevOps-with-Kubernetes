import axios from 'axios'
const backendUrl = 'http://localhost:8081'

const getAll = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/todos`)
    return response.data
  } catch (error) {
    console.log(error);
  }
}

const create = async (newTodo) => {
  try {
    const response = await axios.post(`${backendUrl}/api/todos`,  {todo: newTodo})
    return response.data
  } catch (error) {
    console.log(error);
  }
}

const update = async (id, newTodo) => {
  try {
    const response = await axios.put(`${backendUrl}/api/todos/${id}`, {todo: newTodo})
    return response.data
  } catch (error) {
    console.log(error);
  }
}

export default {
  getAll,
  create,
  update
}