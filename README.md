# Portfolio CMS — Full Stack Personal Portfolio & Content Management System

A full-stack personal portfolio website with a custom-built Content Management System (CMS).

The project consists of a public portfolio, a separate admin dashboard, and a Java Spring Boot backend connected to PostgreSQL.

It is designed to demonstrate real-world full-stack development, REST APIs, authentication, database integration, file uploads, email communication, SEO, and production deployment.

---

## 🌐 Live Demo

### Public Portfolio
https://portfolio-frontend-prsd.onrender.com

### Admin Dashboard
https://portfolio-admin-fr9o.onrender.com/

### Backend API
https://portfolio-backend-oxf2.onrender.com

---

## ✨ Features

### Public Portfolio

- Responsive portfolio website
- Home section
- About section
- Skills
- Projects
- Experience
- Services
- Testimonials
- Blog
- Contact form
- Resume view
- Resume download
- GitHub and LinkedIn links
- Responsive design for desktop, tablet, and mobile

### Custom Admin CMS

- Secure admin login
- JWT-based authentication
- Dashboard
- About management
- Skills management
- Projects management
- Experience management
- Services management
- Testimonials management
- Blog management
- Image/media uploads
- Contact message management
- Mark messages as read
- Delete messages

### Backend

- RESTful APIs
- JWT authentication
- Spring Security
- PostgreSQL database
- JPA/Hibernate
- Validation
- Centralized API structure
- Protected admin endpoints
- CORS configuration

### Contact & Email

- Public contact form
- Messages stored in database
- Email notification using Resend API
- Admin message management

### SEO

- SEO-friendly metadata
- Open Graph metadata
- Twitter metadata
- Canonical URL
- Sitemap
- robots.txt
- Google Search Console verification
- Structured data
- Search engine indexing

---

# 🏗️ Project Architecture

```text
portfolio-cms/
│
├── frontend/                    # Public Portfolio
│   ├── public/
│   │   ├── resume/
│   │   │   └── Barath_Raj_Resume.pdf
│   │   ├── favicon.png
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   │
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── ...
│
├── admin/                       # Admin CMS Dashboard
│   ├── public/
│   │   └── favicon.png
│   │
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── ...
│
├── backend/                     # Spring Boot Backend
│   ├── src/main/java/
│   │   └── com/portfolio/backend/
│   │       ├── config/
│   │       ├── controller/
│   │       ├── dto/
│   │       ├── entity/
│   │       ├── exception/
│   │       ├── repository/
│   │       └── service/
│   │
│   └── pom.xml
│
└── README.md  