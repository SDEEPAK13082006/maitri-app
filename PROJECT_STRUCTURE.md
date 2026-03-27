# 📊 MAITRI Project - Complete Folder Structure & File Overview

## Root Directory (`MAITRI/`)

```
MAITRI/
│
├── README.md                 # Main project documentation (41 KB) ⭐
├── SETUP.md                  # Installation & setup guide (25 KB) ⭐
│
├── client/                   # React Frontend (Vite + Tailwind)
│   ├── index.html            # HTML entry point
│   ├── vite.config.js        # Vite configuration
│   ├── tailwind.config.js    # Tailwind CSS theme
│   ├── postcss.config.js     # PostCSS configuration
│   ├── package.json          # Node dependencies
│
│   ├── .env.local            # Environment variables (local)
│   ├── .env.example          # Example env file
│   ├── .gitignore            # Git ignore rules
│
│   ├── public/               # Static assets
│   │   └── (favicon, images, etc.)
│
│   └── src/
│       ├── main.jsx          # React app entry point
│       ├── App.jsx           # Main app component with routing ⭐
│       ├── README.md         # Client-specific documentation
│       │
│       ├── components/       # Reusable UI Components
│       │   ├── Button.jsx    # Button component (variants)
│       │   ├── Card.jsx      # Glassmorphism card
│       │   ├── Navbar.jsx    # Navigation bar
│       │   ├── Alert.jsx     # Alert/notification component
│       │   ├── LoadingSpinner.jsx  # Loading indicator
│       │   └── MoodSelector.jsx    # 10-emoji mood picker
│       │
│       ├── pages/            # Full Page Components
│       │   ├── LandingPage.jsx     # Home page (/)
│       │   ├── LoginPage.jsx       # Login form (/login)
│       │   ├── SignupPage.jsx      # Registration (/signup)
│       │   ├── DashboardPage.jsx   # Main dashboard (/dashboard) ⭐
│       │   ├── ChatPage.jsx        # AI chat interface (/chat) ⭐
│       │   └── HealthPage.jsx      # Health tracker (/health) ⭐
│       │
│       ├── services/         # API Service Layer
│       │   ├── api.js        # Axios instance with interceptors
│       │   └── endpoints.js  # All API endpoint methods
│       │
│       ├── context/          # State Management (Context API)
│       │   ├── AuthContext.jsx     # Authentication state ⭐
│       │   └── ProtectedRoute.jsx  # Route protection component
│       │
│       └── styles/           # Styling
│           └── globals.css   # Global styles + Tailwind + animations
│
├── server/                   # Node.js + Express Backend
│   ├── package.json          # Node dependencies
│   ├── .env                  # Environment variables ⭐
│   ├── .env.example          # Example env file
│   ├── README.md             # Server-specific documentation
│   │
│   └── src/
│       ├── index.js          # Server entry point ⭐
│       ├── app.js            # Express app setup ⭐
│       │
│       ├── controllers/      # Business Logic
│       │   ├── authController.js        # Login/signup logic
│       │   ├── dashboardController.js   # Dashboard aggregation
│       │   ├── moodController.js        # Mood operations
│       │   ├── healthController.js      # Health operations
│       │   └── chatController.js        # Chat operations
│       │
│       ├── models/           # MongoDB Schemas
│       │   ├── User.js           # User schema with auth
│       │   ├── MoodLog.js        # Mood entries
│       │   ├── HealthData.js     # Physical health data
│       │   └── ChatHistory.js    # Chat conversations
│       │
│       ├── routes/           # API Route Definitions
│       │   ├── authRoutes.js     # /api/auth/*
│       │   ├── dashboardRoutes.js       # /api/dashboard/*
│       │   ├── moodRoutes.js     # /api/mood/*
│       │   ├── healthRoutes.js   # /api/health/*
│       │   └── chatRoutes.js     # /api/chat/*
│       │
│       ├── middleware/       # Middleware Functions
│       │   ├── auth.js       # JWT protection & token generation
│       │   └── errorHandler.js   # Global error handling
│       │
│       └── utils/            # Helper Functions
│           └── helpers.js    # Utility functions for common tasks
│
└── ai-service/               # Python Flask AI Service
    ├── app.py                # Flask server ⭐
    ├── models.py             # AI models & logic ⭐
    ├── requirements.txt      # Python dependencies
    ├── .env                  # Environment variables
    ├── README.md             # AI service documentation
    └── venv/                 # Python virtual environment (created later)
```

## File Descriptions & Purposes

### 🌐 Frontend (React/Vite)

| File | Lines | Purpose |
|------|-------|---------|
| `client/src/App.jsx` | 45 | Main app component, routing setup |
| `client/src/pages/DashboardPage.jsx` | 120 | Dashboard with charts and stats |
| `client/src/pages/ChatPage.jsx` | 115 | AI chat interface |
| `client/src/pages/HealthPage.jsx` | 170 | Health tracking form |
| `client/src/pages/LoginPage.jsx` | 95 | Login form |
| `client/src/pages/SignupPage.jsx` | 125 | Registration form |
| `client/src/components/Button.jsx` | 35 | Reusable button |
| `client/src/components/Card.jsx` | 25 | Glassmorphism card |
| `client/src/services/api.js` | 30 | Axios configuration |
| `client/src/context/AuthContext.jsx` | 100 | Auth state management |
| `client/tailwind.config.js` | 25 | Theme configuration |

### 🖥️ Backend (Node/Express)

| File | Lines | Purpose |
|------|-------|---------|
| `server/src/index.js` | 40 | Server startup |
| `server/src/app.js` | 90 | Express setup & middleware |
| `server/src/controllers/authController.js` | 130 | Auth logic |
| `server/src/controllers/dashboardController.js` | 130 | Dashboard aggregation |
| `server/src/models/User.js` | 100 | User schema |
| `server/src/models/MoodLog.js` | 85 | Mood schema |
| `server/src/models/HealthData.js` | 140 | Health schema |
| `server/src/models/ChatHistory.js` | 100 | Chat schema |
| `server/src/middleware/auth.js` | 50 | JWT middleware |
| `server/src/utils/helpers.js` | 80 | Helper functions |

### 🤖 AI Service (Python/Flask)

| File | Lines | Purpose |
|------|-------|---------|
| `ai-service/app.py` | 280 | Flask server & endpoints |
| `ai-service/models.py` | 350 | AI models class |
| `ai-service/requirements.txt` | 10 | Python dependencies |

## Technology Stack Summary

### Frontend
- **React 18** - UI library
- **Vite** - Modern build tool
- **Tailwind CSS** - Utility CSS framework
- **Framer Motion** - Animation library
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **React Router** - Navigation

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### AI Service
- **Flask** - Python web framework
- **TextBlob** - NLP
- **scikit-learn** - ML library
- **NumPy/Pandas** - Data processing

## Key Features Implementation

### 1. Authentication System
- **Files**: `authController.js`, `auth.js`, `AuthContext.jsx`
- **Flow**: Signup → Hash password → Generate JWT → Store token → Protect routes
- **Security**: bcryptjs hashing, JWT tokens, CORS

### 2. Dashboard
- **Files**: `DashboardPage.jsx`, `dashboardController.js`
- **Features**: Real-time stats, charts, alerts, health summary
- **Data**: Aggregates from mood and health collections

### 3. AI Chat
- **Files**: `ChatPage.jsx`, `chatController.js`, `app.py`
- **Features**: Message history, emotion analysis, suggestions
- **Workflow**: Frontend → Backend → Python AI → Response

### 4. Health Tracking
- **Files**: `HealthPage.jsx`, `healthController.js`
- **Tracks**: Mood, sleep, hydration, exercise, stress
- **Display**: Tabs for mental and physical health

### 5. AI Analysis
- **Files**: `models.py` (EmotionAnalyzer, ResponseGenerator)
- **Methods**: Keyword matching, sentiment analysis, recommendations
- **Confidence**: Score-based with multiple emotions

## API Structure

### Authentication `/api/auth`
```
POST   /signup         → Register
POST   /login          → Login
GET    /profile        → Get profile
PUT    /profile        → Update profile
```

### Health Data `/api/`
```
GET    /dashboard      → All dashboard data
POST   /mood/log       → Log mood
GET    /mood/history   → Mood history
POST   /health/log     → Log health
GET    /health/summary → Health summary
```

### Chat `/api/chat`
```
POST   /send              → Send message
GET    /history           → Chat history
POST   /conversation      → Create chat
GET    /conversation/:id  → Get chat
```

## Database Models

### User
- Personal info
- Astronaut profile
- Health profile
- Preferences

### MoodLog  
- Mood score (1-10)
- Emotions
- Stress level
- AI analysis

### HealthData
- Sleep, hydration, exercise
- Vitals (heart rate, BP, temp)
- Nutrition
- Recommendations

### ChatHistory
- Messages (user/assistant)
- Emotion analysis per message
- Conversation metadata

## Environment Variables

### Server `.env`
```
MONGO_URI=mongodb://localhost:27017/maitri
JWT_SECRET=your_secret_key
AI_SERVICE_URL=http://localhost:5001
PORT=5000
```

### AI Service `.env`
```
FLASK_ENV=development
FLASK_APP=app.py
PORT=5001
```

### Frontend `.env.local`
```
VITE_API_URL=http://localhost:5000
VITE_AI_SERVICE_URL=http://localhost:5001
```

## File Statistics

| Component | Files | Total Lines | Primary Tech |
|-----------|-------|------------|-------------|
| Frontend | 20+ | 1500+ | React/Vite |
| Backend | 15+ | 1000+ | Node/Express |
| AI Service | 2 | 630 | Python/Flask |
| Config | 10 | 200 | JSON/YAML |
| Docs | 4 | 1000+ | Markdown |

## Getting Started

1. **Setup Backend**
   - Navigate to `server/`
   - Run `npm install`
   - Update `.env`
   - Run `npm run dev`

2. **Setup AI Service**
   - Navigate to `ai-service/`
   - Create venv and activate
   - Run `pip install -r requirements.txt`
   - Run `python app.py`

3. **Setup Frontend**
   - Navigate to `client/`
   - Run `npm install`
   - Run `npm run dev`

4. **Access Application**
   - Open `http://localhost:5173`
   - Create account
   - Start using MAITRI

## Key Files to Understand First

1. **App.jsx** - Routing and main structure
2. **app.js** (server) - Express setup
3. **AuthContext.jsx** - State management
4. **DashboardPage.jsx** - Main UI
5. **models.py** - AI logic

---

**Total Project**: 50+ files, 2500+ lines of code, 3 microservices
