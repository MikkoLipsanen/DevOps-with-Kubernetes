const Todos = ({todos, markAsDone}) => {
    if (todos.length !== 0) {
        const dones = todos.filter((todo) => todo.done === true)
        const notDones = todos.filter((todo) => todo.done === false)
        return(
            <div>
                <h2>Todo</h2>
                <ul>
                    {notDones.map((todo) => 
                        <li key={todo.id}>
                            {todo.text} <button onClick={() => markAsDone(todo.id)}>Mark as done</button>
                        </li>)
                    }
                </ul>
                <h2>Done</h2>
                <ul>
                    {dones.map((todo) => 
                        <li key={todo.id}>
                            {todo.text} 
                        </li>)
                    }
                </ul>
            </div>
        )
    } else {
        return (
            <div>Waiting for todos..</div>
        )
    }
}

export default Todos