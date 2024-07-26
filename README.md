﻿# Expense Tracker

Expense Tracker is a simple web application to track your expenses. This application allows users to register, log in, manage categories, and add, update, delete, and view expenses.

## Features

- User authentication (register and login)
- Manage expense categories
- Track expenses
- View, update, and delete individual expenses
- View and update user details

## API Endpoints

### Authentication

- `POST /api/v1/auth/login`: Log in a user.
- `POST /api/v1/auth/register`: Register a new user.

### Category Management

- `GET /api/v1/category/`: Get all categories.
- `POST /api/v1/category/`: Add a new category.

### Expense Management

- `POST /api/v1/expense/`: Add a new expense.
- `GET /api/v1/expense/`: Get all expenses.
- `GET /api/v1/expense/:id`: Get one expense.
- `DELETE /api/v1/expense/:id`: Delete one expense.
- `PUT /api/v1/expense/:id`: Update an expense.

### User Management

- `GET /api/v1/user/:id`: Get user details.
- `PUT /api/v1/user/:id`: Update user details.

## Packages Used

- **bcrypt**: A library to help you hash passwords.
- **dotenv**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.
- **express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **jsonwebtoken**: A library to sign and verify JSON Web Tokens (JWTs).
- **mongoose**: A MongoDB object modeling tool designed to work in an asynchronous environment.

### Dev Dependencies

- **nodemon**: A tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/expense-tracker.git
   cd expense-tracker
   ```

2. Install the dependencies:

   ```bash
   npm install

   ```

3. Create a .env file in the root directory and add the following environment variables using the `.env.sample` file

# Running the Application

Start the server in development mode:

```bash
npm run dev
```

- Register a new user using the `/api/v1/auth/register` endpoint.
- Log in with your registered credentials using the `/api/v1/auth/login` endpoint to obtain a token.
- Use the token to authenticate subsequent requests to manage categories and expenses.

