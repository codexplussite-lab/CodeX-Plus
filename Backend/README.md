# CODEXX PLUS — Enterprise Backend API

A high-performance, typed Node.js & Express REST API for the **CODEXX PLUS** digital platform. Engineered with strict TypeScript, Zod schema validation, persistent data storage, security middleware (Helmet & CORS), and observability endpoints.

---

## Architecture & Directory Structure

```
Backend/
├── src/
│   ├── config/
│   │   └── env.ts                 # Validated environment configuration
│   ├── controllers/
│   │   ├── contact.controller.ts  # Inquiry ingestion & retrieval
│   │   ├── booking.controller.ts  # Strategy/discovery call bookings
│   │   ├── team.controller.ts     # Studio leadership directory
│   │   └── services.controller.ts # Capabilities & deliverables
│   ├── db/
│   │   └── storage.ts             # Local JSON persistence engine
│   ├── middlewares/
│   │   ├── errorHandler.ts        # 404 & centralized error handler
│   │   └── validate.ts            # Zod request body validation
│   ├── routes/
│   │   ├── health.routes.ts       # /api/health
│   │   ├── contact.routes.ts      # /api/contact
│   │   ├── booking.routes.ts      # /api/bookings
│   │   ├── team.routes.ts         # /api/team
│   │   └── services.routes.ts     # /api/services
│   ├── types/
│   │   └── index.ts               # Shared TypeScript models
│   ├── app.ts                     # Express application definition
│   └── server.ts                  # Server entry point & graceful shutdown
├── data/
│   └── db.json                    # Auto-created local database file
├── .env.example                   # Environment template
├── .env                          # Local environment variables
├── package.json
└── tsconfig.json
```

---

## Quick Start

### 1. Install Dependencies
```bash
cd Backend
npm install
```

### 2. Start in Development Mode (with hot reload)
```bash
npm run dev
```
The server will start on `http://localhost:5000`.

### 3. Build for Production
```bash
npm run build
npm start
```

---

## API Endpoints

### 1. Health Check
- **`GET /api/health`**
- **Response**:
```json
{
  "status": "online",
  "platform": "CODEXX PLUS Enterprise API Gateway",
  "version": "1.0.0",
  "timestamp": "2026-11-19T06:30:00.000Z",
  "uptimeSeconds": 42,
  "environment": "development"
}
```

---

### 2. Contact Inquiries
- **`POST /api/contact`**
- **Request Body**:
```json
{
  "name": "Sarah Connor",
  "email": "sarah@cyberdyne.ai",
  "company": "Cyberdyne Systems",
  "service": "Full-Stack Platform",
  "budget": "$50k – $100k",
  "message": "We need to architect an autonomous multi-agent pipeline for real-time telemetry."
}
```
- **Response `201 Created`**:
```json
{
  "success": true,
  "message": "Your inquiry has been received. Our team will follow up within 24 hours.",
  "data": {
    "id": "inq_1795069812_k92d1",
    "createdAt": "2026-11-19T06:30:12.000Z"
  }
}
```
- **`GET /api/contact`**: Returns list of all stored inquiries.

---

### 3. Discovery Call Bookings
- **`POST /api/bookings`**
- **Request Body**:
```json
{
  "name": "Marcus Vance",
  "email": "marcus@morhemetech.com",
  "service": "AI Innovation & Development",
  "preferredDate": "2026-11-25",
  "notes": "Looking for high-throughput LLM integration"
}
```
- **Response `201 Created`**:
```json
{
  "success": true,
  "message": "Discovery strategy call request received. Calendar invitation dispatched.",
  "data": {
    "id": "book_1795069830_a47bc",
    "createdAt": "2026-11-19T06:30:30.000Z"
  }
}
```
- **`GET /api/bookings`**: Returns list of all booking requests.

---

### 4. Team Directory API
- **`GET /api/team`**: Returns all 12 studio principals.
- **`GET /api/team/:id`**: Returns specific team member details.

---

### 5. Services Directory API
- **`GET /api/services`**: Returns the 5 core disciplines and deliverables.
