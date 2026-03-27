# 🖥️ MAITRI Server - Backend API

Node.js + Express.js backend for MAITRI - AI Assistant for Astronaut Well-Being

## Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Run development server
npm run dev
```

Server runs on `http://localhost:5000`

## 📁 Structure

```
server/src/
├── controllers/          # Business logic for each feature
│   ├── authController.js
│   ├── dashboardController.js
│   ├── moodController.js
│   ├── healthController.js
│   └── chatController.js
├── models/               # MongoDB schemas
│   ├── User.js
│   ├── MoodLog.js
│   ├── HealthData.js
│   └── ChatHistory.js
├── routes/               # API endorsement
│   ├── authRoutes.js
│   ├── dashboardRoutes.js
│   ├── moodRoutes.js
│   ├── healthRoutes.js
│   └── chatRoutes.js
├── middleware/           # Auth and error handling
│   ├── auth.js
│   └── errorHandler.js
├── utils/                # Helper functions
│   └── helpers.js
├── app.js                # Express configuration
└── index.js              # Server entry point
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Dashboard
- `GET /api/dashboard` - Get all dashboard data

### Mood
- `POST /api/mood/log` - Log mood entry
- `GET /api/mood/history` - Get mood history
- `GET /api/mood/today` - Get today's mood
- `PUT /api/mood/:moodId` - Update mood entry

### Health
- `POST /api/health/log` - Log health data
- `GET /api/health/data` - Get health data for date
- `GET /api/health/summary` - Get 7-day health summary

### Chat
- `POST /api/chat/send` - Send chat message
- `GET /api/chat/history` - Get chat history
- `POST /api/chat/conversation` - Create conversation
- `GET /api/chat/conversation/:conversationId` - Get specific conversation

## 🔐 Authentication

Uses JWT (JSON Web Tokens):
- Tokens stored in `Authorization: Bearer <token>` header
- Generated on login/signup
- Expires in 7 days
- Required for protected routes

## 📊 Models

### User
- Personal info (name, email, password)
- Astronaut profile (mission, agency, position)
- Health profile (age, blood type)
- Preferences and settings

### MoodLog
- Mood score (1-10)
- Emotions detected
- Stress level
- Notes and AI analysis

### HealthData
- Sleep hours and quality
- Water intake and hydration goal
- Exercise activities
- Vital signs
- Nutrition data
- Mental wellbeing metrics
- AI-generated recommendations

### ChatHistory
- Conversation ID and messages
- User and assistant messages
- Emotion analysis for each message
- Sentiment tracking

##  Scripts

```bash
npm run dev      # Development with nodemon
npm start        # Production
npm test         # Run tests
npm run build    # Build for production
```

## 🧪 Testing Endpoints

Use Postman or curl:

```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Log mood (with token)
curl -X POST http://localhost:5000/api/mood/log \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"moodScore":8,"stressLevel":3,"notes":"Feeling great today!"}'
```

## 🔗 Integration with AI Service

Backend calls Python Flask AI service for:
- `/ai/analyze-emotion` - Emotion detection from text
- `/ai/generate-response` - AI response generation
- `/ai/recommendations` - Health recommendations

Set `AI_SERVICE_URL` in `.env`

## ⚙️ Configuration

See `.env` file:
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for signing tokens
- `AI_SERVICE_URL` - Python service URL
- `PORT` - Server port
- `NODE_ENV` - Environment (development/production)

## 🐛 Troubleshooting

**MongoDB connection error**: Check `MONGO_URI` and MongoDB is running

**Port already in use**: Change `PORT` in `.env`

**Cannot find module**: Run `npm install`

**JWT errors**: Token expired or invalid, user needs to login again

## 📚 Technologies

- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM
- JWT - Authentication
- bcryptjs - Password hashing
- CORS - Cross-origin requests

---

For complete setup instructions, see [SETUP.md](../SETUP.md)
