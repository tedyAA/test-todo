const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

let todos = []
let id = 1


app.get('/todos', (req, res) => {
  res.json(todos)
})


app.post('/todos', (req, res) => {
  const newTodo = {
    id: id++,
    name: req.body.name,
    description: req.body.description,
    priority: req.body.priority,
    color: req.body.color,
    date: req.body.date,
    completed: false
  }

  todos.push(newTodo)
  res.json(newTodo)
})

app.put('/todos/:id', (req, res) => {
  const todoId = Number(req.params.id)

  todos = todos.map(todo =>
    todo.id === todoId
      ? { ...todo, completed: !todo.completed }
      : todo
  )

  res.json({ message: 'Updated' })
})

app.put('/todos/:id/edit', (req, res) => {
  const todoId = Number(req.params.id)

  todos = todos.map(todo =>
    todo.id === todoId
      ? {
          ...todo,
          name: req.body.name,
          description: req.body.description,
          priority: req.body.priority,
          color: req.body.color,
          date: req.body.date
        }
      : todo
  )

  res.json({ message: 'Todo updated' })
})


app.delete('/todos/:id', (req, res) => {
  const todoId = Number(req.params.id)
  todos = todos.filter(t => t.id !== todoId)
  res.json({ message: 'Deleted' })
})

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000')
})