import React from 'react'

export function LoadingSpinner({ size = 'md', text = 'Loading...' }) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`${sizes[size]} spinner`} />
      <p className="text-gray-400">{text}</p>
    </div>
  )
}
