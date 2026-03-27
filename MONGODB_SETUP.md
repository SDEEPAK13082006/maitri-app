# MongoDB Setup - Quick Options

## ⚡ Fastest Option: MongoDB Atlas (Cloud - No Installation)

1. **Create Free Account**:
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account

2. **Create a Free Cluster**:
   - Click "Create a Deployment"
   - Select "M0 Free" tier
   - Choose your region
   - Click "Create"

3. **Get Connection String**:
   - In Atlas, click "Databases"
   - Click "Connect" on your cluster
   - Select "Drivers"
   - Copy the connection string
   - Replace `<password>` with your database user password

4. **Update `.env` File**:
   ```
   cd server
   # Edit the .env file and update:
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/maitri
   ```

5. **Restart Backend**:
   ```
   npm run dev
   ```

---

## Local Option: MongoDB Community (Requires Installation)

### Windows - Using MSI Installer

1. **Download MongoDB**:
   - Visit: https://www.mongodb.com/try/download/community
   - Select Windows
   - Download MSI installer

2. **Install**:
   - Run the installer
   - Follow the setup wizard
   - Choose "Run MongoDB as a Windows service"

3. **Start MongoDB**:
   ```powershell
   mongod
   ```

4. **Update `.env`** (Already configured):
   ```
   MONGO_URI=mongodb://localhost:27017/maitri
   ```

5. **Restart Backend**:
   ```
   npm run dev
   ```

---

## Quick Test (Without Full MongoDB)

If you want to test the frontend immediately without MongoDB:

1. **Frontend only** - Already running on `http://localhost:5173`
2. Backend API calls will fail, but UI can be tested
3. Complete MongoDB setup later

---

## Verify Setup

Once MongoDB is running:

```bash
# Terminal 1: Backend
cd server
npm run dev
# Should show: "Server running on http://localhost:5000"

# Terminal 2: AI Service  
cd ai-service
python app.py
# Should show: "AI Service running on http://localhost:5001"

# Terminal 3: Frontend
cd client
npm run dev
# Should show: "http://localhost:5173"
```

Then visit: **http://localhost:5173**

---

**Recommended**: Use MongoDB Atlas for fastest setup (no installation needed!)
