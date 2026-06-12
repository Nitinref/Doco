# 🏗️ Doco - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      USER BROWSER                              │
│                  (http://localhost:3000)                       │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP/JSON
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                   DOCO FRONTEND (React)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  Dashboard   │  │ Deploy Page  │  │ Containers   │         │
│  │   • Stats    │  │   • Form     │  │ • List       │         │
│  │   • Status   │  │   • Quick    │  │ • Search     │         │
│  │              │  │     Select   │  │ • Manage     │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │              API Client (Axios)                         │ │
│  │    • Proxy: /api/* → localhost:8080/*                  │ │
│  └──────────────────────────────────────────────────────────┘ │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP/REST
                             │
┌────────────────────────────▼────────────────────────────────────┐
│               BACKEND API (Express.js)                         │
│             (http://localhost:8080)                           │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │           Management API                               │ │
│  │  • POST   /container     (Deploy)                      │ │
│  │  • GET    /containers    (List)                        │ │
│  │  • POST   /monitor       (Monitor)                     │ │
│  │  • GET    /              (Status)                      │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │           Reverse Proxy (Port 80)                      │ │
│  │    Routes container traffic: container.hostname        │ │
│  └──────────────────────────────────────────────────────────┘ │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ Docker API
                             │
┌────────────────────────────▼────────────────────────────────────┐
│              DOCKER DAEMON                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Images     │  │ Containers   │  │  Network     │         │
│  │   Storage    │  │   Running    │  │  (Internal)  │         │
│  │              │  │              │  │              │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

## Component Architecture

```
App
├── Sidebar (Navigation)
│   └── Menu Items (Dashboard, Deploy, Containers)
├── Navbar (Top Bar)
│   ├── Title
│   ├── Notifications
│   └── User Profile
└── Pages (Dynamic)
    ├── Dashboard
    │   ├── StatCard (x3)
    │   ├── Quick Deploy Card
    │   └── System Status Card
    ├── Deploy
    │   ├── Form (Image, Tag)
    │   ├── Popular Images List
    │   └── Quick Guide
    └── Containers
        ├── Search Bar
        └── Container List Items
```

## Data Flow

### Deployment Flow
```
User Input
   │
   ├─→ Form Submission
   │
   ├─→ Validation
   │
   ├─→ API Call: POST /container
   │   ├─→ Backend checks if image exists
   │   ├─→ Pulls image from Docker Hub (if needed)
   │   ├─→ Creates container
   │   ├─→ Connects to network
   │   └─→ Returns container info
   │
   └─→ Show Success Message
       └─→ Display container domain & name
```

### Container List Flow
```
User Navigation to Containers
   │
   ├─→ Fetch: GET /containers
   │
   ├─→ Backend queries Docker
   │
   ├─→ Return container list
   │
   ├─→ Display containers
   │   └─→ Filter/Search
   │
   └─→ Show status indicators
```

## Technology Stack

### Frontend (React)
- **Framework**: React 18
- **Build Tool**: Vite 4
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **State Management**: React Hooks (useState)

### Backend (Node.js)
- **Framework**: Express.js
- **Docker Client**: Dockerode
- **HTTP Proxy**: http-proxy
- **Runtime**: Node.js

### Infrastructure
- **Container Runtime**: Docker
- **Network**: Docker Network Bridge
- **Reverse Proxy**: http-proxy (Port 80)

## File Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── Navbar.jsx     # Top navigation
│   │   ├── Sidebar.jsx    # Side navigation
│   │   └── StatCard.jsx   # Card component
│   ├── pages/
│   │   ├── Dashboard.jsx  # Main dashboard
│   │   ├── Deploy.jsx     # Deployment page
│   │   └── Containers.jsx # Containers list
│   ├── services/
│   │   └── api.js         # API client
│   ├── App.jsx            # Root component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind config
├── postcss.config.js      # PostCSS config
└── package.json           # Dependencies
```

## API Contract

### POST /container
**Purpose**: Deploy a new container

**Request**:
```json
{
  "image": "nginx",
  "tag": "latest"
}
```

**Response**:
```json
{
  "stattus": "success",
  "data": {
    "containerName": "/eager_hopper",
    "domain": "eager_hopper.localhost"
  }
}
```

### GET /containers
**Purpose**: Get list of all containers

**Response**:
```json
[
  {
    "Id": "abc123...",
    "Name": "/eager_hopper",
    "Image": "nginx:latest",
    "State": "running",
    "Created": "2024-06-12T11:00:00Z",
    "Ports": []
  }
]
```

## Performance Considerations

1. **Frontend**
   - Lazy loading of pages
   - Efficient re-renders with React hooks
   - CSS optimizations with Tailwind
   - Icons via SVG (Lucide)

2. **Backend**
   - Connection pooling to Docker
   - Efficient image pulling (checks before pull)
   - Network optimization with reverse proxy

3. **Network**
   - API proxy reduces CORS issues
   - HTTP Keep-Alive for persistent connections
   - Minimal payload sizes (JSON)

## Security Notes

- ✅ No sensitive data in localStorage
- ✅ API validation on backend
- ✅ Docker socket isolated
- ✅ Container network isolation
- ⚠️ Consider adding authentication for production
- ⚠️ Add HTTPS for production deployment

## Scalability

- **Horizontal**: Multiple frontend instances behind load balancer
- **Vertical**: Backend can handle multiple API requests
- **Docker**: Limited by host Docker daemon capacity
- **Monitoring**: Add metrics collection for production

---

**Architecture designed for simplicity and one-click deployment!** 🐳
