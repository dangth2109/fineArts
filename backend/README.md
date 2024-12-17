# Fine Arts Institute API

Backend server for the Fine Arts Institute management system.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Setup & Installation

1. Clone the repository and navigate to the backend folder:
```bash
cd backend
```
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the root directory with the following variables: 
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/fine_arts_db
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```
**Note**: A `.env` file has been created in the root directory with demo values
## Running the Server

### Development Mode:
```bash
npm run dev
```

### Seeding Data
To populate the database with initial test data:
```bash
npm run seed
```

## Demo Accounts

The following accounts are created when running the seed script (`npm run seed`):

### Admin Account
{
"username": "admin",
"email": "admin@example.com",
"password": "123456",
"role": "admin"
}

### Staff Account
{
"username": "staff",
"email": "staff@example.com",
"password": "123456",
"role": "staff"
}

### Student Account
{
"username": "student",
"email": "student@example.com",
"password": "123456",
"role": "student"
}


## API Documentation

The API documentation is available through Swagger UI at: ```http://localhost:3000/api-docs```
## Project Structure
- config/ - Configuration files
- controllers/ - Request handlers
- middleware/ - Custom middleware
- models/ - Database models
- routes/ - API routes
- uploads/ - File upload directory
- .env - Environment variables
- app.js - Application entry point
- seedData.js - Database seeding script
- swagger.js - API documentation config


## Available APIs

- Auth Routes (`/api/auth`)
  - POST /register
  - POST /login
  - GET /me

- User Routes (`/api/users`)
  - GET /
  - GET /:id
  - PUT /:id
  - DELETE /:id
  - GET /students
  - GET /staff

- Competition Routes (`/api/competitions`)
  - POST /
  - GET /
  - GET /:id
  - PUT /:id
  - DELETE /:id

- Submission Routes (`/api/submissions`)
  - POST /
  - GET /
  - PUT /:id/evaluate

- Exhibition Routes (`/api/exhibitions`)
  - POST /
  - GET /
  - GET /:id
  - PUT /:id
  - DELETE /:id
  - POST /:id/submissions
  - PUT /:exhibitionId/submissions/:submissionId

- Award Routes (`/api/awards`)
  - POST /
  - GET /
  - GET /:id
  - PUT /:id
  - DELETE /:id

## Authentication

The API uses JWT for authentication. Include the token in the Authorization header:
```Authorization: Bearer <your_token>```


## Role-Based Access

The system supports four user roles:
- admin
- staff
- student
- manager

Different endpoints require different role permissions.

## Error Handling

The API returns standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## File Upload

Image uploads are handled using Multer middleware with the following constraints:
- Maximum file size: 5MB
- Allowed formats: Image files only
- Files are stored in the `/uploads` directory


