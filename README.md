# Expense Tracker

Expense Tracker is a user-friendly web application designed to help you efficiently manage your finances. With this application, users can easily register and log in, organize their expenses and incomes by categories, and perform a range of actions such as adding, updating, deleting, and viewing transactions. Additionally, it provides a comprehensive overview of your financial balance, allowing you to keep track of all your transactions in one place.

## Features

- User authentication (register and login / login with OTP)
- Manage expense categories
- Track expenses
- Track incomes
- View balance and all transactions
- View, update, and delete individual expenses and incomes
- View and update user details

## API Endpoints

### Authentication

- `POST /api/v1/auth/login`: Log in a user.
- `POST /api/v1/auth/register`: Register a new user.
- `POST /api/v1/auth/generateOTP`: Generate OTP for User Login.
- `POST /api/v1/auth/confirmOTP`: Confirm OTP for User Login.

### Category Management

- `GET /api/v1/category/`: Get all categories.
- `POST /api/v1/category/`: Add a new category.

### Expense Management

- `POST /api/v1/expense/`: Add a new expense.
- `GET /api/v1/expense/`: Get all expenses.
- `GET /api/v1/expense/:id`: Get one expense with provided ID.
- `DELETE /api/v1/expense/:id`: Delete one expense.
- `PUT /api/v1/expense/:id`: Update an expense.

### Income Management

- `POST /api/v1/income/`: Add a new income.
- `GET /api/v1/income/`: Get all incomes.
- `GET /api/v1/income/:id`: Get one income with provided ID.
- `DELETE /api/v1/income/:id`: Delete one expense with provided ID.
- `PUT /api/v1/income/:id`: Update an expense with provided ID.

### User Management

- `GET /api/v1/user/:id`: Get user details.
- `PUT /api/v1/user/:id`: Update user password.

### Balance Management

- `GET /api/v1/balance/`: Get user balance.(total income - total expense)
- `GET /api/v1/balance/transactions`: Get all transactions of user.

## Packages Used

- **bcrypt**: A library to help you hash passwords.
- **dotenv**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.
- **express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **jsonwebtoken**: A library to sign and verify JSON Web Tokens (JWTs).
- **mongoose**: A MongoDB object modeling tool designed to work in an asynchronous environment.
- **nodemailer**: A Node.js module for sending emails using SMTP with support for various email services and authentication methods.
- **otp-generator-random**: A lightweight package for generating random one-time passwords (OTPs) with customizable options.
- **crypto**: A built-in Node.js module providing cryptographic functionality, including hashing, encryption, and generating secure random values. Used to create acess & refresh token.

### Dev Dependencies

- **nodemon**: A tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
   
   ```bash
   git clone https://github.com/Syed-Sarkheel/Expense-Tracker-Backend
   cd Expense-Tracker-Backend
   ```

2. Install the dependencies:
   
   ```bash
   npm install
   ```

3. Create a .env file in the root directory and add the following environment variables using the `.env.sample` file.

4. Create an **App Password** from https://myaccount.google.com/security and paste it in `MAIL_PASS` at `.env` and enter your mail id at `MAIL_USER`.

5. Create your own `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` by running `secrets.js`.

# Running the Application

Start the server in development mode:

```bash
npm run dev
```

- Register a new user using the `/api/v1/auth/register` endpoint.
- Log in with your registered credentials using the `/api/v1/auth/login` endpoint to obtain a token.
- Use the token to authenticate subsequent requests to manage categories and expenses.



---

**Syed Sarkheel Baseer**


