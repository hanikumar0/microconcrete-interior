# Prompt for Microconcrete Interior Design Website Development

## Context and Role

As a Principal Full-Stack Engineer and Lead UI/UX Designer, your main job is to design and build a high-performance web platform for an interior design business. The website should use frontend patterns to create a visually immersive experience that focuses on texture. It must also have backend data pipelines and be responsive, accessible, and of high quality.

The platform needs to showcase project portfolios, material information, and services in a professional way. This will help guide visitors through a conversion process.

The system must have a backend architecture that collects client consultation requests, scores leads, and stores portfolio assets efficiently. The website must present high-resolution project portfolios. It should also present material information and services in a professional format. The platform should guide visitors through a conversion pipeline.

The system must include a functional backend architecture to collect client consultation requests. It should score leads and store portfolio assets efficiently.

## Objective

Build a full-stack MERN platform using MongoDB, Express, React, and Node.

The platform should include:

- A beautiful texture-based UI with fluid routing and state management.
- A clean, modern design and responsive layout tailored to deliver a visual-centric, image-based asset experience.
- A powerful Consultation Request feature, complete with dynamic lead scoring.
- Securely logged user submissions in a MongoDB database.
- Secured API endpoints for data ingestion.
- Admin-ready architecture for retrieving, managing, and reporting on data.

## UI and Animation Requirements

### Aesthetic and Styling

- Use a base palette of slate grey, ash grey, or charcoal.
- Add earthy accents like raw sienna and muted brass.
- Use professional hover animations and minimal borders.

### Asset Presentation

- Microconcrete texture photos should lazy-load.
- More assets should load as the user scrolls.
- Portfolio grids should load smoothly and should not load all images at once.

### Transitions and Interactions

- Navigation between Home, About, Services, Gallery, and Contact sections must be easy.
- Visual effects must feel polished.
- The website must load fast.

## Layout Requirements

The platform must include:

- A hero section with a background that moves when you scroll. This can be a video or a high-resolution image.
- An about section that explains microconcrete and the science behind it.
- A services section with three columns for Commercial and Custom Furniture.
- A gallery section where users can filter photos and view them in a lightbox.
- A contact section with a form that users can fill out to get in touch.

The layout must be:

- Fully responsive so it looks good on all devices and screen sizes.
- Equipped with a menu for small screens.
- Accessible so everyone can use it, following accessibility standards and using descriptive image alt tags.
- Optimized for performance so it loads fast and looks good.
- Designed with generous spacing so the content stands out.

## Contact System Requirements

### Form Behavior

- Use soft shadows to create a clean floating card design.
- Highlight fields on focus.
- Clearly flag errors with inline red text without wiping user data.

### Contact Form Fields

- Name, required
- Email, required and validated
- Phone Number, required and validated
- Project Scope dropdown:
  - Residential
  - Commercial
  - Furniture
- Timeline, required
- Budget Range, required

### Validation

- Use client-side validation with strict regex for email and phone formats.
- Prevent submission if required fields are empty or invalid.

## Backend Requirements

- Create API routes with Express.js:
  - `GET /api/projects` for retrieving portfolio data.
  - `POST /api/leads` for processing form submissions.
- Use structured Mongoose schemas to log submissions securely in MongoDB.
- Develop backend logic that assigns a Lead Score based on budget and timeline inputs.
- Protect the API with:
  - `helmet`
  - `cors`
  - `express-rate-limit` around the submission endpoint
- Securely store credentials using environment variables.

## Data Processing Requirements

Use `express-validator` to sanitize all inputs to prevent:

- NoSQL injection attacks.
- Cross-site scripting, or XSS, attacks.

Process and structure portfolio data schemas to support nested arrays of image URLs and material specifications.

Ensure the API returns structured JSON responses:

- Success message and status code.
- Error message, if it exists, indicating which fields failed validation.

## Output Requirements

The final output must include:

- A smooth and highly pleasing React frontend in the Microconcrete brand.
- A valid and validated lead capture system.
- MongoDB collections updated on client submission.
- Confirmation message and UI state update shown to the user after successful submission.
- Graceful error handling on failure to connect to the database or API.

## Error Handling and Documentation

- Handle frontend form errors gracefully with clear user feedback.
- Implement centralized Express error-handling middleware to catch async failures without exposing internal stack traces.
- Provide structured error responses.

Document:

- Folder structure separating routes, controllers, models, and components.
- Database connection setup and schema relationships.
- Environment variable configuration through `.env.example`.
- Setup instructions and start scripts.

## Performance and Scalability

- Optimize React bundle size and render tree to prevent unnecessary re-renders during form input.
- Use Mongoose connection pooling for database resilience.
- Serve highly compressed WebP static images for slower network connections.
- Structure the backend to allow future integration of CRM webhooks and admin authentication.

## Technology Stack

Use the following:

### Frontend

- React using functional components and hooks
- Tailwind CSS or CSS Modules
- Axios or Fetch API for data fetching

### Backend

- Node.js and Express.js
- MongoDB and Mongoose
- `express-validator` for data sanitization
- `dotenv` for environment configuration
