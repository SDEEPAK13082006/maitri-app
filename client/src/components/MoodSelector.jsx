import React from 'react'

export function MoodSelector({ value, onChange }) {
  const moods = [
    { icon: '😢', label: 'Very Sad', value: 1 },
    { icon: '😞', label: 'Sad', value: 2 },
    { icon: '😐', label: 'Neutral', value: 3 },
    { icon: '🙂', label: 'Ok', value: 4 },
    { icon: '😊', label: 'Good', value: 5 },
    { icon: '😄', label: 'Happy', value: 6 },
    { icon: '😄', label: 'Very Happy', value: 7 },
    { icon: '🤩', label: 'Excellent', value: 8 },
    { icon: '🚀', label: 'Amazing', value: 9 },
    { icon: '⭐', label: 'Extraordinary', value: 10 },
  ]

  return (
    <div className="grid grid-cols-5 gap-2">
      {moods.map((mood) => (
        <button
          key={mood.value}
          onClick={() => onChange(mood.value)}
          className={`
            p-3 rounded-lg transition-all duration-300 glass
            ${value === mood.value 
              ? 'bg-neon bg-opacity-30 border-neon border-opacity-50' 
              : 'hover:bg-opacity-10'
            }
          `}
          title={mood.label}
        >
          <div className="text-2xl">{mood.icon}</div>
          <div className="text-xs mt-1 text-gray-300">{mood.value}</div>
        </button>
      ))}
    </div>
  )
}
