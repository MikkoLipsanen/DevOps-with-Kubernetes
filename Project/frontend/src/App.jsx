import { useState, useEffect } from 'react'
import todoService from './services/todos'
import imageService from './services/image'

const App = () => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState([])
  const [image, setImage] = useState('') 

  useEffect(() => {
    todoService.getAll().then((initialTodos) => {
      setTodos(initialTodos)
    })
  }, [])

  useEffect(() => {
    if (image === '') {
      const img = imageService.getImage()
      setImage(img)
    }
    const interval = setInterval(() =>
      imageService.getImage().then((img) => {setImage(img)}
    ), 3600000)
    return () => clearInterval(interval)
  }, [])

  const handleTodoChange = (event) => {
    setNewTodo(event.target.value)
  }

  const addTodo = (event) => {
    event.preventDefault()
    setTodos(todos.concat(newTodo))
    setNewTodo('')
}

  return (
    <div>
      <img src={`data:image/jpeg;base64,${image}`}></img>
      <form onSubmit={addTodo}>        
        <input
          value={newTodo}
          onChange={handleTodoChange} 
          maxLength={140}       
        />        
        <button type="submit">Create TODO</button>      
      </form>
      <ul>
        {todos.map((todo) => <li key={todo}>{todo}</li>)}
      </ul>
    </div>
  )
}

export default App