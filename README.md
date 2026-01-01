# 🎮 MMO Social Game Server API

A modern **Game Server API** built with **Fastify + TypeScript**, designed for **cross-platform social MMO games** with **player-driven economy**, **secure trading**, and **LiveOps-ready architecture**.

This project demonstrates how to design and implement a scalable backend for social MMO experiences, focusing on **security**, **modularity**, and **future cloud scalability**.

---

## 🚀 Features Overview

### 🔐 Authentication
- JWT-based authentication
- Secure password hashing with bcrypt
- Role-based access (`player`, `admin`)
- Stateless auth (ready for horizontal scaling)

### 👤 Users
- Player profile management
- Protected endpoint: `/users/me`
- Clean separation between **Auth** and **User Profile**

### 🎒 Inventory
- Player-owned inventory system
- Item ownership model
- Protected endpoints
- MMO-ready item structure (rarity, quantity, ownership)

### 💰 Economy
- Player balances (soft & hard currency)
- Event-based transaction ledger
- Audit / fraud-ready design
- Aggregation-ready data model (MongoDB-friendly)

---

## 🧠 Architecture Philosophy

This backend is designed following **real MMO backend principles**:

- **Domain separation**
  - Auth = identity & credentials
  - Users = player profile
  - Inventory = ownership
  - Economy = balances & ledger

- **Event-driven economy**
  - Balances are derived from transactions
  - Every currency change is auditable

- **Stateless API**
  - JWT authentication
  - No server-side sessions

- **Incremental scalability**
  - In-memory stores for rapid iteration
  - Seamless migration path to MongoDB + cloud infrastructure

---

## 🧩 Tech Stack

### Backend
- Node.js
- Fastify
- TypeScript (strict mode)
- JWT (`@fastify/jwt`)
- bcrypt

### Tooling
- ESM modules
- tsx (modern TypeScript runtime)
- Git & Gitflow
- API-first design

---

## 📡 API Endpoints

### Auth
POST /auth/register  
POST /auth/login  

### Users
GET /users/me  

### Inventory
GET  /inventory  
POST /inventory/add-item  

### Economy
GET  /economy/balance  
POST /economy/grant  
GET  /economy/transactions  

All protected routes require:

Authorization: Bearer <JWT>

---

## 🧪 Local Development

### Install dependencies
npm install

### Run the server
npm run dev

Server runs on:
http://localhost:3000

### Health check
curl http://localhost:3000/health

---

## 🔮 Roadmap (Next Steps)

Planned improvements to evolve this into a **production-ready MMO backend**:

- MongoDB + Mongoose
  - User persistence
  - Inventory collections
  - Economy aggregation pipelines

- Cloud & DevOps
  - AWS (ECS / EKS / Lambda)
  - Docker & Kubernetes
  - GitHub Actions CI/CD

- Security
  - OAuth providers
  - Web Application Firewall (WAF)
  - Rate limiting & abuse prevention

- LiveOps Tools
  - Admin dashboards (Vue.js)
  - Economy monitoring
  - Player management

---

## 🎯 Why This Project?

This repository was built to demonstrate **real-world backend skills** required for:

- Social MMO games
- Cross-platform clients (mobile, PC, console)
- Player-driven economies
- Secure player-to-player trading
- LiveOps & long-term scalability

This is **not a tutorial or toy project**, but a foundation designed with **production systems in mind**.

---

## 👋 About the Author

Experienced **Full-Stack Developer** with a strong focus on:
- Game backend systems
- Secure and scalable APIs
- Data-driven architectures
- Player-centric design

Passionate about **social games**, **UGC ecosystems**, and **player-driven economies**.

---


⭐ If you find this project interesting, feel free to star it!