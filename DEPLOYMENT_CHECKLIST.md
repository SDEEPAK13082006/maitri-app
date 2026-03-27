# 🚀 MAITRI Vercel Deployment Checklist

## Pre-Deployment (Local)

- [ ] All code committed and pushed to GitHub/GitLab/Bitbucket
- [ ] `.env` files are NOT in git (check `.gitignore`)
- [ ] Test build locally:
  ```bash
  # Frontend
  cd client && npm run build
  
  # Backend
  cd server && npm run build
  ```
- [ ] No console errors or warnings

## Step 1: MongoDB Atlas Setup (15 mins)

- [ ] Create MongoDB Atlas account: https://www.mongodb.com/cloud/atlas
- [ ] Create M0 free cluster
- [ ] Create database user (note username and password)
- [ ] Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/maitri`
- [ ] Whitelist IP: Add `0.0.0.0/0` (or specific Vercel IPs)

## Step 2: Backend Deployment (10 mins)

### Create Vercel Project
- [ ] Go to https://vercel.com/dashboard
- [ ] Click "Add New..." → "Project"
- [ ] Import from Git repository
- [ ] Select repository containing MAITRI

### Configure Backend
- [ ] Set root directory to: `./server`
- [ ] Build command: `npm install`
- [ ] Override start command: `npm start`
- [ ] Add environment variables:
  - [ ] `MONGO_URI`: Your MongoDB Atlas string
  - [ ] `JWT_SECRET`: Random secure string (generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
  - [ ] `NODE_ENV`: `production`
  - [ ] `CLIENT_URL`: Will be your frontend URL
  - [ ] `AI_SERVICE_URL`: Will update after AI service deployed
- [ ] Click "Deploy"
- [ ] **Note backend URL**: `https://maitri-api.vercel.app` (or your domain)

### Verify Backend
- [ ] Visit: `https://maitri-api.vercel.app/api/health`
- [ ] Should see: `{"success":true,"message":"MAITRI Server is running"}`

## Step 3: Frontend Deployment (10 mins)

### Create Vercel Project
- [ ] Go to https://vercel.com/dashboard
- [ ] Click "Add New..." → "Project"
- [ ] Import same Git repository
- [ ] Set root directory to: `./client`
- [ ] Framework: `Vite`

### Configure Frontend
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Add environment variable:
  - [ ] `VITE_API_URL`: `https://maitri-api.vercel.app`
- [ ] Click "Deploy"
- [ ] **Note frontend URL**: `https://maitri.vercel.app` (or your domain)

### Verify Frontend
- [ ] Visit: `https://maitri.vercel.app`
- [ ] Page loads without errors
- [ ] Can navigate to signup/login

## Step 4: Backend Environment Update (5 mins)

- [ ] Go to backend Vercel project → Settings → Environment Variables
- [ ] Update: `CLIENT_URL` → `https://maitri.vercel.app`
- [ ] **Redeploy** backend to apply changes:
  - [ ] Go to Deployments tab
  - [ ] Click on latest deployment
  - [ ] Click "Redeploy"

## Step 5: Python AI Service Deployment (Optional - 15 mins)

### Deploy to Railway
- [ ] Create Railway account: https://railway.app
- [ ] New Project → Deploy from GitHub
- [ ] Select repository
- [ ] Set root directory: `./ai-service`
- [ ] Railway auto-detects `requirements.txt`
- [ ] Add environment if needed: `FLASK_ENV=production`
- [ ] Deploy
- [ ] **Note AI service URL**: `https://maitri-ai-xxx.railway.app`

### OR Deploy to Render
- [ ] Create Render account: https://render.com
- [ ] New Web Service
- [ ] Connect GitHub
- [ ] Configure:
  - [ ] **Start Command**: `cd ai-service && python app.py`
  - [ ] **Build Command**: `pip install -r ai-service/requirements.txt`
  - [ ] Environment: Python 3
- [ ] Deploy
- [ ] **Note AI service URL**: `https://maitri-ai.onrender.com`

### Update AI Service URL
- [ ] Go to backend Vercel project → Settings → Environment Variables
- [ ] Update: `AI_SERVICE_URL` → Your Railway/Render URL
- [ ] **Redeploy** backend

## Step 6: Full Testing

- [ ] [ ] **Frontend loads**: https://maitri.vercel.app
- [ ] [ ] **Sign up page works**: Create test account
- [ ] [ ] **Login works**: Login with test account
- [ ] [ ] **Dashboard loads**: Check if data displays
- [ ] [ ] **Mood logging works**: Log a mood entry
- [ ] [ ] **Chat works**: Send a message (if AI service deployed)
- [ ] [ ] **Health tracking works**: Log exercise/sleep
- [ ] [ ] **Logout works**: Verify logout removes token

## Step 7: Post-Deployment (Optional)

- [ ] [ ] Add custom domain (Vercel → Domains)
- [ ] [ ] Set up analytics (Vercel → Analytics)
- [ ] [ ] Configure monitoring/alerts
- [ ] [ ] Document deployment process
- [ ] [ ] Set up GitHub Actions for CI/CD (optional)

## Rollback Plan (If Issues Occur)

- [ ] Keep note of previous deployment URLs
- [ ] Vercel Deployments tab allows quick rollback
- [ ] Previous environment values saved in history

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| 502 Bad Gateway | Backend crashed - check logs in Vercel |
| CORS error | Update `CLIENT_URL` in backend environment |
| MongoDB connection fails | Check connection string and IP whitelist |
| Cannot reach AI service | Verify Railway/Render deployment successful |
| Build fails | Check `npm run build` works locally first |
| Token not saved | Check browser localStorage is enabled |

## Deployment Information (Save these)

```
Frontend URL: https://maitri.vercel.app
Backend URL: https://maitri-api.vercel.app
AI Service: https://maitri-ai-xxxx.railway.app (or onrender.com)

MongoDB: mongodb+srv://...@cluster.mongodb.net/maitri
JWT Secret: [your secure string]
```

## Support

- Vercel Issues: Check deployment logs
- MongoDB Issues: Check Atlas connection
- Python Service: Check Railway/Render logs
- General Help: See VERCEL_DEPLOYMENT.md

---

**Status**: Ready to deploy! Follow steps 1-6 above. ✨
