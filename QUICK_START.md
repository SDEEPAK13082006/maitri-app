# 🚀 MAITRI - Quick Reference Guide

## 📋 What is MAITRI?

MAITRI is a **production-level web application** for **AI-powered health support for astronauts**. It combines:
- 🧠 AI emotion detection and response
- 📊 Health tracking (mood, sleep, exercise)
- 💬 ChatGPT-like AI assistant
- 📈 Data visualization and analytics
- 🔐 Secure authentication
- 🎨 Modern space-themed UI

## ⚡ Quick Start (5 minutes)

### Prerequisites
- Node.js v16+
- Python 3.8+
- MongoDB

### Terminal 1: Backend
```bash
cd server
npm install
npm run dev
```

### Terminal 2: AI Service
```bash
cd ai-service
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
python app.py
```

### Terminal 3: Frontend
```bash
cd client
npm install
npm run dev
```

### Visit
Open `http://localhost:5173` in browser

## 🎯 Main Features

| Feature | Location | Tech |
|---------|----------|------|
| **Authentication** | `/login`, `/signup` | JWT + bcryptjs |
| **Dashboard** | `/dashboard` | React + Charts |
| **AI Chat** | `/chat` | Flask NLP |
| **Health Tracking** | `/health` | React Forms |
| **Mood Logging** | `/health` (Mental tab) | MongoDB |
| **Recommendations** | Dashboard | Python AI |

## 📁 Project Structure

```
MAITRI/
├── client/          → React Frontend (Port 5173)
├── server/          → Node.js Backend (Port 5000)
├── ai-service/      → Python Flask (Port 5001)
├── README.md        → Main documentation
├── SETUP.md         → Installation guide
└── PROJECT_STRUCTURE.md  → Folder overview
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login

### Dashboard & Health
- `GET /api/dashboard` - Dashboard data
- `POST /api/mood/log` - Log mood
- `POST /api/health/log` - Log health
- `GET /api/health/summary` - Health summary

### Chat
- `POST /api/chat/send` - Send message
- `GET /api/chat/history` - Get history

## 🧪 Test the App

1. **Sign Up**
   - Go to `/signup`
   - Fill in details
   - Create account

2. **View Dashboard**
   - See daily summary
   - Check alerts and recommendations

3. **Chat with AI**
   - Go to `/chat`
   - Type: "I'm feeling stressed"
   - See AI response and suggestions

4. **Log Health**
   - Go to `/health`
   - Log mood, sleep, exercise
   - Get recommendations

## 🛠️ Common Commands

```bash
# Backend
cd server && npm run dev     # Dev server
cd server && npm test        # Run tests
cd server && npm start       # Production

# AI Service
cd ai-service && python app.py        # Dev
cd ai-service && gunicorn app:app     # Production

# Frontend
cd client && npm run dev     # Dev server
cd client && npm run build   # Production build
```

## 📊 Database Collections

```
MongoDB Collections:
├── users            → User accounts
├── moodlogs         → Mood entries
├── healthdatas      → Health tracking
└── chathistories    → Chat conversations
```

## 🔐 Security Features

- ✅ JWT authentication
- ✅ Password hashing (bcryptjs)
- ✅ Protected routes
- ✅ CORS configured
- ✅ Error handling
- ✅ Input validation

## 🎨 UI/UX Features

- ✅ Space-themed dark design
- ✅ Glassmorphism cards
- ✅ Smooth animations (Framer Motion)
- ✅ Responsive design
- ✅ Data charts (Recharts)
- ✅ Loading spinners
- ✅ Alert system

## 🔗 Technology Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Node.js, Express.js, MongoDB |
| AI | Python, Flask, TextBlob |
| Auth | JWT, bcryptjs |
| Charts | Recharts |
| Styling | Tailwind CSS, Framer Motion |

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Can't connect to MongoDB" | Start MongoDB, check `MONGO_URI` |
| "Port already in use" | Check `.env` PORT, or kill process |
| "Module not found" | Run `npm install` or `pip install -r requirements.txt` |
| "Frontend won't load" | Check backend running on 5000 |
| "AI service errors" | Activate Python venv |

## 📚 Documentation Files

1. **README.md** - Main overview and features
2. **SETUP.md** - Complete setup instructions
3. **PROJECT_STRUCTURE.md** - File organization
4. **server/README.md** - Backend specifics
5. **client/README.md** - Frontend specifics
6. **ai-service/README.md** - AI service details

## 🎓 Learn More

- Frontend architecture: See `client/README.md`
- Backend API: See `server/README.md`
- AI models: See `ai-service/README.md`
- Full setup: See `SETUP.md`

## 🚀 Production Deployment

### Frontend (Vercel/Netlify)
```bash
cd client && npm run build
# Deploy dist/ folder
```

### Backend (Heroku/Railway)
```bash
cd server
npm install --production
npm start
```

### AI Service (Railway/Render)
```bash
cd ai-service
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5001 app:app
```

## 💡 Tips

1. Always activate Python venv before running AI service
2. Use different terminals for each service
3. Check ports are available (5000, 5001, 5173)
4. Keep `.env` files secure (don't commit to git)
5. Test each service individually first

## 🎯 Features Implemented

- ✅ User authentication (signup/login)
- ✅ Dashboard with real-time data
- ✅ AI chat assistant
- ✅ Mood tracking
- ✅ Health data logging
- ✅ Emotion detection
- ✅ Personalized recommendations
- ✅ Alert system
- ✅ Data visualization
- ✅ Responsive design

## 📞 Support

For help:
1. Check relevant README.md
2. Review SETUP.md troubleshooting
3. Check browser console (F12)
4. Check server logs in terminal

---

**MAITRI v1.0.0** - AI Health Assistant for Astronauts 🌌
