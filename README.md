# PGMatch 🏠✨

> **Find a PG. Find your people.**

PGMatch is a modern full-stack platform that helps students and working professionals discover compatible PGs and roommates — matched not just by location, but by lifestyle, habits, and personality.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Compatibility Matching](#compatibility-matching)
- [Dashboards](#dashboards)
- [Roadmap](#roadmap)
- [Author](#author)

---

## Overview

Finding a PG is easy. Finding the right people to live with is hard.

PGMatch bridges that gap by combining **accommodation discovery**, **roommate compatibility scoring**, and **lifestyle matching** into a single, seamless experience — all wrapped in a clean, modern dark UI.

---

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Role-based access control (`seeker` / `owner`)

### Seeker
- Create and update personal profile
- Add lifestyle habits and preferences
- Browse and save PG listings
- View compatibility percentage with potential roommates
- Personalized seeker dashboard

### Owner
- Add and manage PG listings (rent, facilities, location)
- View seekers interested in their properties
- Manage profile and listing details

### Smart Compatibility Matching
Roommate compatibility is calculated based on:

| Parameter | Description |
|---|---|
| Sleep Schedule | Early bird vs night owl |
| Food Preference | Veg, non-veg, vegan |
| Noise Tolerance | Quiet vs social |
| Cleanliness | Tidiness expectations |
| Profession / Field | Student, working professional, etc. |
| Budget Range | Monthly rent affordability |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, React Router DOM, Tailwind CSS, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcrypt.js |

---

## Project Structure

```
PGMatch/
│
├── frontend/
│   └── src/
│       ├── pages/          # Route-level page components
│       ├── components/     # Reusable UI components
│       ├── context/        # React context (auth, global state)
│       ├── api/            # Axios API call wrappers
│       └── routes/         # Route definitions
│
├── backend/
│   ├── controllers/        # Business logic per resource
│   ├── routes/             # Express route declarations
│   ├── middleware/         # Auth middleware, error handlers
│   ├── models/             # Mongoose schemas
│   └── config/             # DB connection, env config
│
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/pgmatch.git
cd pgmatch
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 5. Start the backend

```bash
cd backend
npm run dev
```

### 6. Start the frontend

```bash
cd frontend
npm run dev
```

The app will be available at `http://localhost:5173` (or whichever port Vite assigns).

---

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `PORT` | Port for the Express server | Yes |
| `MONGO_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for signing JWT tokens | Yes |

---

## API Reference

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Register a new user (seeker or owner) |
| `POST` | `/auth/login` | Login and receive a JWT token |

After login, the JWT token is stored in `localStorage` and sent with subsequent requests via the `Authorization` header.

### Auth Flow

```
Register (role: seeker | owner)
    ↓
Login → JWT issued
    ↓
Seeker → redirected to /seeker
Owner  → redirected to /owner
```

### Sample Payloads

**Seeker**
```json
{
  "name": "Swati",
  "role": "seeker",
  "city": "Lucknow"
}
```

**Owner**
```json
{
  "name": "Rahul",
  "role": "owner",
  "city": "Bangalore"
}
```

---

## Compatibility Matching

Seekers fill out a lifestyle preferences form covering sleep schedule, food habits, noise tolerance, and cleanliness level. PGMatch uses these inputs to calculate a **compatibility percentage** between two seekers, helping users identify roommates they can genuinely live with — not just share a roof with.

---

## Dashboards

### Seeker Dashboard
- Saved PG listings
- Lifestyle preferences overview
- Roommate compatibility scores
- Profile completion status
- Quick action shortcuts

### Owner Dashboard
- Total PG listings
- Occupancy status
- Active seeker inquiries
- Property management panel

---

## Roadmap

Planned features for future releases:

- [ ] Real-time chat between seekers and owners
- [ ] AI-powered roommate recommendations
- [ ] PG reviews and ratings system
- [ ] Google Maps integration for listings
- [ ] Image uploads via Cloudinary
- [ ] Payment integration
- [ ] In-app notification system
- [ ] Advanced filtering (location, budget, amenities)
- [ ] AI-based compatibility scoring model

---

## Screens

| Screen | Description |
|---|---|
| Login Page | JWT-based login for both roles |
| Registration Page | Role selection (seeker / owner) |
| Seeker Dashboard | Personalized seeker home |
| Owner Dashboard | Property and seeker management |
| My Profile | View personal details |
| Update Profile | Edit info, city, phone, preferences |
| Saved Listings | Bookmarked PGs for seekers |

---

## Author

Built with dedication using **React**, **Node.js**, **MongoDB**, and modern UI practices.

This project was developed as a full-stack learning exercise focusing on:

- JWT authentication
- REST API design
- Role-based dashboards
- Real-world application architecture
- Modern frontend development with Tailwind CSS

---

> PGMatch can be extended into a production-level accommodation platform. Contributions and feedback are welcome!
