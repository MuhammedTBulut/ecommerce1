# E-Commerce Admin Dashboard

This is a React Admin-based dashboard for managing the e-commerce platform.

## Features

- **User Management**: View, edit, and manage user accounts and roles
- **Product Management**: Add, edit, delete, and categorize products
- **Category Management**: Manage product categories
- **Order Management**: View and update order statuses
- **Admin Authentication**: Secure login with JWT tokens

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Backend API running on port 5095

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The admin dashboard will open at http://localhost:3001

### Login

Use admin credentials to access the dashboard. Only users with "Admin" role can access the system.

### API Endpoints

The admin dashboard communicates with these backend endpoints:

- `GET /api/admin/users` - List all users
- `GET /api/admin/products` - List all products  
- `GET /api/admin/categories` - List all categories
- `GET /api/admin/orders` - List all orders
- And full CRUD operations for each resource

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Technology Stack

- **React Admin**: Admin interface framework
- **Material-UI**: Component library
- **TypeScript**: Type safety (with relaxed mode for compatibility)
- **JWT Authentication**: Secure admin access

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
