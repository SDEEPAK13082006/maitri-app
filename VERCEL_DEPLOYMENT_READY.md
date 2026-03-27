# 🚀 MAITRI - Vercel Deployment (COMPLETE GUIDE)

## Your Ready-to-Use Configuration

### ✅ MongoDB Connection String (Ready)
```
mongodb+srv://deepaksaids2024_db_user:rgoDbYYDRMs7wxJe@cluster0.ypeiufc.mongodb.net/maitri?retryWrites=true&w=majority
```

### ✅ Generated JWT Secret (Ready)
```
e4edbafd439c56bbe06e8b8a8b37d793800275cc32172a7e15e94b3676a3032d
```

### ✅ GitHub Repository (Ready)
```
https://github.com/SDEEPAK13082006/maitri-app
```

---

## 📋 DEPLOYMENT PLAN

You need to create **2 Vercel Projects**:
1. **Backend API** (`maitri-api`) - Node.js in `/server`
2. **Frontend App** (`maitri`) - React/Vite in `/client`

---

## 🔧 PROJECT 1: BACKEND DEPLOYMENT

### Step 1: Go to Vercel Dashboard
- URL: https://vercel.com/dashboard
- You should already be logged in

### Step 2: Create New Project
- Click **"Add New"** button
- Click **"Project"**
- Click **"Import Git Repository"**

### Step 3: Import Repository
- Click **"Continue with GitHub"** (if prompted)
- Find and click `maitri-app` in your repositories list
- Click **"Import"**

### Step 4: Configure Project
After clicking Import, you'll see configuration screen:

| Setting | Value |
|---------|-------|
| **Project Name** | `maitri-api` |
| **Root Directory** | Click "Edit" → Select `server` |
| **Framework** | Node.js (auto-detected) |
| **Environment Variables** | (See below) |

### Step 5: Add Environment Variables
Click **"Add Environment Variables"** and add each one:

```
MONGO_URI
mongodb+srv://deepaksaids2024_db_user:rgoDbYYDRMs7wxJe@cluster0.ypeiufc.mongodb.net/maitri?retryWrites=true&w=majority

JWT_SECRET
e4edbafd439c56bbe06e8b8a8b37d793800275cc32172a7e15e94b3676a3032d

NODE_ENV
production

CLIENT_URL
https://maitri.vercel.app

AI_SERVICE_URL
http://localhost:5001
```

### Step 6: Deploy Backend
- Click **"Deploy"** button
- Wait for deployment to complete (2-3 minutes)
- ✅ Note your backend URL (looks like: `https://maitri-api.vercel.app`)

---

## 🎨 PROJECT 2: FRONTEND DEPLOYMENT

### Step 1: Go to Vercel Dashboard
- URL: https://vercel.com/dashboard

### Step 2: Create New Project
- Click **"Add New"** button
- Click **"Project"**
- Click **"Import Git Repository"**

### Step 3: Import Repository
- Click **"Continue with GitHub"** (if prompted)
- Find and click `maitri-app` in your repositories list
- Click **"Import"**

### Step 4: Configure Project
| Setting | Value |
|---------|-------|
| **Project Name** | `maitri` |
| **Root Directory** | Click "Edit" → Select `client` |
| **Framework** | Vite (auto-detected) |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Environment Variables** | (See below) |

### Step 5: Add Environment Variable
Click **"Add Environment Variables"** and add:

```
VITE_API_URL
https://maitri-api.vercel.app
```

(Replace with your actual backend URL from Project 1)

### Step 6: Deploy Frontend
- Click **"Deploy"** button
- Wait for deployment to complete (2-3 minutes)
- ✅ Note your frontend URL (looks like: `https://maitri.vercel.app`)

---

## ✅ VERIFICATION CHECKLIST

After both are deployed:

- [ ] **Backend Test**: Visit `https://maitri-api.vercel.app/api/health`
  - Should see: `{"success":true,"message":"MAITRI Server is running"}`

- [ ] **Frontend Test**: Visit `https://maitri.vercel.app`
  - Should see the MAITRI app interface

- [ ] **Sign Up Test**: Create a test account
  - Should work if backends connect

- [ ] **Login Test**: Login with test credentials
  - Should show dashboard

---

## 📝 COPY-PASTE READY VALUES

Use these exact values when Vercel asks:

### Backend Environment Variables
```
MONGO_URI = mongodb+srv://deepaksaids2024_db_user:rgoDbYYDRMs7wxJe@cluster0.ypeiufc.mongodb.net/maitri?retryWrites=true&w=majority

JWT_SECRET = e4edbafd439c56bbe06e8b8a8b37d793800275cc32172a7e15e94b3676a3032d

NODE_ENV = production

CLIENT_URL = https://maitri.vercel.app

AI_SERVICE_URL = http://localhost:5001
```

### Frontend Environment Variables
```
VITE_API_URL = https://maitri-api.vercel.app
```

---

## 🎯 Order of Steps

1. ✅ Deploy Backend (maitri-api) FIRST
2. ✅ Get backend URL
3. ✅ Deploy Frontend (maitri) SECOND
4. ✅ Update Frontend's VITE_API_URL with backend URL
5. ✅ Test both projects

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Repository not found" | Make sure you're importing `maitri-app` (exact name) |
| "Build failed" | Check the Vercel logs - usually missing dependencies |
| "MongoDB connection error" | Verify MONGO_URI is correct - check password |
| "CORS error" | Ensure CLIENT_URL matches your frontend domain |
| "Cannot find root directory" | Make sure you selected the correct folder (`server` or `client`) |

---

## 📞 Need Help?

Check Vercel documentation: https://vercel.com/docs

---

**Status**: Ready to deploy! Follow the steps above and come back when done. ✨
