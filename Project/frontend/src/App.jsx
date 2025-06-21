import { useState, useEffect } from 'react'
import todoService from './services/todos'
import NewTodo from "./components/NewTodo"
import Todos from "./components/Todos"
import Image from "./components/Image"

const App = () => {
  const [todos, setTodos] = useState([])
  console.log(todos)
  useEffect(() => {
    todoService.getAll().then((initialTodos) => {
      setTodos(initialTodos)
    })
  }, [])

  const markAsDone = id => {
    const todo = todos.find(t => t.id === id)
    const changedTodo = { ...todo, done: true }

    todoService.update(id, changedTodo).then(response => {
      setTodos(todos.map(todo => todo.id !== id ? todo : response))
    })  
  }

  return (
    <div>
      <h1>The Project App</h1>
      <Image />
      <NewTodo todos={todos} setTodos={setTodos} />
      <Todos todos={todos} markAsDone={markAsDone} />
    </div>
  )
}

export default App