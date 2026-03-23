# 🎮 GameStore

![Vercel](https://img.shields.io/badge/vercel-deployed-brightgreen)
![Render](https://img.shields.io/badge/render-deployed-brightgreen)
![.NET](https://img.shields.io/badge/.NET-10-purple)
![React](https://img.shields.io/badge/react-vite-61DAFB)

A full-stack web application to browse and manage a video game catalog. The frontend was built from scratch in React, with a .NET REST API on the backend, PostgreSQL on Supabase, and deployed on Vercel + Render.

---

## 🚀 Live Demo

- **Frontend**: [game-store-delta-seven.vercel.app](https://game-store-delta-seven.vercel.app)
- **API**: [gamestore-api-m5ac.onrender.com](https://gamestore-api-m5ac.onrender.com)

---

## ✨ Features

- Browse the full game catalog
- Filter games by genre
- Add, edit and delete games
- REST API with full CRUD operations
- Multi-provider database support (SQLite / PostgreSQL)
- Auto-deploy from GitHub to Vercel and Render

---

## 🛠️ Tech Stack

### Frontend

- React (Vite)
- Deployed on **Vercel** with automatic deploys from GitHub

### Backend

- .NET 10 — Minimal API
- Entity Framework Core
- Deployed on **Render**

### Database

- **Supabase** (PostgreSQL) in production
- SQLite for local development

---

## 📡 API Endpoints

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| GET    | `/games`      | List all games    |
| GET    | `/games/{id}` | Get a game by ID  |
| POST   | `/games`      | Create a new game |
| PUT    | `/games/{id}` | Update a game     |
| DELETE | `/games/{id}` | Delete a game     |
| GET    | `/genres`     | List all genres   |

---

## ⚙️ Architecture

The API supports multiple database providers via configuration, using the Options Pattern and dependency injection. No code changes are needed to switch between SQLite (local) and PostgreSQL (production).

```
appsettings.json       → DatabaseProvider: sqlite   (local)
Environment variables  → DatabaseProvider: postgres  (production)
```

### Environment Variables (Render)

| Key                           | Description                     |
| ----------------------------- | ------------------------------- |
| `DatabaseProvider`            | `postgres`                      |
| `ConnectionStrings__Postgres` | Full Supabase connection string |

### Local Development

```json
// appsettings.json
{
  "DatabaseProvider": "sqlite",
  "ConnectionStrings": {
    "Sqlite": "Data Source=GameStore.db"
  }
}
```

---

## 🏃 Running Locally

### Prerequisites

- .NET 10 SDK
- Node.js 18+

### Backend

```bash
cd GameStore.Api
dotnet restore
dotnet run
```

### Frontend

```bash
cd GameStore.Client
npm install
npm run dev
```

Create a `.env` file in the frontend folder:

```env
VITE_API_URL=http://localhost:5000
```

### Database Migrations

```bash
cd GameStore.Api
dotnet ef migrations add <MigrationName>
```

Migrations are applied automatically on startup via `MigrateDb()`.

---

## 📁 Project Structure

```
GameStore/
├── GameStore.Api/
│   ├── Data/
│   │   ├── Migrations/
│   │   ├── DataExtensions.cs    # DB provider logic
│   │   └── GameStoreContext.cs
│   ├── Endpoints/
│   ├── Models/
│   ├── Dtos/
│   ├── appsettings.json
│   ├── Dockerfile
│   └── Program.cs
└── GameStore.Client/            # React frontend
```

---

## 📖 Backend Reference

The backend API structure is based on the tutorial series by [Julio Casal](https://www.youtube.com/watch?v=YbRe4iIVYJk&list=PLeD0-5Hw0ZJ8U7NmCqObexO-mnuts2vi1&index=5). The frontend, database setup (Supabase), and deployment configuration (Vercel + Render) were implemented independently.
