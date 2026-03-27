# 🚀 MAITRI - Vercel Deployment Guide

## 📋 Overview

MAITRI is being deployed to Vercel with the following setup:
- **Frontend**: React/Vite → Vercel (Main project)
- **Backend**: Node.js/Express → Vercel (Separate `maitri-api` project)
- **AI Service**: Python/Flask → Railway or Render (Separate deployment)

---

## 🔧 Prerequisites

1. **Vercel Account**: https://vercel.com (free tier available)
2. **MongoDB Atlas Account**: https://www.mongodb.com/cloud/atlas (free tier)
3. **Git Repository**: Your MAITRI project on GitHub/GitLab/Bitbucket
4. **Optional - Railway/Render Account** (for Python AI service): https://railway.app or https://render.com

---

## 📝 Step 1: Prepare Environment Variables

### For Frontend (Client)
Create a `.env.production` file in the `client/` folder:
```
VITE_API_URL=https://maitri-api.vercel.app
```

### For Backend (Server)
Store these in Vercel Environment Variables:
- `MONGO_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: A secure random string (e.g., generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- `NODE_ENV`: production
- `AI_SERVICE_URL`: Your deployed Python service URL (e.g., https://maitri-ai.railway.app)
- `CLIENT_URL`: https://maitri.vercel.app (or your custom domain)

---

## 🌐 Step 2: Set Up MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new M0 cluster
4. Create a database user with username and password
5. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/maitri?retryWrites=true&w=majority`
6. Copy this string for later use

---

## 📤 Step 3: Deploy Backend to Vercel

### 3a. Create a New Vercel Project (Server)

1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your GitHub repository
4. Configure import settings:
   - **Framework**: Node.js
   - **Root Directory**: `./server`
   - **Build Command**: `npm install && npm run build` (or leave empty)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

### 3b. Add Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables, add:

```
MONGO_URI = mongodb+srv://username:password@cluster.mongodb.net/maitri
JWT_SECRET = your_super_secure_random_string_here
NODE_ENV = production
AI_SERVICE_URL = https://maitri-ai.railway.app (update after AI service is deployed)
CLIENT_URL = https://maitri.vercel.app (or your domain)
```

### 3c. Deploy
Click "Deploy" and wait for completion. Your backend will be at: `https://maitri-api.vercel.app`

---

## 🎨 Step 4: Deploy Frontend to Vercel

### 4a. Create a New Vercel Project (Frontend)

1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your GitHub repository
4. Configure import settings:
   - **Framework**: Vite
   - **Root Directory**: `./client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 4b. Add Environment Variables

In Vercel Dashboard → Environment Variables, add:

```
VITE_API_URL = https://maitri-api.vercel.app
```

### 4c. Deploy
Click "Deploy" and wait for completion. Your frontend will be at: `https://maitri.vercel.app` (or custom domain)

---

## 🐍 Step 5: Deploy Python AI Service (Optional but Recommended)

### Option A: Deploy to Railway

1. Go to https://railway.app
2. Create account and login
3. Click "New Project" → "Deploy from GitHub"
4. Select your repository
5. Railway will detect `requirements.txt` in `ai-service/`
6. Add environment variables if needed:
   - `FLASK_ENV=production`
   - `MONGO_URI=...` (if needed)

7. Deploy and get URL: `https://maitri-ai-xxxx.railway.app`

### Option B: Deploy to Render

1. Go to https://render.com
2. Create account and login
3. Click "New +" → "Web Service"
4. Connect GitHub repository
5. Configure:
   - **Name**: maitri-ai
   - **Environment**: Python 3
   - **Build Command**: `pip install -r ai-service/requirements.txt`
   - **Start Command**: `cd ai-service && python app.py`
   - **Region**: Choose nearest to you

6. Deploy and get URL: `https://maitri-ai.onrender.com`

---

## 📝 Step 6: Update Environment Variables

After all services are deployed, update the environment variables:

### Backend Environment (Vercel):
```
AI_SERVICE_URL = https://maitri-ai-xxxx.railway.app (or render.com URL)
CLIENT_URL = https://maitri.vercel.app
```

### Frontend Configuration
Update `client/src/services/api.js` to use the backend URL:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

---

## ✅ Step 7: Verify Deployment

1. **Frontend**: Open https://maitri.vercel.app
2. **Backend API**: Visit https://maitri-api.vercel.app/api/health
   - Should return: `{"success":true,"message":"MAITRI Server is running"}`

3. **Test Signup/Login**: Create a test account
4. **Test Features**: Check dashboard, mood tracking, etc.

---

## 🔐 Important Security Notes

1. **Never commit `.env`** - Always use Vercel's environment variable system
2. **Regenerate JWT_SECRET** - Use a secure random string, not the example value
3. **Enable MongoDB IP Whitelist** - Add Vercel's IP range to MongoDB Atlas
4. **Use HTTPS only** - Ensure all API calls use HTTPS
5. **Set CORS properly** - Backend CORS should only allow frontend domain

---

## 🐛 Troubleshooting

### Backend not connecting to MongoDB
- Check `MONGO_URI` in Vercel environment variables
- Verify MongoDB Atlas allows connection from Vercel IPs
- Check MongoDB user credentials

### Frontend can't reach backend
- Verify `VITE_API_URL` is set correctly
- Check CORS settings in backend (`CLIENT_URL` must match)
- Verify backend deployment is successful

### AI Service not accessible
- Verify Railway/Render deployment was successful
- Check `AI_SERVICE_URL` in backend environment
- Test the AI service URL directly in browser

### Build errors
- Check `npm run build` works locally first
- Verify `package.json` has all required dependencies
- Check for missing environment variables

---

## 📱 Custom Domain (Optional)

1. In Vercel Dashboard → Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration steps
4. Enable auto-renewal

---

## 🎯 Monitoring & Maintenance

- **Logs**: Vercel Dashboard → Deployments → Logs
- **Analytics**: Vercel Dashboard → Analytics
- **Performance**: Vercel → Speed Insights
- **Monitoring**: Set up alerts for failed deployments

---

## 🚀 Next Steps

1. ✅ Prepare environment variables
2. ✅ Set up MongoDB Atlas
3. ✅ Deploy backend to Vercel
4. ✅ Deploy frontend to Vercel
5. ✅ Deploy Python AI service (Railway/Render)
6. ✅ Update all environment variables
7. ✅ Test all features
8. ✅ Set up custom domain (optional)
9. ✅ Monitor and maintain

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas**: https://docs.mongodb.com/cloud/
- **Express.js**: https://expressjs.com/
- **React Vite**: https://vitejs.dev/

---

**Status**: Ready for deployment ✨
