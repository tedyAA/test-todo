import { useState } from 'react'

function TodoItem({ todo, onDelete, onToggle, onEdit }) {
    const [isEditing, setIsEditing] = useState(false)

    const [editedName, setEditedName] = useState(todo.name)
    const [editedDescription, setEditedDescription] = useState(todo.description)
    const [editedPriority, setEditedPriority] = useState(todo.priority)
    const [editedColor, setEditedColor] = useState(todo.color)
    const [editedDate, setEditedDate] = useState(todo.date)

    const handleSave = () => {
        onEdit(todo.id, {
            name: editedName,
            description: editedDescription,
            priority: editedPriority,
            color: editedColor,
            date: editedDate
        })

        setIsEditing(false)
    }

    return (
        <li
            style={{
                borderLeft: `6px solid ${todo.color}`,
                marginBottom: '10px',
                padding: '10px',
                background: todo.completed ? '#d1fae5' : '#f9f9f9',
                borderRadius: '8px',
                listStyle: 'none'
            }}
        >
            {isEditing ? (
                <>
                    <input value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                    <input value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />

                    <select value={editedPriority} onChange={(e) => setEditedPriority(e.target.value)}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>

                    <input type="color" value={editedColor} onChange={(e) => setEditedColor(e.target.value)} />
                    <input type="date" value={editedDate} onChange={(e) => setEditedDate(e.target.value)} />

                    <button onClick={handleSave}>Save</button>
                </>
            ) : (
                <>
                    <strong style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        {todo.name}
                    </strong>{' '}
                    ({todo.priority}) <br />
                    {todo.description} <br />
                    📅 {todo.date}
                </>
            )}

            <br />

            <button onClick={() => onToggle(todo.id)}>
                {todo.completed ? 'Undo' : 'Done'}
            </button>

            <button onClick={() => setIsEditing(!isEditing)}>
                Edit
            </button>

            <button onClick={() => onDelete(todo.id)}>
                Delete
            </button>
        </li>
    )
}

export default TodoItem
