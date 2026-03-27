import React from 'react'

export function Alert({ type = 'info', title, message, onClose }) {
  const colors = {
    success: 'bg-green-900 border-green-700 text-green-100',
    error: 'bg-red-900 border-red-700 text-red-100',
    warning: 'bg-yellow-900 border-yellow-700 text-yellow-100',
    info: 'bg-blue-900 border-blue-700 text-blue-100',
  }

  return (
    <div className={`border rounded-lg p-4 ${colors[type]} animate-slide-up`}>
      <div className="flex justify-between items-start">
        <div>
          {title && <h3 className="font-semibold">{title}</h3>}
          {message && <p className="text-sm mt-1">{message}</p>}
        </div>
        {onClose && (
          <button onClick={onClose} className="text-xl opacity-70 hover:opacity-100">
            ×
          </button>
        )}
      </div>
    </div>
  )
}
