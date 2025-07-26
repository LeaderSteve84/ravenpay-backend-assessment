# Ravenpay Backend Assessment

A backend API for a money transfer application built as part of the Ravenpay Backend Engineer assessment. The project includes user authentication, virtual account generation, webhook handling for deposits, interbank transfers via Raven Atlas API, and transaction history retrieval.

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **Knex.js** – SQL query builder
- **MySQL** – relational database
- **JWT** – authentication
- **bcrypt** – password hashing
- **Dotenv** – environment variable management

---

## 📁 Features

- ✅ User Signup & Login with JWT authentication
- ✅ Generate unique virtual account via Raven Atlas API
- ✅ Handle deposit notifications using webhooks
- ✅ Send money to other banks (via Raven Atlas)
- ✅ Retrieve deposit, transfer, and transaction history
- ✅ RESTful API design with clean project structure
- ✅ Knex migrations for database schema
- ✅ Webhook tested using [webhook.site](https://webhook.site)
- ✅ API documented using Postman

---

## 📦 Project Structure
ravenpay-backend-assessment/
├── controllers/
├── routes/
├── models/
├── services/
├── migrations/
├── db/
│ └── connection.js
├── tests/
├── app.js
├── server.js
├── knexfile.js
├── .env.example
└── README.md



## 🚀 Getting Started

### 1. Clone the Repository

git clone https://github.com/LeaderSteve84/ravenpay-backend-assessment.git
cd ravenpay-backend-assessment

### 2. Install Dependencies
npm install

### 3. Configure Environment Variables
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=ravenpay_db

JWT_SECRET=your_jwt_secret
RAVEN_API_KEY=your_raven_api_key


### 4. Set Up the Database
Make sure your MySQL server is running and run:
npx knex migrate:latest

### 5. Run the Application
npm start

### 🧪 Running Tests
npm test

### 📮 API Documentation
All API endpoints are documented in Postman.
🔗 Postman Collection: Click here to view

### 🧾 Important Notes
Webhooks are tested using webhook.site
Transfers are tested with max amount 100 NGN, per Ravenpay instructions
This application integrates with the official Raven Atlas API

### 📌 Author
Stephen Adah
GitHub: @LeaderSteve84

### 📄 License
This project is licensed for educational purposes as part of a technical assessment.
