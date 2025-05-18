import { useState } from 'react'
import todoService from '../services/todos'

const NewTodo = ({todos, setTodos}) => {
    const [newTodo, setNewTodo] = useState([])

    const addTodo = (event) => {
        event.preventDefault()
        todoService.create(newTodo).then(returnedTodo => {
            setTodos(todos.concat(returnedTodo))
            setNewTodo('')
        })
    }

    const handleTodoChange = (event) => {
        setNewTodo(event.target.value)
    }

    return (
        <form onSubmit={addTodo}>
            <input
                value={newTodo}
                onChange={handleTodoChange} 
                maxLength={140}       
            />
            <button type="submit">Create TODO</button>
        </form>
    )
}

export default NewTodo