# CODEXX PLUS — Full-Stack Platform Monorepo

Enterprise digital platform monorepo containing both the dark-luxury frontend application and high-performance Node.js/TypeScript REST API gateway.

---

## Repository Structure

```
CodeX-Plus/
├── Frontend/           # React 19, Tailwind CSS v4, GSAP, OGL/WebGL Shaders
│   ├── src/
│   │   ├── components/ # Specular cards, modals, depth carousel, navigation
│   │   ├── pages/      # About Us, Services, Our Team, Contact flagship pages
│   │   └── data/       # Static site data & team directory
│   ├── public/         # High-resolution media, logos, and studio photography
│   └── package.json
│
└── Backend/            # Express, TypeScript, Zod Schema Validation, Local DB
    ├── src/
    │   ├── controllers/# Inquiries, bookings, team, and services controllers
    │   ├── routes/     # REST API routing (/api/health, /api/contact, etc.)
    │   ├── db/         # Persistent JSON storage engine
    │   └── middlewares/# Centralized error handling & Zod validator
    └── package.json
```

---

## Getting Started

### 1. Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```
Runs at `http://localhost:5173`.

### 2. Backend Setup
```bash
cd Backend
npm install
npm run dev
```
Runs at `http://localhost:5000`.

---

## Production Build

```bash
# Build Frontend
cd Frontend
npm run build

# Build Backend
cd ../Backend
npm run build
npm start
```
