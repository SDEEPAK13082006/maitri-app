import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Alert } from '../components/Alert'

export function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    missionName: '',
    spaceAgency: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validate
    if (formData.password !== formData.passwordConfirm) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    const result = await signup(
      formData.name,
      formData.email,
      formData.password,
      formData.missionName,
      formData.spaceAgency
    )

    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  return (
    <div className="min-height screen gradient-primary flex items-center justify-center p-4 py-8">
      <Card className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gradient">Join MAITRI</h1>

        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-secondary rounded-lg border border-accent border-opacity-30 focus:border-opacity-100 focus:outline-none transition text-white text-sm"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-secondary rounded-lg border border-accent border-opacity-30 focus:border-opacity-100 focus:outline-none transition text-white text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mission Name (Optional)</label>
            <input
              type="text"
              name="missionName"
              value={formData.missionName}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-secondary rounded-lg border border-accent border-opacity-30 focus:border-opacity-100 focus:outline-none transition text-white text-sm"
              placeholder="e.g., Artemis"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Space Agency (Optional)</label>
            <input
              type="text"
              name="spaceAgency"
              value={formData.spaceAgency}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-secondary rounded-lg border border-accent border-opacity-30 focus:border-opacity-100 focus:outline-none transition text-white text-sm"
              placeholder="e.g., NASA"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-secondary rounded-lg border border-accent border-opacity-30 focus:border-opacity-100 focus:outline-none transition text-white text-sm"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-secondary rounded-lg border border-accent border-opacity-30 focus:border-opacity-100 focus:outline-none transition text-white text-sm"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            variant="neon"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-neon hover:underline">
            Login
          </Link>
        </p>
      </Card>
    </div>
  )
}
