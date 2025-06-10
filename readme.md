# Test Knowledge REST API

A RESTful API built with Node.js, Express, TypeScript, and MySQL/MariaDB to manage products, orders, notifications, and customer reports. The API supports authentication, product synchronization with an external source, scheduled notifications, and transactional order creation.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Testing with Postman](#testing-with-postman)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Features
- **Authentication**: Login with email/password or Google OAuth to obtain JWT tokens.
- **Product Management**: Create products with unique codes (e.g., `PROD-011`) and sync products from an external API (Fake Store API for testing).
- **Order Processing**: Create orders with transactional support, updating product stock atomically.
- **Scheduled Notifications**: Schedule notifications for future delivery.
- **Customer Reports**: Retrieve top 10 customers by total purchase amount.
- **Secure**: JWT-based authentication for protected endpoints.
- **Type-Safe**: Built with TypeScript for robust type checking.
- **Database**: MySQL/MariaDB with table locking to prevent race conditions in code generation.

## Prerequisites
- **Node.js**: Version 18.x or higher.
- **MySQL/MariaDB**: Version 10.x or higher.
- **Postman**: For testing API endpoints (optional but recommended).
- **Git**: For cloning or managing the repository (optional).

## Installation
1. **Clone or Extract the Project**:
   - If using a `.zip` file, extract it:
     ```bash
     unzip backend-test-api.zip -d backend-test-api
     cd backend-test-api
     ```
   - Or clone from a repository (if hosted):
     ```bash
     git clone <repository-url>
     cd backend-test-api
     ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

## Database Setup
1. **Create Database**:
   - Log in to MySQL/MariaDB:
     ```bash
     mysql -u root -p
     ```
   - Create the database:
     ```sql
     CREATE DATABASE test_knitto;
     ```

2. **Initialize Tables and Data**:
   - Run the provided `init.sql` script to create tables (`users`, `products`, `customers`, `orders`, `order_details`, `notifications`):
     ```bash
     mysql -u root -p test_knitto < init.sql
     ```
   - Add a test user for authentication:
     ```sql
     INSERT INTO users (email, password, name) VALUES ('test@example.com', 'password', 'Test User');
     ```
   - Add test data for orders:
     ```sql
     INSERT INTO customers (customer_id, customer_name) VALUES (1, 'John Doe');
     INSERT INTO products (id, product_code, nama_produk, harga_jual, stock) VALUES (1, 'PROD-001', 'Combed 30s', 5500, 100);
     ```

## Environment Variables
1. **Create a `.env` file** in the project root:
   ```bash
   touch .env
   ```
2. **Add the following variables**:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=test_knitto
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```
   - Replace `your_password` with your MySQL/MariaDB password.
   - Set `your_jwt_secret` to a secure string (e.g., `mySecretKey123`).

## Running the Server
1. **Build the Project**:
   - Compile TypeScript to JavaScript:
     ```bash
     npm run build
     ```

2. **Start the Server**:
   - Production mode:
     ```bash
     npm start
     ```
   - Development mode (with auto-reload):
     ```bash
     npm run dev
     ```

3. **Verify**:
   - The server should run on `http://localhost:3000`.
   - Check the console for messages like `Server is running on port 3000`.

## API Endpoints
| Method | Endpoint                     | Description                              | Authentication Required |
|--------|------------------------------|------------------------------------------|------------------------|
| POST   | `/api/auth/login/email`      | Login with email and password            | No                     |
| POST   | `/api/auth/login/google`     | Login with Google OAuth token            | No                     |
| POST   | `/api/products`              | Create a product with unique code        | Yes (JWT)              |
| POST   | `/api/sync-products`         | Sync products from Fake Store API        | Yes (JWT)              |
| POST   | `/api/schedule`              | Schedule a notification                  | Yes (JWT)              |
| POST   | `/api/orders`                | Create an order with products            | Yes (JWT)              |
| GET    | `/api/top-customers`         | Get top 10 customers by purchase amount  | Yes (JWT)              |

## Testing with Postman
1. **Import Collection**:
   - Import `backend_test_api.postman_collection.json` into Postman:
     - Open Postman, click **Import**, select the file.
   - The collection includes all endpoints with pre-configured headers and bodies.

2. **Set Variables**:
   - Set `base_url` to `http://localhost:3000` in Postman’s collection variables.
   - After running `POST /api/auth/login/email`, copy the `token` from the response and set it as the `token` variable.

3. **Test Endpoints**:
   - Start with `POST /api/auth/login/email`:
     ```json
     {
       "email": "test@example.com",
       "password": "password"
     }
     ```
   - Use the returned `token` for other endpoints (e.g., `POST /api/orders`).
   - Example `POST /api/orders` body:
     ```json
     {
       "customer_id": 1,
       "products": [{"product_id": 1, "quantity": 2}]
     }
     ```

4. **Verify Results**:
   - Check the database after testing (e.g., `SELECT * FROM orders;`).

## Project Structure
```
backend-test-api/
├── src/
│   ├── config/
│   │   └── dbConfig.ts          # Database connection setup
│   ├── controllers/
│   │   ├── authController.ts    # Authentication endpoints
│   │   ├── dataController.ts    # Product creation
│   │   ├── integrationController.ts # External API sync
│   │   ├── reportController.ts  # Customer reports
│   │   ├── scheduleController.ts # Notification scheduling
│   │   ├── transactionController.ts # Order transactions
│   ├── middleware/
│   │   └── authMiddleware.ts    # JWT authentication
│   ├── routes/
│   │   └── index.ts             # API routes
│   ├── services/
│   │   ├── dbService.ts         # Database operations
│   │   ├── externalApiService.ts # External API integration
│   ├── types/
│   │   ├── authTypes.ts         # Auth-related types
│   │   ├── dataTypes.ts         # Data-related types
│   ├── utils/
│   │   ├── generateCode.ts      # Unique code generation
│   │   ├── jwtUtil.ts           # JWT utilities
│   ├── app.ts                   # Express app setup
│   ├── server.ts                # Server entry point
├── .env                         # Environment variables
├── init.sql                     # Database schema and initial data
├── package.json                 # Project dependencies
├── tsconfig.json                # TypeScript configuration
├── backend_test_api.postman_collection.json # Postman collection
```

## Dependencies
- **Runtime**:
  - `express`: Web framework.
  - `mysql2`: MySQL/MariaDB driver.
  - `jsonwebtoken`: JWT authentication.
  - `axios`: HTTP client for external API calls.
  - `dotenv`: Environment variable management.
- **Development**:
  - `typescript`: TypeScript compiler.
  - `ts-node-dev`: Development server with auto-reload.
  - `@types/*`: TypeScript type definitions.

See `package.json` for the full list.

## Troubleshooting
- **Database Connection Error**:
  - Verify `.env` variables (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`).
  - Ensure MySQL/MariaDB is running and accessible.
- **SQL Syntax Error**:
  - Confirm `init.sql` has been executed to create tables.
  - Check for missing columns (e.g., `product_code` in `products`).
- **JWT Authentication Error**:
  - Ensure `Authorization: Bearer <token>` header is set in requests.
  - Verify `JWT_SECRET` in `.env` matches the server configuration.
- **External API Sync Failure**:
  - The `POST /api/sync-products` endpoint uses Fake Store API (`https://fakeapi.platzi.com/en/rest/products`).
  - If the API is unreachable, modify `externalApiService.ts` to return dummy data:
    ```typescript
    export const fetchExternalProducts = async () => {
      return [{ title: 'Combed 30s', price: 5500 }, { title: 'Combed 24s', price: 8000 }];
    };
    ```
- **Order Creation Error**:
  - Ensure `customer_id` and `product_id` exist in the `customers` and `products` tables.
  - Verify sufficient stock in `products` before creating orders.

For further issues, check server logs or consult the documentation.

## License
This project is licensed under the MIT License.