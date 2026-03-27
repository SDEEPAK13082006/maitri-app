import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { chatService } from '../services/endpoints'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { LoadingSpinner } from '../components/LoadingSpinner'

export function ChatPage() {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [conversationId, setConversationId] = useState(null)

  // Initialize conversation
  useEffect(() => {
    createNewConversation()
  }, [])

  const createNewConversation = async () => {
    try {
      const response = await chatService.createConversation({
        topic: 'general',
      })
      setConversationId(response.data.data.conversationId)
      setMessages([])
    } catch (error) {
      console.error('Failed to create conversation:', error)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message to chat
    const userMessage = {
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setLoading(true)

    try {
      const response = await chatService.sendMessage({
        conversationId,
        message: inputValue,
      })

      const { assistantMessage } = response.data.data
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('Failed to send message:', error)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8">Chat with MAITRI 💬</h1>

      <Card className="h-96 overflow-y-auto mb-4 p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <div className="text-5xl mb-4">🚀</div>
              <p>Start a conversation about your feelings or health</p>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`
                max-w-xs px-4 py-2 rounded-lg
                ${msg.role === 'user'
                  ? 'bg-neon bg-opacity-30 border border-neon'
                  : 'bg-secondary border border-accent border-opacity-30'
                }
              `}
            >
              <p className="text-sm">{msg.content}</p>
            </div>
          </motion.div>
        ))}

        {loading && <LoadingSpinner size="sm" text="AI is thinking..." />}
      </Card>

      {/* Suggestions */}
      {messages.length > 0 && messages[messages.length - 1].aiMetadata?.suggestions && (
        <Card className="mb-4 p-4">
          <p className="text-sm text-gray-300 mb-3">Suggestions:</p>
          <div className="space-y-2">
            {messages[messages.length - 1].aiMetadata.suggestions.map((suggestion, i) => (
              <button
                key={i}
                onClick={() => {
                  setInputValue(suggestion)
                }}
                className="block w-full text-left px-3 py-2 rounded bg-secondary hover:bg-opacity-80 transition text-sm"
              >
                📌 {suggestion}
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Tell me how you're feeling..."
          disabled={loading}
          className="flex-1 px-4 py-3 bg-secondary rounded-lg border border-accent border-opacity-30 focus:border-opacity-100 focus:outline-none transition text-white"
        />
        <Button variant="neon" type="submit" disabled={loading}>
          Send
        </Button>
      </form>

      <button
        onClick={createNewConversation}
        className="w-full mt-4 py-2 text-gray-400 hover:text-white transition text-sm"
      >
        ↻ New Conversation
      </button>
    </div>
  )
}
