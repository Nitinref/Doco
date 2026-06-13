<div align="center">

<img src="https://img.shields.io/badge/-Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
<img src="https://img.shields.io/badge/-Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
<img src="https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/-AWS_EC2-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" />

# Doco

**Self-hosted container deployment engine.**  
Deploy Docker containers from a web dashboard. Get a live URL instantly.

[Live Demo](https://docod.duckdns.org) · [Report Bug](https://github.com) · [Request Feature](https://github.com)

</div>

---

## What it does

Doco lets you spin up any Docker container from a browser and immediately access it through a generated subdomain — no CLI, no config files.

```
Select image → Deploy → ecstatic_keldysh.docod.duckdns.org ✓
```

---

## Architecture

```
Browser
  │
  │  HTTPS
  ▼
┌─────────────────────────────┐
│  Frontend EC2               │
│  Next.js · PM2 · Nginx      │
│  docod.duckdns.org          │
└──────────────┬──────────────┘
               │  POST /api/container
               ▼
┌─────────────────────────────┐
│  Backend EC2                │
│  Express · Dockerode        │
│  Reverse Proxy Engine       │
│  Dynamic Domain Routing     │
└──────────────┬──────────────┘
               │  docker.createContainer()
               ▼
┌─────────────────────────────────────────┐
│  deploy-engine-network                  │
│                                         │
│  ┌────────────┐  ┌────────────┐         │
│  │ nginx:latest│  │ node:alpine│  ...    │
│  │ sub1.domain│  │ sub2.domain│         │
│  └────────────┘  └────────────┘         │
└─────────────────────────────────────────┘
```

---

## How a deployment works

| Step | What happens |
|------|-------------|
| 1 | User picks an image from the dashboard |
| 2 | Frontend sends `POST /api/container` |
| 3 | Backend checks if image exists locally |
| 4 | If not, pulls automatically from Docker Hub |
| 5 | Container is created via Docker Engine API |
| 6 | Container joins `deploy-engine-network` |
| 7 | A unique subdomain is generated |
| 8 | Reverse proxy routes traffic to the container |

---

## Stack

**Frontend** — Next.js, React, TypeScript, Tailwind CSS, PM2, Nginx

**Backend** — Node.js, Express.js, Dockerode, HTTP Proxy, Docker Engine API

**Infrastructure** — Docker, AWS EC2, DuckDNS, HTTPS/SSL

---

## Supported images

```bash
nginx:latest        node:20-alpine
python:3.12-slim    redis:7
mysql:8             # any public Docker Hub image
```

---

## Local setup

```bash
# Clone
git clone https://github.com/your-username/doco
cd doco

# Backend
cd backend && npm install
node index.js

# Frontend
cd frontend && npm install
npm run dev
```

> Make sure Docker is running on your machine before starting the backend.

---

## Roadmap

- [ ] GitHub repo deployment
- [ ] Dockerfile support
- [ ] Deployment logs viewer
- [ ] User authentication
- [ ] One-click stop / delete
- [ ] Kubernetes integration
- [ ] Resource monitoring dashboard

---

## Inspiration

Built independently, inspired by [Railway](https://railway.app), [Render](https://render.com), and [Vercel](https://vercel.com).

---

<div align="center">

Made with focus on container orchestration, deployment automation, and reverse proxy systems.

</div>
