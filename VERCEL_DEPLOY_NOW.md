# 🚀 MAITRI to Vercel - Complete Deployment Guide

## What Was Prepared

I've set up your MAITRI app for Vercel deployment with:

✅ **Frontend Configuration** (`client/.env.production`)
✅ **Backend Configuration** (`server/vercel.json` & `vercel.json`)
✅ **Git Configuration** (`.gitignore` to exclude sensitive files)
✅ **Deployment Documentation** (See VERCEL_DEPLOYMENT.md & DEPLOYMENT_CHECKLIST.md)

---

## 🎯 Quick Deployment Path (30 minutes)

### Phase 1: Repository & MongoDB Setup (10 mins)

1. **Push to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Setup: Prepare for Vercel deployment"
   git push origin main
   ```

2. **Set up MongoDB Atlas** (5 mins)
   - Go to: https://www.mongodb.com/cloud/atlas
   - Create free account
   - Create M0 cluster
   - Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/maitri`

### Phase 2: Deploy Backend (10 mins)

1. **Create Vercel Project (Backend)**
   - Go to: https://vercel.com/dashboard
   - Click: "Add New" → "Project"
   - Import: Your GitHub repository
   - Select: `./server` as Root Directory

2. **Add Environment Variables** (in Vercel):
   ```
   MONGO_URI = mongodb+srv://user:pass@cluster.mongodb.net/maitri
   JWT_SECRET = [generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"]
   NODE_ENV = production
   CLIENT_URL = https://maitri.vercel.app (update later)
   ```

3. **Deploy** → Get URL like: `https://maitri-api.vercel.app`

### Phase 3: Deploy Frontend (10 mins)

1. **Create Vercel Project (Frontend)**
   - Go to: https://vercel.com/dashboard
   - Click: "Add New" → "Project"
   - Import: Same GitHub repository
   - Select: `./client` as Root Directory
   - Framework: Vite

2. **Add Environment Variable**:
   ```
   VITE_API_URL = https://maitri-api.vercel.app
   ```

3. **Deploy** → Get URL like: `https://maitri.vercel.app`

### Phase 4: Final Updates (5 mins)

1. **Update Backend** environment:
   - Go to backend project → Settings → Environment Variables
   - Update `CLIENT_URL` to `https://maitri.vercel.app`
   - Redeploy from Deployments tab

---

## 📋 Detailed Step-by-Step Instructions

### STEP 1: Push Code to Git (If Needed)

**If you haven't pushed to GitHub yet:**

```powershell
# Navigate to MAITRI folder
cd C:\Users\HP\OneDrive\Documents\ccp\MAITRI

# Initialize git if needed
git init

# Add GitHub remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/maitri.git

# Stage all files
git add .

# Commit with meaningful message
git commit -m "Initial commit: Setup MAITRI app for Vercel deployment"

# Push to GitHub
git branch -M main
git push -u origin main
```

**If you already have it on GitHub:**
```powershell
git add .
git commit -m "Update: Prepare for Vercel deployment with configuration files"
git push
```

---

### STEP 2: Set Up MongoDB Atlas (5 minutes)

1. **Sign up**: Go to https://www.mongodb.com/cloud/atlas
2. **Create Project**: "New Project" → Name it "MAITRI"
3. **Create Cluster**:
   - Choose M0 Free tier
   - Select region closest to you
   - Wait for cluster to be created (~3 mins)

4. **Create Database User**:
   - Click "Database Access"
   - Click "Add New Database User"
   - Username: `maitri_user`
   - Password: Generate secure password
   - Click "Create User"

5. **Whitelist IP**:
   - Click "Network Access"
   - Click "Add IP Address"
   - Select "Allow access from anywhere" (0.0.0.0/0)
   - Click "Confirm"

6. **Get Connection String**:
   - Click your cluster
   - Click "Connect"
   - Click "Drivers"
   - Copy the connection string
   - Replace `<password>` with your password
   - Example: `mongodb+srv://maitri_user:yourpassword@cluster.mongodb.net/maitri?retryWrites=true&w=majority`

---

### STEP 3: Deploy Backend to Vercel

1. **Go to Vercel Dashboard**
   - URL: https://vercel.com/dashboard
   - Click "Add New" button → Select "Project"

2. **Import Repository**
   - Click "Import Git Repository"
   - Authorize with GitHub/GitLab/Bitbucket
   - Select `maitri` repository

3. **Configure Project**
   - **Project Name**: `maitri-api` (or your choice)
   - **Root Directory**: Click "Edit" → Select `./server`
   - **Framework Preset**: Node.js
   - **Build Command**: `npm install` (or leave default)
   - **Environment Variables**: Click "Add Environment Variables"

4. **Add Environment Variables** (one by one):
   - **MONGO_URI**:
     ```
     mongodb+srv://maitri_user:yourpassword@cluster.mongodb.net/maitri?retryWrites=true&w=majority
     ```
   
   - **JWT_SECRET** (generate a random string):
     ```
     # Run in PowerShell to generate:
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
     # Copy the output and paste it
     ```
   
   - **NODE_ENV**: `production`
   
   - **CLIENT_URL**: `https://maitri.vercel.app` (for now, use Vercel default or update later)
   
   - **AI_SERVICE_URL**: `http://localhost:5001` (for now, update after deploying AI service)

5. **Deploy**
   - Click "Deploy" button
   - Wait for deployment to complete (2-3 mins)
   - You'll see: "Deployment Successful! 🎉"
   - Copy the URL (e.g., `https://maitri-api.vercel.app`)

6. **Verify Backend**
   - Visit: `https://maitri-api.vercel.app/api/health`
   - Should see: `{"success":true,"message":"MAITRI Server is running"}`

---

### STEP 4: Deploy Frontend to Vercel

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard

2. **Create New Project**
   - Click "Add New" → "Project"
   - Select same repository (`maitri`)

3. **Configure Frontend Project**
   - **Project Name**: `maitri` (or your choice)
   - **Root Directory**: Click "Edit" → Select `./client`
   - **Framework**: Select "Vite"
   - **Build Command**: `npm run build`
   - **Install Command**: `npm install`
   - **Output Directory**: `dist`

4. **Add Environment Variable**
   - **VITE_API_URL**: Paste your backend URL from Step 3
     ```
     https://maitri-api.vercel.app
     ```

5. **Deploy**
   - Click "Deploy" button
   - Wait for deployment (2-3 mins)
   - You'll see your application URL (e.g., `https://maitri.vercel.app`)

6. **Test Frontend**
   - Visit: `https://maitri.vercel.app`
   - You should see the MAITRI app in the browser
   - Try navigating to signup page

---

### STEP 5: Update Backend Environment Variables

1. **Go to Backend Project Settings**
   - https://vercel.com/dashboard
   - Click on `maitri-api` project
   - Click "Settings"
   - Click "Environment Variables"

2. **Update CLIENT_URL**
   - Find `CLIENT_URL` variable
   - Update value to: `https://maitri.vercel.app`
   - Save changes

3. **Redeploy Backend**
   - Click "Deployments" tab
   - Click on latest deployment (at the top)
   - Click "Redeploy" button
   - Wait for redeployment (1-2 mins)

---

### STEP 6: Full System Testing

Visit your deployment and test:

✅ **Frontend accessible**: https://maitri.vercel.app
✅ **Sign up**: Create a test account
✅ **Login**: Login with test credentials
✅ **Dashboard**: View dashboard after login
✅ **Mood logging**: Log a mood entry
✅ **Health tracking**: Log exercise/sleep data
✅ **Logout**: Logout and verify session cleared

---

### STEP 7 (Optional): Deploy Python AI Service

If you want the chat feature with AI responses:

#### Option A: Deploy to Railway (Recommended)

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Select your MAITRI repository
5. Railway auto-detects the project structure
6. Configure:
   - **Root Directory**: `ai-service/`
   - Leave other settings as default
7. Click "Deploy"
8. Get the URL (like `https://maitri-ai-xxxx.railway.app`)

#### Option B: Deploy to Render

1. Go to https://render.com
2. Click "New" → "Web Service"
3. Connect GitHub and select repository
4. Configure:
   - **Name**: `maitri-ai`
   - **Start Command**: `cd ai-service && python app.py`
   - **Build Command**: `pip install -r ai-service/requirements.txt`
5. Click "Deploy"
6. Get the URL (like `https://maitri-ai.onrender.com`)

#### Update Backend with AI Service URL

1. Go to backend (maitri-api) → Settings → Environment Variables
2. Update `AI_SERVICE_URL` to your Railway/Render URL
3. Redeploy the backend

---

## ✅ Deployment Verification Checklist

- [ ] Frontend loads at https://maitri.vercel.app
- [ ] Backend API responds at https://maitri-api.vercel.app/api/health
- [ ] Sign up creates a new user
- [ ] Login works with correct credentials
- [ ] Dashboard displays user info
- [ ] Mood logging saves data
- [ ] Health tracking works
- [ ] Logout clears session
- [ ] No console errors in browser DevTools
- [ ] No errors in Vercel deployment logs

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| **502 Bad Gateway** | Backend crashed - check Vercel Logs for errors |
| **Cannot signup/login** | Check MongoDB connection string is correct |
| **CORS error** | Update `CLIENT_URL` in backend environment and redeploy |
| **"Cannot GET /"** | Frontend build failed - check build logs in Vercel |
| **Environmental variables not working** | Make sure they match exactly (case-sensitive) |
| **Python AI service not working** | Deploy to Railway/Render separately, then update AI_SERVICE_URL |

---

## 📞 Resources

- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas**: https://docs.mongodb.com/cloud/
- **Railway**: https://docs.railway.app/
- **Render**: https://render.com/docs

---

## 🎉 Success!

Once all steps are complete:
- Your app is live on Vercel
- Database is secure on MongoDB Atlas
- All services are connected
- You can share: `https://maitri.vercel.app`

---

**Need help?** Check the logs:
- Frontend issues: Vercel Dashboard → Deployments → Logs
- Backend issues: Vercel Dashboard (maitri-api) → Deployments → Logs
- Database issues: MongoDB Atlas → Logs
