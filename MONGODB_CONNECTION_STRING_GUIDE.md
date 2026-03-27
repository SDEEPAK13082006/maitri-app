# 📚 How to Create MongoDB Connection String

## Step-by-Step Guide

### **STEP 1: Go to MongoDB Atlas**
1. Open: https://www.mongodb.com/cloud/atlas
2. Click **"Start Free"** button

---

### **STEP 2: Sign Up**
1. Choose sign-up method (Google, GitHub, or Email)
2. Complete the sign-up process
3. Click "Create an organization"

---

### **STEP 3: Create Organization & Project**
1. **Organization Name**: Type "MAITRI" (or any name)
2. Click "Create Organization"
3. **Project Name**: Type "maitri-app"
4. Click "Create Project"

---

### **STEP 4: Create a Cluster**
1. Click **"Create a Deployment"**
2. Choose **"M0 Free"** tier (it's free!)
3. Select your region (closest to you)
4. Click **"Create Deployment"**
5. Wait 3-5 minutes for the cluster to be ready

---

### **STEP 5: Create Database User**
1. On the left side, click **"Security"** → **"Database Access"**
2. Click **"+ Add New Database User"**
3. **Username**: Enter `maitri_admin`
4. **Password**: Click "Generate Secure Password"
   - Copy this password and save it somewhere safe!
5. Click **"Add User"**

---

### **STEP 6: Whitelist Your IP**
1. Click **"Network Access"** (on left side)
2. Click **"+ Add IP Address"**
3. Click **"Allow access from anywhere"**
4. Click **"Confirm"**

---

### **STEP 7: Get Your Connection String**
1. Go back to **"Deployments"** tab
2. Click on your cluster name (e.g., "Cluster0")
3. Click **"Connect"** button
4. Click **"Drivers"**
5. Select **"Node.js"** and version **"4.1 or later"**
6. You'll see a connection string like:
   ```
   mongodb+srv://maitri_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
7. **Copy this entire string**
8. Replace `<password>` with your actual password (the one you generated in STEP 5)

---

## ✅ Example Connection String

**Before** (with placeholder):
```
mongodb+srv://maitri_admin:<password>@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
```

**After** (with actual password):
```
mongodb+srv://maitri_admin:MySecure123Pass@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
```

---

## 📋 Connection String Format

Your connection string will have:
- **Username**: `maitri_admin`
- **Password**: Your generated secure password
- **Cluster**: Something like `cluster0.xxxxx`
- **Database**: Optional `maitri` at the end

**Final format**:
```
mongodb+srv://maitri_admin:PASSWORD@cluster0.xxxxx.mongodb.net/maitri?retryWrites=true&w=majority
```

---

## 🚀 Next Steps

Once you have your connection string:
1. Copy the entire string
2. Come back here
3. Paste it to me
4. I'll deploy everything to Vercel!

---

## ⚠️ Important Notes

- Keep your password safe
- Don't share the connection string publicly
- If you forget the password, you can reset it in Database Access settings
- The string format must include `mongodb+srv://` at the beginning
