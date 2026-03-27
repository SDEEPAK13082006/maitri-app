import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../components/Button'
import { Card } from '../components/Card'

export function LandingPage() {
  return (
    <div className="min-h-screen gradient-primary">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold text-white mb-4">
            🚀 MAITRI
          </h1>
          <h2 className="text-3xl text-gray-300 mb-6">
            AI Assistant for Astronaut Well-Being
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Advanced AI-powered platform supporting the psychological and physical health of space explorers
          </p>

          <div className="flex justify-center gap-4 mb-12">
            <Link to="/signup">
              <Button variant="neon" size="lg">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {[
            {
              icon: '🧠',
              title: 'AI Chat Assistant',
              desc: 'Talk about your feelings with our intelligent AI',
            },
            {
              icon: '📊',
              title: 'Health Tracking',
              desc: 'Monitor your mood, sleep, and physical activity',
            },
            {
              icon: '💡',
              title: 'Smart Recommendations',
              desc: 'Personalized suggestions for your well-being',
            },
          ].map((feature, i) => (
            <Card key={i} className="text-center">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
