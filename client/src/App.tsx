import { useEffect, useState } from 'react'
import axios from 'axios'


function App() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')

  // load todos when app starts
  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:5000/todos')
    setTodos(res.data)
  }

  const addTodo = async () => {
    if (!text.trim()) return

    await axios.post('http://localhost:5000/todos', {
      text: text
    })

    setText('')
    fetchTodos()
  }

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`)
    fetchTodos()
  }

  return (
      <div style={{ padding: '20px' }}>
        <h1>Todo App</h1>

        <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter todo"
            className={"input-todo"}
        />

        <button onClick={addTodo}>Add</button>

        <ul>
          {todos.map(todo => (
              <li key={todo.id}>
                {todo.text}
                <button onClick={() => deleteTodo(todo.id)}>
                  ❌
                </button>
              </li>
          ))}
        </ul>
      </div>
  )
}

export default App
