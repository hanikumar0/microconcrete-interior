Role and Objective
Act as a Senior Full-Stack MERN Developer, UI/UX Designer, Frontend Animation Specialist, and Backend Architecture Engineer.
Your task is to design and build a production-ready luxury microconcrete interior design website using the MERN stack.
The website must feel:
Premium
Modern
Minimal
Cinematic
Smooth
Luxury-focused
Fast-loading
Professional
The website must showcase:
Interior design projects
Microconcrete textures and finishes
Residential and commercial services
Brand story
Consultation inquiry system
Premium portfolio gallery
High-quality visuals
Scalable backend system
The project must be built like a real production business platform, not a basic portfolio website.
Main Goal
Build a complete MERN website with:
Luxury UI design
Smooth animations
Responsive layout
Secure backend
Project management system
Contact inquiry system
Fast image loading
SEO-friendly structure
Future-ready architecture
Clean scalable codebase
Technology Stack 
Frontend Technologies
React.js
Used to build the website interface using reusable components for faster and cleaner development.
React Router
Used for page navigation without full page reloads for smoother user experience.
Functional Components
Used to create modern React components with simpler and cleaner code structure.
React Hooks
Used for handling state, animations, forms, and dynamic UI behavior.
Tailwind CSS
Used for fast responsive styling and maintaining consistent design across the website.
CSS Modules
Used for writing component-specific styles without style conflicts.
Framer Motion
Used for smooth animations, page transitions, hover effects, and cinematic scrolling effects.
Axios
Used for sending data between frontend and backend APIs.
Context API or Zustand
Used for managing global website state like menus, themes, and shared data.
Backend Technologies
Node.js
Used to run JavaScript on the server side.
Express.js
Used for creating backend APIs and handling server requests.
MongoDB
Used for storing website data like projects, testimonials, and contact inquiries.
Mongoose
Used for creating database schemas and validating MongoDB data.
express-validator
Used for validating form data before storing it in the database.
dotenv
Used for storing secret environment variables securely.
helmet
Used for adding backend security protection.
cors
Used for allowing secure communication between frontend and backend.
express-rate-limit
Used for preventing spam requests and API abuse.
External Services Used
MongoDB Atlas
Used for hosting the MongoDB database online.
Cloudinary
Used for storing and optimizing project images and videos.
Vercel
Used for frontend website deployment.
Render or Railway
Used for backend server deployment.
CDN
Used for faster image and file delivery worldwide.
Project Folder Structure
project-root/
│
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── layouts/
│       ├── animations/
│       ├── hooks/
│       ├── context/
│       ├── services/
│       ├── utils/
│       ├── styles/
│       └── routes/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── models/
│   ├── services/
│   ├── validators/
│   ├── utils/
│   └── server.js
│
└── docs/
Folder  structure
assets/
Stores images, videos, icons, fonts, and visual files.
components/
Stores reusable UI sections like buttons, cards, navbar, and footer.
pages/
Stores website pages like Home, About, Services, Portfolio, and Contact.
layouts/
Stores common page structures used across the website.
animations/
Stores reusable animation configurations and motion settings.
hooks/
Stores reusable React hooks for logic handling.
context/
Stores global state management files.
services/
Stores API request functions for backend communication.
utils/
Stores helper functions and reusable utility logic.
styles/
Stores global styles and theme configurations.
routes/
Stores frontend route configuration.
config/
Stores backend configuration like database connection.
controllers/
Stores backend request handling logic.
middleware/
Stores backend security and validation functions.
models/
Stores MongoDB database schemas.
validators/
Stores API request validation rules.
UI and Design Requirements
The website must follow a luxury architectural style inspired by:
High-end interior studios
Editorial magazines
Premium architecture websites
Modern European design systems
Color Palette
Use:
Matte black
Charcoal grey
Slate grey
Concrete-inspired tones
Warm beige accents
Soft brass highlights
Typography Style
Use:
Elegant heading fonts
Clean body fonts
Large cinematic headings
Spacious typography spacing
Animation Requirements
Use Framer Motion for:
Scroll animations
Fade-in effects
Smooth transitions
Hover animations
Image reveal animations
Parallax scrolling
Page transitions
Animations must:
Feel smooth and premium
Not lag on mobile devices
Load efficiently
Avoid sudden layout movement
Website Sections
1. Hero Section
Include:
Fullscreen hero banner
High-quality background video or image
Animated heading text
Call-to-action buttons
Smooth scroll indicator
Dark overlay for readability
Purpose:
 Used to create a strong luxury first impression.
2. About Section
Include:
Brand story
Microconcrete explanation
Material durability information
Finish and texture details
Editorial content layout
Purpose:
 Used to explain the business and build customer trust.
3. Services Section
Include:
Residential interior services
Commercial interior services
Custom furniture finishes
Decorative wall finishes
Each service card must contain:
Premium image
Hover animation
Short description
CTA button
Purpose:
 Used to showcase available services professionally.
4. Portfolio Gallery Section
Build a premium gallery system with:
Masonry grid layout
Category filtering
Smooth animations
Lightbox image preview
Lazy loading
Responsive images
Optimized image loading
Purpose:
 Used to showcase completed interior projects beautifully.

Portfolio Data Structure
Each project must contain:
Project title
Project description
Multiple project images
Material details
Project category
Location
Completion date
Tags
Purpose:
 Used for organizing and managing project portfolios.
5. Testimonials Section
Include:
Customer reviews
Sliding testimonial cards
Auto-scroll carousel
Smooth transition animations
Purpose:
 Used to build trust and social proof.
6. Contact / Consultation Section
Create a premium floating contact form.
Required Form Fields
Full Name
Email Address
Phone Number
Project Type
Budget Range
Timeline
Project Description
Purpose:
 Used for collecting customer inquiries.
Form Validation Requirements
Implement:
Email Validation
Checks if the email format is correct.
Phone Validation
Checks if the phone number format is valid.
Required Field Validation
Prevents empty form submissions.
Inline Error Messages
Shows errors directly below fields.
Loading State
Shows loading feedback while submitting form.
Success Message
Shows confirmation after successful submission.
Responsive Design Requirements
The website must work properly on:
Mobile devices
Tablets
Laptops
Large desktop screens
Include:
Mobile navigation menu
Responsive typography
Flexible spacing
Responsive image scaling
Purpose:
 Used to ensure the website looks professional on every device.
Accessibility Requirements
Implement:
Semantic HTML
Used for proper website structure and better browser understanding.
Keyboard Navigation
Allows users to navigate without a mouse.
Visible Focus States
Shows which button or input is currently selected.
Alt Text for Images
Helps screen readers describe images.
Purpose:
 Used to improve usability for all users.
Frontend Engineering Requirements
Implement:
Component-Based Architecture
Used for reusable and scalable frontend development.
Lazy Loading
Loads sections only when needed for faster performance.
Code Splitting
Loads smaller JavaScript files for better speed.
Skeleton Loaders
Shows loading placeholders before content appears.
Error Boundaries
Prevents full website crashes if a component fails.
Memoization
Prevents unnecessary re-rendering for better performance.
Backend Architecture Requirements
Build secure REST APIs using Express.js.
Purpose:
 Used for frontend and backend communication.
API Endpoints
Projects API
GET /api/projects
GET /api/projects/:id
POST /api/projects
PUT /api/projects/:id
DELETE /api/projects/:id
Purpose:
 Used for managing project portfolio data.
Contact API
POST /api/leads
GET /api/leads
Purpose:
 Used for storing and viewing customer inquiries.
Database Collections
Projects Collection
Stores:
Project details
Images
Categories
Materials
Tags
Purpose:
 Used for portfolio management.
Leads Collection
Stores:
Customer inquiries
Contact details
Budget information
Project requirements
Purpose:
 Used for consultation management.
Testimonials Collection
Stores:
Customer reviews
Ratings
Client names
Purpose:
 Used for social proof display.
Materials Collection
Stores:
Material types
Finish details
Texture information
Purpose:
 Used for material showcase content.
API Security Requirements
Implement:
Helmet
Protects backend HTTP headers.
CORS
Controls secure frontend-backend communication.
Rate Limiting
Blocks spam API requests.
Input Sanitization
Removes harmful input from forms.
Secure Environment Variables
Protects secret keys and database credentials.
Purpose:
 Used for backend security and attack prevention.
SEO Requirements
Implement:
Meta Tags
Helps search engines understand pages.
OpenGraph Tags
Improves social media sharing previews.
Structured Data
Helps Google understand website content better.
Sitemap
Helps search engines index pages faster.
Purpose:
 Used for improving Google search visibility.
Image Optimization Requirements
Implement:
WebP Images
Reduces image size for faster loading.
Lazy Loading
Loads images only when visible.
Responsive Images
Serves correct image size based on screen size.
Blur Placeholder
Shows temporary blurred preview while images load.
Purpose:
 Used for improving performance and visual experience.
Performance Requirements
Target:
Fast initial loading
Smooth scrolling
High Lighthouse score
Minimal layout shifts
Optimized animations
Use:
Optimized React rendering
Lazy loading
Efficient image loading
Small bundle sizes
Purpose:
 Used for better speed and smoother experience.
Error Handling Requirements
Implement:
Backend Error Middleware: Used for stable backend behavior and better API error management 
Frontend Fallback UI: Used for keeping the website usable even when backend APIs fail. 
Validation Error Responses: Returns proper form validation messages.
Purpose:
 Used for stable and reliable application behavior.
Scalability Requirements
Structure the project for future support of:
Admin dashboard: Used for easy website management without changing code manually. 
Authentication system: Used for website security and protected admin access. 
CMS integration: Used for easier content management and future scalability. 
Multi-language support: Allows the website to support multiple languages. 
Analytics dashboard: A system for tracking website performance and visitor behavior. 
Cloud media storage: A cloud-based system for storing images and videos online. 
Purpose:
 Used for future business expansion.
Code Quality Requirements
Code must:
Be modular
Be reusable
Use clean naming
Follow proper folder structure
Use async/await
Be easy to maintain
Be production-ready
Purpose:
 Used for long-term scalability and clean development.
Documentation Requirements
Provide:
Setup guide
MongoDB setup
API documentation
Environment variable guide
Deployment guide
Folder explanation
Purpose:
 Used for easier development and deployment.
Deployment Requirements
Frontend Deployment:
 Use Vercel for fast frontend hosting.
Backend Deployment:
 Use Render or Railway for backend hosting.
Database Hosting:
 Use MongoDB Atlas cloud database.
Purpose:
 Used for production-ready deployment infrastructure.
Development Flow
Build the project step-by-step in this order:
Backend setup
Database connection
Database schema creation
API route creation
Security middleware setup
Frontend setup
Layout system creation
Animation system
Portfolio gallery system
Contact form integration
Responsive optimization
Performance optimization
SEO optimization
Final testing
Deployment preparation
Final Goal
The final product must become a complete luxury interior design platform with:
Premium cinematic UI
Smooth animations
High-quality portfolio showcase
Fast-loading responsive frontend
Secure backend APIs
Professional inquiry system
Optimized image delivery
Scalable architecture
Production-ready engineering quality
