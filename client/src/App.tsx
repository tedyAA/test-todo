import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import TodoItem from './components/TodoItem'

function App() {
    const [todos, setTodos] = useState([])

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('low')
    const [color, setColor] = useState('#3b82f6')
    const [date, setDate] = useState('')

    const fetchTodos = async () => {
        const res = await axios.get('http://localhost:5000/todos')
        setTodos(res.data)
        console.log(res.data)
    }

    useEffect(() => {
        fetchTodos()
    }, [])

    const addTodo = async () => {
        if (!name.trim()) return

        await axios.post('http://localhost:5000/todos', {
            name,
            description,
            priority,
            color,
            date
        })

        setName('')
        setDescription('')
        setPriority('low')
        setColor('#3b82f6')
        setDate('')

        fetchTodos()
    }

    const deleteTodo = async (id) => {
        await axios.delete(`http://localhost:5000/todos/${id}`)
        fetchTodos()
    }

    const toggleTodo = async (id) => {
        await axios.put(`http://localhost:5000/todos/${id}`)
        fetchTodos()
    }

    const editTodo = async (id, updatedTodo) => {
        await axios.put(`http://localhost:5000/todos/${id}/edit`, updatedTodo)
        fetchTodos()
    }

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
            <h1>Todo App</h1>

            {/* Inputs */}
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Todo name"
                className="input-todo"
            />

            <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="input-todo"
            />

            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="input-todo"
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="input-todo"
                placeholder={"Pick a color"}
            />

            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input-todo"
            />

            <button onClick={addTodo} className="button-todo">
                Add
            </button>

            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onDelete={deleteTodo}
                    onToggle={toggleTodo}
                    onEdit={editTodo}
                />
            ))}
        </div>
    )
}

export default App
