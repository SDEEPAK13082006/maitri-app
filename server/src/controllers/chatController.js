// Chat Controller
// Handles AI chat conversations

const ChatHistory = require('../models/ChatHistory');
const { successResponse, callAIService, generateId } = require('../utils/helpers');

/**
 * Send chat message and get AI response
 */
exports.sendMessage = async (req, res, next) => {
  try {
    const { conversationId, message, topic = 'general' } = req.body;
    const userId = req.user.userId;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Message cannot be empty',
      });
    }

    // Use provided conversation ID or create new
    const convId = conversationId || generateId();

    // Find or create conversation
    let chatHistory = await ChatHistory.findOne({
      userId,
      conversationId: convId,
    });

    if (!chatHistory) {
      chatHistory = new ChatHistory({
        userId,
        conversationId: convId,
        topic,
        messages: [],
      });
    }

    // Add user message
    const userMsg = {
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    // Get emotion analysis from AI service
    let userMessageAnalysis = null;
    try {
      userMessageAnalysis = await callAIService('/analyze-emotion', {
        text: message,
      });
      userMsg.emotionAnalysis = userMessageAnalysis;
    } catch (error) {
      console.log('Emotion analysis not available');
    }

    chatHistory.messages.push(userMsg);

    // Get AI response
    let aiResponse = null;
    try {
      aiResponse = await callAIService('/generate-response', {
        message,
        emotionAnalysis: userMessageAnalysis,
        conversationHistory: chatHistory.messages.slice(0, -1), // Exclude current message
      });
    } catch (error) {
      aiResponse = {
        response: 'I\'m here to support you. How can I help?',
        suggestions: ['Take a break', 'Try a breathing exercise', 'Hydrate and relax'],
      };
    }

    // Add assistant message
    const assistantMsg = {
      role: 'assistant',
      content: aiResponse.response,
      timestamp: new Date(),
      aiMetadata: {
        model: 'MAITRI-v1',
        suggestions: aiResponse.suggestions || [],
      },
    };

    chatHistory.messages.push(assistantMsg);

    // Update conversation stats
    chatHistory.messageCount = chatHistory.messages.length;
    if (userMessageAnalysis?.sentiment) {
      chatHistory.averageSentiment = userMessageAnalysis.sentiment;
    }

    await chatHistory.save();

    res.json(
      successResponse(
        {
          conversationId: convId,
          userMessage: userMsg,
          assistantMessage: assistantMsg,
        },
        'Message processed successfully'
      )
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get chat history
 */
exports.getChatHistory = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { conversationId, limit = 50 } = req.query;

    let query = { userId };
    if (conversationId) {
      query.conversationId = conversationId;
    }

    const chatHistories = await ChatHistory.find(query)
      .sort('-createdAt')
      .limit(parseInt(limit));

    res.json(
      successResponse(chatHistories, 'Chat history retrieved')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get specific conversation
 */
exports.getConversation = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { conversationId } = req.params;

    const chatHistory = await ChatHistory.findOne({
      userId,
      conversationId,
    });

    if (!chatHistory) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found',
      });
    }

    res.json(
      successResponse(chatHistory, 'Conversation retrieved')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Create new conversation
 */
exports.createConversation = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { title, topic = 'general' } = req.body;
    const conversationId = generateId();

    const chatHistory = new ChatHistory({
      userId,
      conversationId,
      title: title || `Conversation on ${new Date().toLocaleDateString()}`,
      topic,
      messages: [],
    });

    await chatHistory.save();

    res.status(201).json(
      successResponse(chatHistory, 'Conversation created')
    );
  } catch (error) {
    next(error);
  }
};
