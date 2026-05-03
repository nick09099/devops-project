# DevOps Full-Stack Application (Docker + CI/CD)

## Overview

This project is a **containerized full-stack application** demonstrating real-world DevOps practices:

* Frontend (Node-based UI)
* Backend (Node.js REST API)
* PostgreSQL database
* Nginx reverse proxy
* Docker & Docker Compose
* CI/CD pipeline with GitHub Actions
* Docker Hub image deployment

---

## Architecture

```
User → Nginx → Frontend (UI)
                 ↓
               Backend API → PostgreSQL
```

---

## Tech Stack

* **Frontend:** Node.js (HTML + JS UI)
* **Backend:** Node.js + Express
* **Database:** PostgreSQL
* **Reverse Proxy:** Nginx
* **Containerization:** Docker
* **CI/CD:** GitHub Actions
* **Registry:** Docker Hub

---

## Features

* View DevOps articles
* Add new articles via API
* Full containerized setup
* Reverse proxy routing (`/api → backend`)
* Automated CI pipeline with health checks
* Versioned Docker images

---

## Running Locally (Docker Compose)

### 1. Pull images

```bash
docker compose pull
```

### 2. Start services

```bash
docker compose up -d
```

### 3. Open in browser

```
http://localhost:8080
```

---

## API Endpoints

### Get all articles

```bash
GET /api/articles
```

### Add article

```bash
POST /api/articles
```

Example:

```json
{
  "title": "Docker Basics",
  "content": "Containers and images explained"
}
```

---

## CI/CD Pipeline

On every push to `main`:

1. Code is built
2. Docker images are created
3. Images are tagged (`latest` + commit SHA)
4. Images are pushed to Docker Hub

---

## Docker Images

* `nikki3/devops-frontend`
* `nikki3/devops-backend`

---

## Key DevOps Concepts Demonstrated

* Containerization with Docker
* Multi-service orchestration with Docker Compose
* Reverse proxy using Nginx
* CI/CD pipeline automation
* Image versioning (SHA-based tagging)
* Environment-based configuration

---

## Future Improvements

* Authentication (JWT)
* Search & filtering
* Monitoring (Prometheus/Grafana)
* Kubernetes deployment
* Cloud hosting (AWS / Fly.io)

---

## Author

Nikhil Ganapuram

---

## Notes

This project is built for learning and demonstrating **real DevOps workflows** from development → CI → container registry → deployment.
