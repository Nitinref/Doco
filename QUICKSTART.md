# Doco - Quick Start Guide 🚀

## What is Doco?

Doco is a beautiful Docker container manager with **one-click deployment** - just like Dockify! Spin up new containers or deploy images instantly with a simple, elegant interface.

## Getting Started

### Step 1: Start the Backend
```bash
cd backend
npm install
npm start
# Backend will run on http://localhost:8080
```

### Step 2: Start the Frontend
```bash
cd frontend/app
npm run dev
# Frontend will run on http://localhost:3000
```

### Step 3: Open in Browser
Navigate to: **http://localhost:3000**

---

## 📚 Using Doco

### 🏠 Dashboard
- **View System Status**: See all active containers and system health
- **Quick Stats**: View total containers, active deployments, and failed containers
- **System Overview**: Monitor Docker daemon, API server, and network status

### ⚡ Deploy Container (Main Feature!)
1. Go to **Deploy Container** page
2. Enter Docker image name (e.g., `nginx`, `ubuntu`, `python`)
3. Select or enter tag (e.g., `latest`, `1.0.0`)
4. Click **Deploy Container** button
5. 🎉 Container is deployed and accessible via the generated domain!

**Popular Images to Try:**
- `nginx:latest` - Web server
- `node:18` - Node.js environment
- `python:3.11` - Python environment
- `ubuntu:22.04` - Ubuntu OS
- `mysql:8` - MySQL database
- `redis:7` - Redis cache

### 📦 Containers Page
- **View All Containers**: See list of all deployed containers
- **Search**: Find containers by name or image
- **Status**: Check if container is running or stopped
- **Manage**: View container details and manage them

---

## 🎯 Key Features

✨ **Beautiful UI**
- Modern gradient design with Docker-themed colors
- Responsive layout for all devices
- Smooth animations and transitions

⚡ **One-Click Deployment**
- Deploy Docker images in seconds
- No complex configuration needed
- Automatic image pulling from Docker Hub

📊 **Real-Time Dashboard**
- Live container status
- System health monitoring
- Quick statistics and metrics

🔍 **Container Management**
- Search and filter containers
- View detailed container information
- Monitor active deployments

---

## 📊 API Architecture

```
Browser (Frontend on port 3000)
         ↓
    Proxy (localhost:3000)
         ↓
    Backend API (localhost:8080)
         ↓
    Docker Daemon
```

---

## 🛠️ Troubleshooting

### Backend not connecting?
1. Ensure backend is running on port 8080
2. Check: `curl http://localhost:8080`
3. Should return: `{"status": "Management APIs are up and running"}`

### Frontend not showing containers?
1. Deploy a container first using the Deploy page
2. Click Refresh button on Containers page
3. Check browser console for errors

### Deployment fails?
1. Verify image name is correct (e.g., `nginx`, not `nginx:invalid-tag`)
2. Check backend logs for errors
3. Ensure Docker daemon is running

---

## 💡 Tips & Tricks

- **Quick Image Selection**: Popular images have quick-select buttons on Deploy page
- **Search Containers**: Use search on Containers page to filter
- **Refresh Status**: Click refresh button to update container list
- **Domain Access**: Each container gets a unique domain (e.g., `/<container-name>.localhost`)

---

## 📁 Project Structure

```
doco/
├── backend/
│   ├── server.js           # Express API server
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API client
│   │   └── App.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
└── README.md               # This file
```

---

## 🚀 Next Steps

1. **Explore the Dashboard** - Get familiar with the UI
2. **Deploy Your First Container** - Try deploying Nginx or another image
3. **Check Containers List** - See your deployed containers
4. **Experiment** - Try different images and tags

---

## 📞 Support

For issues or feature requests, check the backend and frontend README files.

**Enjoy using Doco! 🐳**
