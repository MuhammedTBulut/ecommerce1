# E-Commerce Platform with React Admin Dashboard

A complete e-commerce platform with .NET Core backend and React Admin dashboard for administration.

## Project Structure

```
ecommerce1/
├── ECommerce.API/              # Backend API (.NET Core)
├── ECommerce.Application/      # Application layer
├── ECommerce.Domain/          # Domain models
├── ECommerce.Infrastructure/  # Data layer
├── ecommerce-admin/          # React Admin dashboard
└── ecommerce-frontend-backup/ # Frontend (backup)
```

## Features

### Backend (.NET Core API)
- **Authentication & Authorization**: JWT-based with role management
- **Admin APIs**: Full CRUD operations for admin management
  - `/api/admin/users` - User management
  - `/api/admin/products` - Product management
  - `/api/admin/categories` - Category management
  - `/api/admin/orders` - Order management
- **Public APIs**: Customer-facing endpoints
- **Security**: Role-based access control, input validation
- **Database**: PostgreSQL with Entity Framework Core

### Admin Dashboard (React Admin)
- **Modern UI**: Material-UI based admin interface
- **User Management**: View, edit users and manage roles
- **Product Management**: Add, edit, delete products with categories
- **Category Management**: Manage product categories
- **Order Management**: View and update order statuses
- **Dashboard**: Statistics and overview
- **Authentication**: Secure admin login

## Getting Started

### Prerequisites
- .NET 8 SDK
- Node.js (v14+)
- PostgreSQL database

### Backend Setup

1. Navigate to the project root:
```bash
cd ecommerce1
```

2. Restore dependencies:
```bash
dotnet restore
```

3. Update database connection string in `ECommerce.API/appsettings.json`

4. Run the API:
```bash
dotnet run --project ECommerce.API
```

The API will be available at `http://localhost:5095`

### Admin Dashboard Setup

1. Navigate to admin directory:
```bash
cd ecommerce-admin
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The admin dashboard will be available at `http://localhost:3001`

### Admin Access

Use admin credentials to access the dashboard. Only users with "Admin" role can access the system.

## API Documentation

When the backend is running, visit `http://localhost:5095` for Swagger API documentation.

### Admin Endpoints

All admin endpoints require authentication with Admin role:

- **Users**: GET, POST, PUT, DELETE `/api/admin/users/{id?}`
- **Products**: GET, POST, PUT, DELETE `/api/admin/products/{id?}`
- **Categories**: GET, POST, PUT, DELETE `/api/admin/categories/{id?}`
- **Orders**: GET, PUT `/api/admin/orders/{id?}`

## Technology Stack

### Backend
- **.NET 8**: Modern C# framework
- **Entity Framework Core**: ORM for database operations
- **JWT Authentication**: Secure token-based auth
- **PostgreSQL**: Primary database
- **BCrypt**: Password hashing
- **Swagger**: API documentation

### Frontend (Admin)
- **React Admin**: Admin framework
- **Material-UI**: Component library
- **TypeScript**: Type safety
- **JWT**: Authentication handling
