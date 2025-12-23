# � LuxeThreads-E-Store Express - Personality-Driven Apparel

This is an e-store specializing in products that help its buyers express their personalities. The store offers t-shirts that, beyond their practical uses, serve as a canvas for users to express their tastes and ideas.

---

## 🛠️ Technology Stack
- **Backend**: Java Spring Boot (8-11)
- **Frontend**: React
- **Build Tool**: Maven

## 📋 Prerequisites
- **Java**: 8 => 11 (Make sure to have correct `JAVA_HOME` setup in your environment)
- **Maven**: Installed and configured
- **React**: Node.js and npm/yarn for frontend development
- **MySQL**: (Optional for production) Installed and running locally or on a server

---

## 🚀 How to Run It

1. **Clone the repository** and navigate to the root directory.

### 🗄️ Database Setup (MySQL)
1. **Ensure MySQL is running** on your system.
2. **Environment Variables**: For security (especially during deployment), set the following environment variables. The application will use these instead of the defaults in `application.properties`:
   - `DB_URL`: Your MySQL connection string.
   - `DB_USERNAME`: Your MySQL username (e.g., `root`).
   - `DB_PASSWORD`: Your MySQL password.
3. **Local Default**: If variables aren't set, it defaults to `localhost` with username `root` and password `password`. Update the password in `application.properties` if your local password is different.
   - **Note on Initialization**: On the very first run with a new database, set `spring.sql.init.mode=always` to create tables and seed data. For subsequent runs, set it to `never` to avoid "Duplicate Entry" errors.

### ⚙️ Backend (API)
1. **Navigate** to the `estore-api` folder.
2. **Execute**: `mvn compile exec:java`
3. **API access**: [http://localhost:8080/](http://localhost:8080/)

> [!IMPORTANT]
> Make sure your port `8080` is not in use. If it is, find the PID of the process and kill it first.

### 📱 Frontend (UI)
1. **Navigate** to the `estore-ui` folder.
2. **Install dependencies**: `npm install` (required only for the first time)
3. **Execute**: `npm run dev`
4. **App access**: Usually [http://localhost:5173](http://localhost:5173) (check terminal for actual URL)

---

## 🧪 CURL Commands for Testing

You can use the following commands to interact with the API:

- **List all products**:
  ```bash
  curl -X GET 'http://localhost:8080/products'
  ```
- **Retrieve a specific product**:
  ```bash
  curl -X GET 'http://localhost:8080/products/1'
  ```
- **Search for a product (partial name)**:
  ```bash
  curl -X GET 'http://localhost:8080/products/?name=glo'
  ```
- **Create a new product**:
  ```bash
  curl -X POST -H 'Content-Type:application/json' 'http://localhost:8080/products' -d '{"name": "Momo", "price":20, "quantity":20}'
  ```
- **Update a product (price or quantity)**:
  ```bash
  curl -X PUT -H 'Content-Type:application/json' 'http://localhost:8080/products' -d '{"id": 4,"name":"Mo:Mo", "price":10, "quantity":200}'
  ```
- **Delete a product**:
  ```bash
  curl -X DELETE 'http://localhost:8080/products/3'
  ```

> [!NOTE]
> On Mac, you might need to replace `localhost` with the address `0.0.0.0`!

---

## 🚀 Deployment

For production deployment, follow these general steps:

### 🏗️ Backend (API)
Build the executable JAR:
```bash
cd estore-api
mvn clean package -DskipTests
```
Run with environment variables: `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`.

### 🌐 Frontend (UI)
Build production static assets:
```bash
cd estore-ui
npm run build
```
Host the resulting `dist` folder on any static web host (Vercel, Netlify, etc.).

### 🐳 Docker (One-Command Deployment)
Build and start the entire stack (Database, API, and UI) with:
```bash
docker-compose up --build
```
The website will be available at `http://localhost`.

---

## 🌐 Hosting (Live Link)

To get a live link for your project, we recommend using **Railway** or **Render**. 

Check out the full [Hosting Guide](./hosting_guide.md) for step-by-step instructions.

---

## 🧪 How to Test It

The Maven build script provides hooks for running unit tests and generating code coverage reports in HTML.

### Run tests on all tiers together:
1. Execute: `mvn clean test jacoco:report`
2. Open in your browser: `PROJECT_API_HOME/target/site/jacoco/index.html`

### Run tests on a single tier (controller or model):
1. Execute: `mvn clean test-compile surefire:test@tier jacoco:report@tier`  
   *(Replace `tier` with one of: `controller`, `model`)*
2. Open in your browser: `PROJECT_API_HOME/target/site/jacoco/{controller, model}/index.html`

### Run tests in isolation:
1. Execute: `mvn exec:exec@tests-and-coverage`
2. **Controller tier**: `PROJECT_API_HOME/target/site/jacoco/controller/index.html`
3. **Model tier**: `PROJECT_API_HOME/target/site/jacoco/model/index.html`

