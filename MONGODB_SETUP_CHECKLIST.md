# ✅ MongoDB Setup - Complete These Steps (3 minutes)

## What to do RIGHT NOW in MongoDB

You're logged in. Here's exactly what to click:

### **✅ STEP 1: Create Organization**
- [ ] Look for "Create an organization" 
- [ ] Type: `MAITRI`
- [ ] Click "Create Organization"

### **✅ STEP 2: Create Project**
- [ ] Type project name: `maitri-app`
- [ ] Click "Create Project"

### **✅ STEP 3: Create Free Cluster**
- [ ] Click "Build a Database"
- [ ] Select **M0 Free** tier
- [ ] Choose your region (closest to you)
- [ ] Click "Create Deployment"
- [ ] ⏳ **Wait 3-5 minutes** for cluster to be ready...

### **✅ STEP 4: Create Database User**
- [ ] On left sidebar: Click "Security" → "Database Access"
- [ ] Click green "Add New Database User" button
- [ ] **Username**: `maitri_admin`
- [ ] **Password**: Click "Generate Secure Password" (⭐ SAVE THIS PASSWORD!)
- [ ] Scroll down and click "Add User"

### **✅ STEP 5: Allow All IPs**
- [ ] Click "Network Access" (left sidebar)
- [ ] Click green "Add IP Address" button
- [ ] Click "Allow access from anywhere" (0.0.0.0/0)
- [ ] Click "Confirm"

### **✅ STEP 6: Get Connection String**
- [ ] Go back to "Deployment" tab
- [ ] Click your cluster name (e.g., "Cluster0")
- [ ] Click blue "Connect" button
- [ ] Click "Drivers"
- [ ] Make sure "Node.js" is selected
- [ ] Copy the entire connection string
- [ ] It looks like:
  ```
  mongodb+srv://maitri_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
  ```

### **✅ STEP 7: Replace Password**
- [ ] In the connection string, find `<password>`
- [ ] Replace it with your actual password (from STEP 4, when you generated it)
- [ ] Final string should look like:
  ```
  mongodb+srv://maitri_admin:MyActualPassword123@cluster0.abc123def456.mongodb.net/?retryWrites=true&w=majority
  ```

---

## 📋 Checklist

- [ ] Organization created: "MAITRI"
- [ ] Project created: "maitri-app"
- [ ] M0 Free cluster created
- [ ] Database user created: `maitri_admin`
- [ ] Password saved somewhere safe
- [ ] All IPs whitelisted (0.0.0.0/0)
- [ ] Connection string copied
- [ ] Password replaced in connection string

---

## 🎉 When Done

Once you complete all steps above:
1. **Copy your final connection string**
2. Come back and paste it here
3. I'll immediately deploy to Vercel! 🚀

---

## ⏱️ Time: ~5-10 minutes (mostly waiting for cluster)

**Go ahead and complete these steps, then paste your connection string!**
