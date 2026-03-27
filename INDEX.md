# 📚 MAITRI Documentation Index

## 🎯 Start Here

### New to MAITRI?
**Read this first:** [QUICK_START.md](./QUICK_START.md) - Get up and running in 5 minutes

### Want to Install?
**Follow this:** [SETUP.md](./SETUP.md) - Complete installation guide for all platforms

### Need Overview?
**Check this:** [README.md](./README.md) - Full project overview and features

---

## 📖 Complete Documentation Guide

### Main Documentation

| Document | Purpose | Read Time |
|----------|---------|-----------|
| [README.md](./README.md) | Project overview, features, tech stack | 15 min |
| [QUICK_START.md](./QUICK_START.md) | Quick reference and common tasks | 5 min |
| [SETUP.md](./SETUP.md) | Installation and troubleshooting | 20 min |
| [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) | Folder organization and file descriptions | 10 min |
| [BUILD_SUMMARY.md](./BUILD_SUMMARY.md) | What was built and how | 15 min |

### Service Documentation

| Service | Document | Purpose |
|---------|----------|---------|
| Frontend | [client/README.md](./client/README.md) | React components and setup |
| Backend | [server/README.md](./server/README.md) | API endpoints and controllers |
| AI | [ai-service/README.md](./ai-service/README.md) | Emotion detection and models |

---

## 🚀 Getting Started

### Path 1: I Want to Run It Now
1. Follow [QUICK_START.md](./QUICK_START.md) - 5 min setup
2. Visit `http://localhost:5173`
3. Create account and explore

### Path 2: I Need Complete Setup
1. Follow [SETUP.md](./SETUP.md) - Step-by-step guide
2. Configure environment variables
3. Install all dependencies
4. Start all services

### Path 3: I Want to Understand the Code
1. Read [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Understand organization
2. Review [client/README.md](./client/README.md) - Frontend details
3. Review [server/README.md](./server/README.md) - Backend details
4. Review [ai-service/README.md](./ai-service/README.md) - AI details

---

## 📋 Feature Documentation

### Authentication
- **Files**: `server/src/controllers/authController.js`, `client/src/context/AuthContext.jsx`
- **Docs**: [SETUP.md - Authentication](./SETUP.md#-authentication)
- **Endpoints**: POST `/api/auth/signup`, POST `/api/auth/login`

### Dashboard
- **Files**: `client/src/pages/DashboardPage.jsx`, `server/src/controllers/dashboardController.js`
- **Docs**: [README.md - Dashboard](./README.md#dashboard-main-ui)
- **Features**: Health summary, mood trends, alerts

### AI Chat
- **Files**: `client/src/pages/ChatPage.jsx`, `ai-service/app.py`
- **Docs**: [ai-service/README.md](./ai-service/README.md)
- **Endpoints**: POST `/api/chat/send`, GET `/api/chat/history`

### Health Tracking
- **Files**: `client/src/pages/HealthPage.jsx`, `server/src/controllers/healthController.js`
- **Docs**: [README.md - Physical Health Module](./README.md#5-physical-health-module)
- **Features**: Sleep, hydration, exercise tracking

### Mood Tracking
- **Files**: `client/src/components/MoodSelector.jsx`, `server/src/controllers/moodController.js`
- **Docs**: [README.md - Mental Health Module](./README.md#4-mental-health-module)
- **Features**: Daily logging, stress tracking, emotion detection

### AI Recommendations
- **Files**: `ai-service/models.py - RecommendationEngine`
- **Docs**: [ai-service/README.md - Recommendations](./ai-service/README.md)
- **Endpoints**: POST `/ai/recommendations`

---

## 🔧 Technical Documentation

### Frontend Architecture
- **Framework**: React 18 with Hooks
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Framer Motion
- **State**: Context API
- **HTTP**: Axios
- **Docs**: [client/README.md](./client/README.md)

### Backend Architecture
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Auth**: JWT + bcryptjs
- **Structure**: Controllers, Models, Routes, Middleware
- **Docs**: [server/README.md](./server/README.md)

### AI Service Architecture
- **Framework**: Flask
- **NLP**: TextBlob for sentiment analysis
- **ML**: scikit-learn for analysis
- **Models**: Emotion, Response, Recommendations
- **Docs**: [ai-service/README.md](./ai-service/README.md)

---

## 🗄️ Database Documentation

### Collections
- **Users**: User accounts with authentication
- **MoodLogs**: Mood entries with emotion analysis
- **HealthData**: Physical health metrics
- **ChatHistory**: Chat conversations and messages

See [PROJECT_STRUCTURE.md - Database Schema](./PROJECT_STRUCTURE.md#database-models)

---

## 🔌 API Reference

### Quick Endpoint Reference

**Authentication**
```
POST   /api/auth/signup
POST   /api/auth/login
GET    /api/auth/profile
PUT    /api/auth/profile
```

**Health & Mood**
```
GET    /api/dashboard
POST   /api/mood/log
GET    /api/mood/history
POST   /api/health/log
GET    /api/health/summary
```

**Chat**
```
POST   /api/chat/send
GET    /api/chat/history
POST   /api/chat/conversation
GET    /api/chat/conversation/:id
```

**AI Service**
```
POST   /ai/analyze-emotion
POST   /ai/generate-response
POST   /ai/recommendations
```

Full details: [SETUP.md - API Endpoints](./SETUP.md#-api-endpoints-quick-reference)

---

## 🐛 Troubleshooting

### Common Issues

| Issue | Solution | Docs |
|-------|----------|------|
| MongoDB error | Check connection string | [SETUP.md - MongoDB Setup](./SETUP.md#-mongodb-setup) |
| Port conflict | Change port in .env | [SETUP.md - Troubleshooting](./SETUP.md#-troubleshooting) |
| Module not found | Run npm/pip install | [SETUP.md - Installation](./SETUP.md#-installation-steps) |
| Can't connect | Verify all services running | [QUICK_START.md - Verify Services](./QUICK_START.md#verify-services-are-running) |

---

## 📁 File Browser

### Key Files to Know

**Frontend Entry**
- `client/src/App.jsx` - Main routing
- `client/src/main.jsx` - React entry
- `client/index.html` - HTML file

**Backend Entry**
- `server/src/index.js` - Server startup
- `server/src/app.js` - Express setup
- `.env` - Configuration

**AI Entry**
- `ai-service/app.py` - Flask server
- `ai-service/models.py` - AI logic

**Documentation**
- `README.md` - Main docs
- `SETUP.md` - Installation
- `QUICK_START.md` - Quick ref
- `PROJECT_STRUCTURE.md` - Organization

---

## ✅ Checklist for Getting Started

- [ ] Read [QUICK_START.md](./QUICK_START.md)
- [ ] Ensure prerequisites installed (Node, Python, MongoDB)
- [ ] Follow [SETUP.md](./SETUP.md) installation steps
- [ ] Start backend: `npm run dev` in `server/`
- [ ] Start AI service: `python app.py` in `ai-service/`
- [ ] Start frontend: `npm run dev` in `client/`
- [ ] Open `http://localhost:5173`
- [ ] Create test account
- [ ] Explore features

---

## 🎓 Learning Path

### Beginner
1. Read [README.md](./README.md) - Understand what MAITRI does
2. Follow [QUICK_START.md](./QUICK_START.md) - Get it running
3. Use the app - Try all features

### Intermediate
1. Read [SETUP.md](./SETUP.md) - Deep dive into setup
2. Review [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Understand organization
3. Read service docs - Understand each component

### Advanced
1. Review source code - Understand implementation
2. Read architecture docs - Understand design decisions
3. Extend features - Build on top

---

## 📞 Getting Help

### For Installation Issues
→ See [SETUP.md - Troubleshooting](./SETUP.md#-troubleshooting)

### For API Questions
→ See [server/README.md](./server/README.md)

### For Component Questions
→ See [client/README.md](./client/README.md)

### For AI Questions
→ See [ai-service/README.md](./ai-service/README.md)

### For General Questions
→ Check [README.md](./README.md) or [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

---

## 🚀 Quick Commands Reference

### Setup
```bash
# Frontend
cd client && npm install && npm run dev

# Backend
cd server && npm install && npm run dev

# AI Service
cd ai-service && python -m venv venv && source venv/bin/activate
pip install -r requirements.txt && python app.py
```

### Build
```bash
# Frontend
cd client && npm run build

# Backend
cd server && npm build
```

### Test
```bash
# Backend
cd server && npm test
```

---

## 📊 Project Statistics

- **Total Files**: 50+
- **Total Code**: 2500+ lines
- **Components**: 20+
- **API Endpoints**: 20+
- **Pages**: 6+
- **Database Models**: 4
- **Documentation Files**: 8

---

## 🎯 Documentation Map

```
START HERE
    ↓
QUICK_START.md (5 min)
    ↓
IF NEED SETUP:           IF NEED DETAILS:
SETUP.md (20 min)   →   PROJECT_STRUCTURE.md
    ↓                        ↓
Install & Run         Understand Code
    ↓                        ↓
Access App at      →    Read Service Docs
http://localhost:5173
    ↓
CREATE ACCOUNT & EXPLORE
```

---

## 📚 All Documentation Files

1. **README.md** - Main project overview
2. **QUICK_START.md** - Get started fast
3. **SETUP.md** - Detailed setup guide
4. **PROJECT_STRUCTURE.md** - File organization
5. **BUILD_SUMMARY.md** - What was built
6. **INDEX.md** - This file
7. **client/README.md** - Frontend guide
8. **server/README.md** - Backend guide
9. **ai-service/README.md** - AI service guide

---

## 🎉 Ready to Go!

Everything is set up and ready to run.

**Next Step**: Follow [QUICK_START.md](./QUICK_START.md) to get MAITRI running in 5 minutes!

---

**MAITRI v1.0.0** - AI Health Assistant for Astronauts 🚀
Last Updated: March 2026
