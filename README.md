# SMS Backend

This is the backend for the School Management System (SMS), built with Node.js, Express, and MongoDB.

## Features

-   **Authentication**: JWT-based authentication for Admins, Teachers, and Students.
-   **Role-Based Access Control (RBAC)**: Secure endpoints based on user roles.
-   **Modules**:
    -   Attendance Management
    -   Quiz & Assessment System
    -   Messaging & Notifications
    -   User Management (Students, Teachers, Admins)
-   **API**: RESTful API for mobile and web clients.

## Prerequisites

-   Node.js (LTS version recommended)
-   MongoDB (Local running instance or MongoDB Atlas Connection String)
-   npm or yarn

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/AbhishekBorpa/SMS.git
    cd SMS
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment Variables:
    -   Create a `.env` file in the root directory.
    -   Add the following variables:
        ```env
        PORT=5002
        MONGODB_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret_key
        ```

## Running the Server

### Development Mode
Runs the server with `nodemon` for auto-reloading.

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

## API Documentation

-   **Base URL**: `http://localhost:5002/api`
-   **Endpoints**: See `backend_routes.txt` for a list of available routes.

## Related Repositories

-   **Mobile App**: [SMS-MOBILE](https://github.com/AbhishekBorpa/SMS-MOBILE)
-   **Web App**: [SMS-WEB](https://github.com/AbhishekBorpa/SMS-WEB)
