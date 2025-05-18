import { useState, useEffect } from 'react'
import todoService from './services/todos'
import NewTodo from "./components/NewTodo"
import Todos from "./components/Todos"
import Image from "./components/Image"

const App = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    todoService.getAll().then((initialTodos) => {
      setTodos(initialTodos)
    })
  }, [])

  return (
    <div>
      <Image />
      <NewTodo todos={todos} setTodos={setTodos} />
      <Todos todos={todos} />
    </div>
  )
}

export default App