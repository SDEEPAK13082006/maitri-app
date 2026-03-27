# 🚀 MAITRI Setup & Installation Guide

## Prerequisites

Before you start, ensure you have:

- **Node.js** v16+ ([Download](https://nodejs.org/))
- **Python** v3.8+ ([Download](https://www.python.org/))
- **MongoDB** (Local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Git** ([Download](https://git-scm.com/))
- **npm** or **yarn** (comes with Node.js)

## 🔧 Installation Steps

### Step 1: Clone/Download Project

```bash
cd path/to/MAITRI
```

### Step 2: Setup Backend (Node.js/Express)

```bash
cd server

# Install dependencies
npm install

# Copy .env.example to .env
cp .env.example .env

# Edit .env file with your MongoDB connection string
nano .env  # or use your text editor
```

**Update `.env` with:**
```
MONGO_URI=mongodb://localhost:27017/maitri
# OR for MongoDB Atlas:
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/maitri

JWT_SECRET=your_secret_key_change_this_in_production
AI_SERVICE_URL=http://localhost:5001
PORT=5000
```

### Step 3: Setup AI Service (Python Flask)

```bash
cd ai-service

# Create Python virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Verify Flask is installed
flask --version
```

### Step 4: Setup Frontend (React)

```bash
cd client

# Install dependencies
npm install

# Verify Vite and Tailwind are installed
npm ls vite tailwindcss
```

## 🎯 Running Services

### Option A: Multiple Terminals (Recommended for Development)

Open 3 different terminal windows in the MAITRI folder:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
# Expected output: Server running on http://localhost:5000
```

**Terminal 2 - AI Service:**
```bash
cd ai-service
# Ensure venv is activated first (see Step 3)
python app.py
# Expected output: AI Service running on http://localhost:5001
```

**Terminal 3 - Frontend:**
```bash
cd client
npm run dev
# Expected output: Vite dev server running at http://localhost:5173
```

### Option B: Using npm-run-all (Alternative)

From root MAITRI directory:

```bash
# Install globally (one time)
npm install -g npm-run-all

# Run all services
npm install -g concurrently

# Create a script in root or use this command:
concurrently "cd server && npm run dev" "cd ai-service && python app.py" "cd client && npm run dev"
```

## ✅ Verify Services are Running

1. **Backend**: Visit `http://localhost:5000/api/health`
   - Should return: `{"success":true,"message":"MAITRI Server is running"}`

2. **AI Service**: Visit `http://localhost:5001/health`
   - Should return: `{"success":true,"message":"MAITRI AI Service is running",...}`

3. **Frontend**: Visit `http://localhost:5173`
   - Should see MAITRI landing page

## 🗄️ MongoDB Setup

### Local MongoDB

```bash
# Windows
# Download MongoDB Community Edition
# Start MongoDB service

# macOS (using Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Linux (Ubuntu)
curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

### MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new project and cluster
4. Create a database user with password
5. Add your IP to whitelist
6. Get connection string
7. Update MONGO_URI in `server/.env`

## 🧪 Testing Features

### 1. Create an Account

1. Go to `http://localhost:5173`
2. Click "Sign Up"
3. Fill in details and create account
4. You'll be redirected to dashboard

### 2. Test Dashboard

- View your daily summary
- Check mood trends
- Review health alerts

### 3. Test Chat Feature

1. Go to "Chat" tab
2. Type a message like: "I'm feeling stressed about work"
3. AI will analyze your emotion and respond
4. Check suggestions

### 4. Log Mood & Health

1. Go to "Health" tab
2. Select mood level
3. Add stress level, notes
4. Scroll down to log physical health
5. Track sleep, water, exercise

## 🐛 Troubleshooting

### Backend Issues

**Error: `MongoDB connection error`**
- Verify MongoDB is running
- Check MONGO_URI in .env
- Ensure firewall allows MongoDB port

**Error: `Port 5000 already in use`**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

**Error: `Cannot find module`**
```bash
cd server
npm install
```

### AI Service Issues

**Error: `ModuleNotFoundError`**
```bash
cd ai-service
# Ensure venv is activated
which python  # Should show venv path
pip install -r requirements.txt --upgrade
```

**Error: `Port 5001 already in use`**
```bash
# Windows
netstat -ano | findstr :5001
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5001
kill -9 <PID>
```

### Frontend Issues

**Error: `Vite dev server fails`**
```bash
cd client
npm install
npm run dev
```

**Error: `Can't connect to backend`**
- Verify backend is running on port 5000
- Check VITE_API_URL in `client/.env.local`
- Check browser console for errors

**Port conflicts**
- Change port in `client/vite.config.js`
- Update VITE_API_URL accordingly

## 📦 Building for Production

### Frontend Build
```bash
cd client
npm run build
# Creates optimized build in dist/
```

### Backend Production
```bash
cd server
npm install --production
npm start
```

### AI Service Production
```bash
cd ai-service
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5001 app:app
```

## 🌐 Environment Variables Reference

### Server (`server/.env`)
```
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<secure_random_string>
AI_SERVICE_URL=http://localhost:5001
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
```

### AI Service (`ai-service/.env`)
```
FLASK_ENV=development
FLASK_APP=app.py
PORT=5001
DEBUG=True
```

### Frontend (`client/.env.local`)
```
VITE_API_URL=http://localhost:5000
VITE_AI_SERVICE_URL=http://localhost:5001
```

## 📊 Project Structure

```
MAITRI/
├── server/                    # Node.js Backend
│   ├── src/
│   │   ├── controllers/      # Business logic
│   │   ├── models/           # MongoDB schemas
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Auth, error handling
│   │   ├── utils/            # Helper functions
│   │   ├── app.js            # Express setup
│   │   └── index.js          # Server entry
│   ├── .env                  # Environment variables
│   ├── package.json
│   └── README.md
│
├── ai-service/               # Python Flask Service
│   ├── app.py                # Flask server
│   ├── models.py             # ML/NLP models
│   ├── requirements.txt      # Python dependencies
│   ├── .env
│   └── README.md
│
├── client/                   # React Frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API calls
│   │   ├── context/          # State management
│   │   ├── styles/           # Global styles
│   │   └── App.jsx           # Main component
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── README.md
│
├── README.md                 # Main documentation
└── SETUP.md                  # This file
```

## 🚀 Common Commands

```bash
# Terminal 1 - Backend
cd server
npm run dev          # Development with auto-reload
npm start            # Production
npm test             # Run tests

# Terminal 2 - AI Service
cd ai-service
python app.py        # Development
gunicorn app:app     # Production

# Terminal 3 - Frontend
cd client
npm run dev          # Development
npm run build        # Production build
npm run preview      # Preview production build
```

## 💡 Tips & Best Practices

1. **Always activate Python venv**: Before running AI service
2. **Use different terminals**: Easier to monitor logs
3. **Check ports**: Ensure 5000, 5001, 5173 are available
4. **MongoDB indexing**: Already done in models
5. **JWT Secret**: Change in production environment
6. **CORS settings**: Configured in backend, update if needed

## 🔗 API Endpoints Quick Reference

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/api/auth/signup` | No | Register user |
| POST | `/api/auth/login` | No | Login user |
| GET | `/api/dashboard` | Yes | Get dashboard |
| POST | `/api/mood/log` | Yes | Log mood |
| GET | `/api/mood/history` | Yes | Get mood history |
| POST | `/api/health/log` | Yes | Log health |
| POST | `/api/chat/send` | Yes | Send chat |
| POST | `/ai/analyze-emotion` | No | Analyze emotion |

## 📞 Support & Debugging

For issues:
1. Check error messages in terminal
2. Review .env files
3. Verify MongoDB connection
4. Check browser console (F12)
5. Ensure all services running
6. Review logs in terminal

## 🎓 Next Steps

After setup:
1. Create test account
2. Explore dashboard
3. Try chat with AI
4. Log mood and health data
5. Review recommendations

Enjoy using MAITRI! 🚀

---

**Last Updated**: March 2026  
**Version**: 1.0.0
