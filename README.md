# 🚀 LuxeThreads - Modern Personality-Driven E-Store

LuxeThreads is a full-stack e-commerce platform designed for buyers who express their unique personality through apparel. The application features a robust Spring Boot backend, a dynamic React frontend, and a fully containerized deployment pipeline.

![LuxeThreads Banner](https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

## ✨ Core Features

-   **🔐 Secure Authentication**: Distinct Login and Registration flows with database verification.
-   **🛒 Advanced Shopping Cart**: Persistent cart management with real-time quantity updates and partial-update optimization for data integrity.
-   **📦 Order Management**: Full checkout process with automated order history tracking and persistent storage.
-   **🔍 Smart Product Search**: Real-time filtering and search capabilities for a seamless browsing experience.
-   **🐳 Dockerized Architecture**: One-command orchestration for the entire stack (Frontend, Backend, and Database).
-   **🗄️ Relational Persistence**: Robust data management using MySQL with Fallback/Dev support via H2.

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React, Vite, Context API, Lucide Icons, Vanilla CSS (Premium Design) |
| **Backend** | Java Spring Boot, Spring Data JPA, Hibernate, Maven |
| **Database** | MySQL (Production), H2 (Development & Testing) |
| **DevOps** | Docker, Docker Compose, |

---

## 🚀 Quick Start (Docker - Recommended)

The fastest way to get LuxeThreads running is using Docker.

```bash
docker-compose up --build
```
*   **Frontend**: [http://localhost](http://localhost)
*   **Backend API**: [http://localhost:8080/products](http://localhost:8080/products)
*   **Database**: Port `3307` (Host) -> `3306` (Container)

---

## 🛠️ Manual setup

Check our detailed guides for manual configuration and deep dives:

-   [📄 Deployment Guide](./deployment_guide.md) - Manual build and environment variable setup.
-   [🌐 Hosting Guide](./hosting_guide.md) - Instructions for Railway, Render, and Vercel.

---

## 🧪 Testing & Quality

We maintain high code quality through rigorous testing of both model and controller tiers.

### Run All Tests:
```bash
mvn clean test jacoco:report
```
View coverage at: `estore-api/target/site/jacoco/index.html`

---
