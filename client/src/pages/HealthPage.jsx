import React, { useState } from 'react'
import { moodService, healthService } from '../services/endpoints'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { MoodSelector } from '../components/MoodSelector'
import { Alert } from '../components/Alert'

export function HealthPage() {
  const [activeTab, setActiveTab] = useState('mood')
  const [moodScore, setMoodScore] = useState(5)
  const [moodNotes, setMoodNotes] = useState('')
  const [sleepHours, setSleepHours] = useState(7)
  const [waterIntake, setWaterIntake] = useState(2000)
  const [exerciseMinutes, setExerciseMinutes] = useState(30)
  const [stress, setStress] = useState(5)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')

  const handleLogMood = async () => {
    setLoading(true)
    try {
      await moodService.logMood({
        moodScore,
        notes: moodNotes,
        stressLevel: stress,
      })
      setMessageType('success')
      setMessage('Mood logged successfully! ✓')
      setMoodNotes('')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessageType('error')
      setMessage('Failed to log mood')
    }
    setLoading(false)
  }

  const handleLogHealth = async () => {
    setLoading(true)
    try {
      await healthService.logHealthData({
        sleep: { hours: sleepHours },
        hydration: { waterIntake },
        exercise: exerciseMinutes > 0 ? [{ name: 'Exercise', duration: exerciseMinutes, intensity: 'moderate' }] : [],
        mentalWellbeing: { stressLevel: stress },
      })
      setMessageType('success')
      setMessage('Health data logged successfully! ✓')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessageType('error')
      setMessage('Failed to log health data')
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Health Tracker 📈</h1>

      {message && <Alert type={messageType} message={message} />}

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-white border-opacity-10">
        {['mood', 'physical'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 transition ${
              activeTab === tab ? 'border-b-2 border-neon text-white' : 'text-gray-400'
            }`}
          >
            {tab === 'mood' ? '😊 Mental Health' : '💪 Physical Health'}
          </button>
        ))}
      </div>

      {/* Mood Tab */}
      {activeTab === 'mood' && (
        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold mb-4">Log Your Mood</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">How are you feeling?</label>
              <MoodSelector value={moodScore} onChange={setMoodScore} />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">Stress Level: {stress}/10</label>
              <input
                type="range"
                min="0"
                max="10"
                value={stress}
                onChange={(e) => setStress(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">Notes</label>
              <textarea
                value={moodNotes}
                onChange={(e) => setMoodNotes(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full px-4 py-3 bg-secondary rounded-lg border border-accent border-opacity-30 focus:border-opacity-100 focus:outline-none transition text-white"
                rows="4"
              />
            </div>

            <Button variant="neon" onClick={handleLogMood} disabled={loading} className="w-full">
              {loading ? 'Logging...' : 'Log Mood'}
            </Button>
          </Card>
        </div>
      )}

      {/* Physical Health Tab */}
      {activeTab === 'physical' && (
        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold mb-6">Log Physical Health</h2>

            <div className="space-y-6">
              {/* Sleep */}
              <div>
                <label className="block text-sm font-medium mb-3">Sleep Hours: {sleepHours}h</label>
                <input
                  type="range"
                  min="0"
                  max="12"
                  value={sleepHours}
                  onChange={(e) => setSleepHours(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Hydration */}
              <div>
                <label className="block text-sm font-medium mb-3">Water Intake: {waterIntake}ml</label>
                <input
                  type="range"
                  min="0"
                  max="4000"
                  step="100"
                  value={waterIntake}
                  onChange={(e) => setWaterIntake(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="mt-2 text-sm text-gray-400">
                  Goal: 3000ml/day
                </div>
              </div>

              {/* Exercise */}
              <div>
                <label className="block text-sm font-medium mb-3">Exercise Minutes: {exerciseMinutes}min</label>
                <input
                  type="range"
                  min="0"
                  max="180"
                  step="5"
                  value={exerciseMinutes}
                  onChange={(e) => setExerciseMinutes(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Quick Buttons */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                {[30, 60, 90, 120].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => setExerciseMinutes(mins)}
                    className="px-3 py-2 bg-secondary rounded hover:bg-opacity-80 transition text-sm"
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>

            <Button variant="neon" onClick={handleLogHealth} disabled={loading} className="w-full mt-6">
              {loading ? 'Logging...' : 'Log Physical Health'}
            </Button>
          </Card>
        </div>
      )}
    </div>
  )
}
