# Microconcrete Luxury Interior Design Platform

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

A premium, highly interactive full-stack MERN platform built for a luxury microconcrete interior design studio. Designed with refined architectural aesthetics, rich animations, and high-conversion features, this platform delivers an immersive showcase of high-end seamless concrete surfaces alongside a robust, secure project gallery and lead management system.

---

## Quick Start & Live Preview

The workspace is pre-configured with a dependency-free **local preview server** to run and explore the application instantly without standard setup overhead.

### 1. Launch the Preview Server
Run the preview server from the root directory:
```bash
node server/script/preview-server.mjs
```

### 2. Access the Preview
Open your browser and navigate to:
*   **Web App Frontend:** [http://localhost:4173](http://localhost:4173)
*   *This serve-ready build serves the full landing page, dynamic gallery filters, real high-resolution Unsplash interior design assets, and mock backend integration.*

### 3. Preview API Endpoint Examples
*   **GET Portfolio:** `http://localhost:4173/api/projects`
*   **GET Categorized:** `http://localhost:4173/api/projects?category=bar`
*   **POST Lead Submission:** `http://localhost:4173/api/leads`

---

## Features & Architecture Highlights

*   **Premium Architectural Aesthetics:** A custom dark/light neutral palette designed to evoke raw concrete textures, luxurious minimal spaces, and tactile materiality.
*   **Dynamic Gallery & Rich Media:** Interactive project showcase with real high-resolution interior photography, fullscreen architectural lightbox, and instant categorization filters (*Residential, Commercial, Furniture, Wall, Ceiling, Terrace, Bar*).
*   **Algorithmic Lead Scoring:** Pre-qualification engine that dynamically scores submitted consultations based on project scope, custom budget brackets, and timelines.
*   **Production-Ready Security:** Full API hardening using `helmet`, secure CORS policies, rate-limiting, and `express-validator` data sanitization.
*   **Immersive Motion Design:** Smooth, fluid UI transitions driven by custom React animations and responsive touch layouts.

---

## Tech Stack & Dependencies

| Layer | Technology | Primary Role / Purpose |
| :--- | :--- | :--- |
| **Frontend** | React | Component-driven user interface |
| | Vite | Ultra-fast build tool & dev environment |
| | Tailwind CSS | Sleek utility styling with custom design tokens |
| | Framer Motion | Liquid fluid transitions and material animations |
| | React Router | Fast, clientside SPA routing |
| | Axios | Promised-based HTTP client for API interaction |
| **Backend** | Node.js | Asynchronous JavaScript runtime environment |
| | Express | High-performance minimalist REST API |
| | Helmet & CORS | Security headers and cross-origin controls |
| | Express Rate Limit | DDOS protection and API request throttling |
| **Database** | MongoDB & Mongoose | Document database with schema-based object modeling |
| | Express Validator | Strict input parsing & schema enforcement |

---

## Project Architecture

<details>
<summary><b>Click to expand Directory Tree</b></summary>

```text
├── client/                      # Frontend Application (Vite + React)
│   ├── public/
│   │   └── images/              # Static public assets
│   └── src/
│       ├── animations/          # Custom Framer Motion definitions
│       ├── components/          # Reusable UI parts (Header, Footer, Form)
│       ├── context/             # Global React state contexts
│       ├── hooks/               # Custom hooks for theme & fetching
│       ├── layouts/             # Grid & layout templates
│       ├── pages/               # Routed views (Home, Services, Gallery)
│       ├── routes/              # App routing tree
│       ├── services/            # Client API client connectors
│       ├── styles/              # Global Tailwind & base index.css
│       └── utils/               # Gallery mock data and utilities
│
├── server/                      # Backend API (Node + Express)
│   ├── config/                  # Database and server environment boots
│   ├── controllers/             # Request handlers
│   ├── middleware/              # Authentication, rate limiting, and errors
│   ├── models/                  # Mongoose MongoDB schemas
│   ├── routes/                  # API endpoints routes map
│   ├── script/                  # Utility scripts & preview environments
│   │   ├── generate_assets.py   # Helper script for media processing
│   │   └── preview-server.mjs   # Zero-dependency preview environment
│   ├── services/                # Business logic (Lead scoring)
│   ├── uploads/                 # Target folder for file uploads
│   ├── utils/                   # Shared helpers & fallback constants
│   └── validators/              # Express-validator validation schemas
```
</details>

---

## Full MERN Development Setup

To run the complete full-stack environment with active database connections and live reloading, execute the following steps:

### 1. Install Workspace Dependencies
Installs dependencies for root, client, and server workspaces in one command:
```bash
npm run install:all
```

### 2. Configure Environment Files
Clone the default environment template for the server:
```bash
cp server/.env.example server/.env
```

Open `server/.env` and update the database and host details:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/microconcrete_luxury
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### 3. Run Development Stack
Start both servers concurrently:
```bash
npm run dev
```

*   **Frontend Hot-Reloading:** [http://localhost:5173](http://localhost:5173)
*   **Backend Server Port:** [http://localhost:5000](http://localhost:5000)

---

## Core API Documentation

### 1. Retrieve Projects Portfolio
*   **Endpoint:** `GET /api/projects`
*   **Query Parameters:**
    *   `category` (Optional) - Filter by `residential` | `commercial` | `furniture` | `wall` | `ceiling` | `terrace` | `bar`

#### Sample Response (`200 OK`)
```json
{
  "success": true,
  "message": "Projects retrieved successfully",
  "data": [
    {
      "id": "60d0fe4f5311236168a109ca",
      "title": "Private Bar Counter",
      "category": "bar",
      "description": "Seamless high-gloss microconcrete bar top with metallic undertones.",
      "image": "https://images.unsplash.com/photo-1543007630-9710e4a00a20",
      "featured": true
    }
  ]
}
```

### 2. Submit Project Leads & Scoring
*   **Endpoint:** `POST /api/leads`
*   **Headers:** `Content-Type: application/json`

#### Request Payload
```json
{
  "name": "Ava Stone",
  "email": "ava@example.com",
  "phone": "+14155550123",
  "projectScope": "Commercial",
  "timeline": "0-3 months",
  "budgetRange": "$100k+",
  "message": "Need microconcrete walls, bar counter, and terrace flooring."
}
```

#### Success Response (`201 Created`)
```json
{
  "success": true,
  "message": "Lead submitted successfully",
  "data": {
    "id": "60d0feaf5311236168a109cb",
    "name": "Ava Stone",
    "leadScore": 100
  }
}
```

#### Validation Error Response (`400 Bad Request`)
```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

---

## Critical Architecture Files

For advanced customization or review, consult these primary modules:
*   **Gallery Assets Mapping:** [client/src/utils/galleryData.js](./client/src/utils/galleryData.js) — Houses portfolio metadata and high-res Unsplash links.
*   **Lead Intake Component:** [client/src/components/ContactForm.jsx](./client/src/components/ContactForm.jsx) — Controls client validations and visual feedback.
*   **Lead Scoring Engine:** [server/services/leadScoring.service.js](./server/services/leadScoring.service.js) — Algorithms that score leads based on timeline, budget, and scope.
*   **Data Validation Schemas:** [server/validators/](./server/validators/) — Holds robust input sanitizations.
*   **Fallback Data Provider:** [server/utils/fallbackProjects.js](./server/utils/fallbackProjects.js) — Provides catalog fallbacks if DB connectivity is offline.
*   **Project & Lead Models:** [server/models/Project.js](./server/models/Project.js) & [server/models/Lead.js](./server/models/Lead.js) — Direct schemas matching collections.
*   **Preview Site Server:** [server/script/preview-server.mjs](./server/script/preview-server.mjs) — Complete lightweight fallback sandbox.

---

## Accessibility & Performance Features

*   **A11y Semantic Structure:** Strictly enforces semantic HTML5 headers (`<header>`, `<main>`, `<section>`, `<article>`) and descriptive `aria-*` tags.
*   **Full Keyboard Focus:** Custom focus-visible indicators for all interactive buttons and lead intakes.
*   **Lazy Media Management:** Automatically registers native image lazy-loading to secure minimal page weights.
*   **Motion Accessibility:** Honors media preferences by implementing support for `prefers-reduced-motion` settings.
*   **Production Building:**
    *   Build frontend static files: `npm run build --prefix client`
    *   Start production server: `npm run start --prefix server`