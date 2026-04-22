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
    text: req.body.text
  }
  todos.push(newTodo)
  res.json(newTodo)
})

app.delete('/todos/:id', (req, res) => {
  const todoId = Number(req.params.id)
  todos = todos.filter(t => t.id !== todoId)
  res.json({ message: 'Deleted' })
})

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000')
})