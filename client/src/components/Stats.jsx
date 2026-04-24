import React from 'react'

function Stats({ todos }) {
    const completed = todos.filter(t => t.completed).length
    const pending = todos.filter(t => !t.completed).length
    const total = todos.length

    const boxStyle = {
        flex: 1,
        padding: '16px',
        borderRadius: '12px',
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
    }

    return (
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>

            {/* Completed */}
            <div style={{ ...boxStyle, background: '#22c55e' }}>
                <div style={{ fontSize: '24px' }}>{completed}</div>
                <div>Completed</div>
            </div>

            {/* Pending */}
            <div style={{ ...boxStyle, background: '#f59e0b' }}>
                <div style={{ fontSize: '24px' }}>{pending}</div>
                <div>Pending</div>
            </div>

            {/* Total */}
            <div style={{ ...boxStyle, background: '#3b82f6' }}>
                <div style={{ fontSize: '24px' }}>{total}</div>
                <div>Total</div>
            </div>

        </div>
    )
}

export default Stats
