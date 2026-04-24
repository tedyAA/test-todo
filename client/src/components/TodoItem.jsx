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
                display: 'flex',
                gap: '12px',
                borderLeft: `6px solid ${todo.color}`,
                marginBottom: '10px',
                padding: '10px',
                background: todo.completed ? '#d1fae5' : '#f9f9f9',
                borderRadius: '10px',
                listStyle: 'none',
                alignItems: 'flex-start'
            }}
        >
            <div style={{ flex: 1 }}>
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

                        <button onClick={handleSave} style={{ marginTop: '5px' }}>
                            Save
                        </button>
                    </>
                ) : (
                    <>
                        <strong
                            style={{
                                textDecoration: todo.completed ? 'line-through' : 'none'
                            }}
                        >
                            {todo.name}
                        </strong>{' '}
                        ({todo.priority}) <br />
                        {todo.description} <br />
                        📅 {todo.date}
                    </>
                )}
            </div>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                }}
            >
                <button
                    onClick={() => onToggle(todo.id)}
                    style={{
                        background: todo.completed ? '#facc15' : '#22c55e',
                        color: 'white',
                        border: 'none',
                        padding: '6px 8px',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}
                >
                    {todo.completed ? '↩' : '✔'}
                </button>

                <button
                    onClick={() => setIsEditing(!isEditing)}
                    style={{
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        padding: '6px 8px',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}
                >
                    ✏️
                </button>

                <button
                    onClick={() => onDelete(todo.id)}
                    style={{
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        padding: '6px 8px',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}
                >
                    🗑
                </button>
            </div>
        </li>
    )
}

export default TodoItem
