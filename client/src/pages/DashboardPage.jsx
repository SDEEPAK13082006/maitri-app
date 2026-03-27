import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { dashboardService } from '../services/endpoints'
import { Card } from '../components/Card'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { Alert } from '../components/Alert'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function DashboardPage() {
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      const response = await dashboardService.getDashboard()
      setDashboard(response.data.data)
    } catch (err) {
      setError('Failed to load dashboard')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) return <Alert type="error" message={error} />
  if (!dashboard) return <Alert type="warning" message="No data available" />

  const { user, todaysSummary, statistics, alerts, moodHistory } = dashboard

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
        <p className="text-gray-400 mb-8">{user.missionName ? `Mission: ${user.missionName}` : 'Ready to support your journey'}</p>
      </motion.div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-3 mb-8">
          {alerts.map((alert, i) => (
            <Alert key={i} type={alert.severity === 'high' ? 'warning' : 'info'} message={alert.message} />
          ))}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card>
          <div className="text-4xl mb-2">{todaysSummary.mood ? `${todaysSummary.mood}/10` : 'N/A'}</div>
          <div className="text-gray-400">Today's Mood</div>
        </Card>
        <Card>
          <div className="text-4xl mb-2">{todaysSummary.stress ? `${todaysSummary.stress}/10` : 'N/A'}</div>
          <div className="text-gray-400">Stress Level</div>
        </Card>
        <Card>
          <div className="text-4xl mb-2">{todaysSummary.sleep ? `${todaysSummary.sleep}h` : 'N/A'}</div>
          <div className="text-gray-400">Sleep</div>
        </Card>
        <Card>
          <div className="text-4xl mb-2">{todaysSummary.hydration ? `${todaysSummary.hydration}ml` : 'N/A'}</div>
          <div className="text-gray-400">Hydration</div>
        </Card>
      </div>

      {/* Chart */}
      {moodHistory.length > 0 && (
        <Card className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Mood Trend (7 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={moodHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis domain={[0, 10]} stroke="#888" />
              <Tooltip />
              <Line type="monotone" dataKey="mood" stroke="#e94560" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <div className="text-sm text-gray-400">Average Mood</div>
          <div className="text-3xl font-bold">{statistics.averageMood}</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-400">Average Stress</div>
          <div className="text-3xl font-bold">{statistics.averageStress}</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-400">Mood Trend</div>
          <div className="text-3xl font-bold capitalize">{statistics.moodTrend}</div>
        </Card>
      </div>
    </div>
  )
}
