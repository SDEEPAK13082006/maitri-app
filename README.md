# 🚀 MAITRI - AI Assistant for Astronaut Well-Being

**MAITRI** is a production-level web application designed to support the psychological and physical well-being of astronauts. It combines AI-powered sentiment analysis, emotion detection, and personalized health recommendations.

## 🎯 Features

### Core Functionality
- **Authentication System**: JWT-based login/signup with secure password hashing
- **AI Chat Assistant**: ChatGPT-like interface with emotion detection and supportive responses
- **Mental Health Module**: Mood tracking, stress scoring, guided meditation, journaling
- **Physical Health Module**: Sleep, hydration, and exercise tracking
- **Smart Recommendations**: AI-powered suggestions based on mood and activity
- **Alert System**: Detects high stress and provides early interventions
- **Voice Support**: Voice input and text-to-speech responses
- **Notifications**: Real-time alerts and health suggestions

### UI/UX
- Space-themed dark design with deep blue, purple, and neon accents
- Glassmorphism cards with smooth Framer Motion animations
- Fully responsive design
- Modern, intuitive interface

## 📁 Project Structure

```
MAITRI/
├── client/              # React.js (Vite) Frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── context/     # Context API state management
│   │   ├── services/    # API service calls
│   │   └── styles/      # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── server/              # Node.js + Express Backend
│   ├── src/
│   │   ├── controllers/ # Business logic
│   │   ├── models/      # MongoDB schemas
│   │   ├── routes/      # API endpoints
│   │   ├── middleware/  # Authentication, error handling
│   │   ├── utils/       # Helper functions
│   │   └── app.js       # Express app setup
│   ├── .env
│   └── package.json
│
├── ai-service/          # Python Flask AI Service
│   ├── app.py           # Flask application
│   ├── models.py        # ML models for emotion detection
│   ├── requirements.txt  # Python dependencies
│   └── .env
│
└── README.md            # This file
```

## 🛠️ Tech Stack

### Frontend
- React.js 18
- Vite (build tool)
- Tailwind CSS (styling)
- Framer Motion (animations)
- Recharts (data visualization)
- Axios (HTTP client)

### Backend
- Node.js with Express.js
- MongoDB (database)
- JWT (authentication)
- bcryptjs (password hashing)

### AI/ML
- Python Flask
- Hugging Face Transformers
- TextBlob (NLP)
- NumPy, Pandas

## 📋 Prerequisites

- Node.js v16+
- Python v3.8+
- MongoDB (local or Atlas)
- npm or yarn
- Git

## ⚡ Quick Start

### 1. Clone and Setup

```bash
cd MAITRI
npm install --legacy-peer-deps  # Root level if needed
```

### 2. Setup Backend (Server)

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

**Server runs on**: `http://localhost:5000`

### 3. Setup AI Service (Python)

```bash
cd ai-service
python -m venv venv
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
python app.py
```

**AI Service runs on**: `http://localhost:5001`

### 4. Setup Frontend (Client)

```bash
cd client
npm install
npm run dev
```

**Frontend runs on**: `http://localhost:5173`

## 🔐 Environment Variables

### Server (.env)
```
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/maitri
JWT_SECRET=your_jwt_secret_key_here
AI_SERVICE_URL=http://localhost:5001
NODE_ENV=development
PORT=5000
```

### AI Service (.env)
```
FLASK_ENV=development
FLASK_APP=app.py
PORT=5001
```

### Client (.env.local)
```
VITE_API_URL=http://localhost:5000
VITE_AI_SERVICE_URL=http://localhost:5001
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Dashboard
- `GET /api/dashboard` - Get dashboard data
- `GET /api/health-summary` - Get health summary

### Mood & Health
- `POST /api/mood/log` - Log mood entry
- `GET /api/mood/history` - Get mood history
- `POST /api/health/track` - Track health metrics
- `GET /api/health/summary` - Get health summary

### Chat & AI
- `POST /api/chat/send` - Send chat message
- `GET /api/chat/history` - Get chat history

### AI Service Endpoints
- `POST /ai/analyze-emotion` - Analyze emotion from text
- `POST /ai/generate-response` - Generate AI response
- `POST /ai/recommendations` - Get health recommendations

## 🚀 Running All Services

### Option 1: Terminal Tabs (Recommended)
Open 3 terminal windows and run each command:

```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - AI Service
cd ai-service && python app.py

# Terminal 3 - Frontend
cd client && npm run dev
```

### Option 2: Using Concurrently (Optional)
```bash
npm install -g concurrently
concurrently "cd server && npm run dev" "cd ai-service && python app.py" "cd client && npm run dev"
```

## 🧪 Testing

```bash
# Backend tests
cd server && npm test

# Frontend tests
cd client && npm test
```

## 📦 Building for Production

### Frontend
```bash
cd client
npm run build
# Output: dist/
```

### Backend
```bash
cd server
npm run build
```

### AI Service
```bash
cd ai-service
# Deploy using Gunicorn or similar
```

## 🎓 Key Files Overview

### Frontend Entry Points
- `client/src/main.jsx` - React app entry
- `client/src/App.jsx` - Main app component
- `client/index.html` - HTML entry

### Backend Entry Points
- `server/src/app.js` - Express app setup
- `server/src/index.js` - Server startup

### AI Service
- `ai-service/app.py` - Flask server

## 🔗 Integration Flow

```
Frontend (React) 
   ↓↑
Backend (Node/Express)
   ↓↑
AI Service (Python Flask)
   ↓↑
MongoDB (Database)
```

1. User interacts with React frontend
2. Frontend sends request to Node backend
3. Backend processes request and may call Python AI service
4. AI service performs NLP/emotion analysis
5. Response returned through backend to frontend
6. Frontend displays results to user

## 🌟 Features Walkthrough

### 1. Authentication
- Sign up as new astronaut
- Login with email/password
- JWT token stored in localStorage
- Automatic logout on token expiration

### 2. Dashboard
- Welcome message with user's name
- Daily health summary cards
- Current mood with emoji and score
- Stress level chart (mock data)
- Activity summary (sleep, hydration, exercise)

### 3. AI Chat Assistant
- Chat interface similar to ChatGPT
- Send messages about feelings/stress
- AI analyzes emotion and generates response
- Suggestions provided based on analysis
- Chat history maintained

### 4. Mental Health Tracking
- Log daily mood (1-10 scale)
- Track stress levels
- Access guided meditation/breathing
- Write journal entries

### 5. Physical Health Tracking
- Log sleep hours
- Track water intake
- Log exercises
- See daily recommendations

### 6. Alerts
- Red alert for high stress
- Yellow alert for poor sleep
- Green status for healthy metrics

## 🐛 Troubleshooting

### Frontend won't connect to backend
- Ensure backend is running on port 5000
- Check VITE_API_URL in .env.local
- Check browser console for errors

### Backend can't connect to MongoDB
- Verify MongoDB connection string in .env
- Ensure MongoDB is running (local or Atlas)
- Check firewall settings

### AI service errors
- Verify Python venv is activated
- Ensure all requirements installed: `pip install -r requirements.txt`
- Check AI service runs on port 5001

### Port conflicts
- Backend: `lsof -i :5000` (macOS/Linux) or `netstat -ano | findstr :5000` (Windows)
- Change PORT in .env if needed

## 📖 Code Structure

### Frontend Components
- **Navbar** - Navigation header
- **Sidebar** - Navigation menu
- **Card** - Reusable card component
- **Chart** - Data visualization
- **Button** - Reusable button
- **Modal** - Dialog component

### Backend Structure
- Each feature has controller, route, and model
- Middleware for auth and error handling
- Utils for common functions
- RESTful API design

### AI Service
- Text preprocessing
- Emotion detection using ML
- Response generation
- Recommendation engine

## 🔄 Workflow Examples

### Example: Sending a Chat Message
1. User types in chat input on frontend
2. Clicks send button
3. Frontend calls `POST /api/chat/send`
4. Backend receives message
5. Backend calls Python AI service `/ai/analyze-emotion`
6. AI service returns emotion analysis
7. Backend generates response
8. Frontend receives response and displays it
9. Chat history updated

### Example: Logging Mood
1. User navigates to health tracker
2. Clicks "Log Mood" button
3. Selects mood level (1-10)
4. Adds optional note
5. Frontend calls `POST /api/mood/log`
6. Backend saves to MongoDB
7. Dashboard updates with new mood
8. Recommendations engine generates suggestions

## 🎨 Customization

### Theme Colors
Edit `client/tailwind.config.js`:
```javascript
colors: {
  primary: '#1a1a2e',    // Deep blue
  secondary: '#16213e',  // Darker blue
  accent: '#0f3460',     // Accent blue
  neon: '#e94560',       // Neon pink
}
```

### Fonts
Edit `client/src/styles/globals.css` for custom fonts

### API Base URL
Change `VITE_API_URL` in `.env.local`

## 🚀 Deployment

### Frontend (Vercel)
```bash
vercel deploy
```

### Backend (Heroku/Railway)
```bash
heroku create maitri-backend
git push heroku main
```

### AI Service (Hugging Face Spaces / Railway)
Deploy Python Flask app similarly

## 📞 Support

For issues or questions:
1. Check troubleshooting section
2. Review error logs in console
3. Check `.env` configuration
4. Verify all services are running

## 📄 License

MIT License - Free to use and modify

## 👥 Contributors

MAITRI Development Team

---

**Built with ❤️ for astronaut well-being in space** 🌌
