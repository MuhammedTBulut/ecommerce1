# Modern E-commerce Frontend Template

A modern, responsive e-commerce frontend template built with React 18+ and Tailwind CSS, designed to integrate seamlessly with the existing C# .NET API.

## 🚀 Features

- **Modern Tech Stack**: React 18+ with modern hooks and Context API
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Authentication**: JWT-based authentication with login/register
- **State Management**: Context API for auth and cart management
- **API Integration**: Seamless integration with existing .NET API
- **Modern UI**: Clean, modern components and layouts
- **Performance**: Optimized build with Vite
- **Accessibility**: WCAG compliant components

## 🛠 Tech Stack

- **Frontend**: React 18+, JavaScript/JSX
- **Styling**: Tailwind CSS, Inter font
- **Routing**: React Router Dom
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Reusable components
│   ├── layout/          # Layout components (Header, Footer, Layout)
│   └── ui/              # Basic UI components (Button, Input, Loading)
├── pages/               # Page components
├── services/            # API service layer
├── context/             # React Context providers
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
└── styles/              # Additional styles
```

## 🚦 Getting Started

### Prerequisites

- Node.js 16+ and npm
- .NET 8 API running (for backend integration)

### Installation

1. **Install dependencies**:
   ```bash
   cd modern-ecommerce-template
   npm install
   ```

2. **Environment Configuration**:
   Copy `.env.example` to `.env` and configure your API URL:
   ```env
   VITE_API_URL=https://localhost:7101/api
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 🔗 API Integration

The template is designed to work with the existing C# .NET API endpoints:

- **Authentication**: `/api/Auth/login`, `/api/Auth/register`
- **Products**: `/api/Products` (public), `/api/admin/products` (admin)
- **Cart**: `/api/Cart` with full CRUD operations
- **Orders**: `/api/Orders` for order management
- **Categories**: `/api/Categories` (cached for performance)
- **Users**: `/api/User/me`, `/api/admin/users` (admin)

## 📱 Pages & Features

### Customer Pages
- **Home Page**: Hero section, featured products, categories
- **Product Listing**: Search, filter, sort functionality
- **Product Detail**: Product info, add to cart, reviews
- **Shopping Cart**: Cart management, quantity updates
- **Authentication**: Login and registration forms
- **User Profile**: Account info, order history

### Admin Pages (Coming Soon)
- **Admin Dashboard**: Sales overview, analytics
- **Product Management**: CRUD operations for products
- **Order Management**: Order status updates, tracking
- **User Management**: Customer account management

## 🎨 Styling & Theming

The template uses Tailwind CSS with a custom color palette:

- **Primary**: Blue shades for main actions and branding
- **Gray**: Various shades for text and backgrounds
- **Success/Error**: Standard colors for feedback states

### Custom Components
- **Button**: Multiple variants (primary, secondary, outline, ghost)
- **Input**: Form inputs with validation states
- **Loading**: Spinners and loading states
- **Layout**: Responsive header, footer, and main layout

## 🔒 Authentication

JWT-based authentication with:
- Automatic token management
- Route protection
- Role-based access control
- Persistent login sessions

## 🛒 Shopping Cart

Real-time cart management:
- Add/remove items
- Quantity updates
- Total calculations
- Cart persistence

## 📦 State Management

Uses React Context API for:
- **AuthContext**: User authentication state
- **CartContext**: Shopping cart state
- Centralized error handling
- Loading states

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

- Modern React patterns with hooks
- Functional components
- Clean, readable code structure
- Consistent naming conventions

## 🚀 Deployment

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure your web server to serve the React app
4. Update API URLs for production environment

## 🤝 Integration with Backend

Ensure your .NET API has:
- CORS configured for the frontend domain
- JWT authentication properly set up
- All required endpoints implemented
- Proper error handling and responses

## 📄 License

This project is part of the ecommerce1 repository and follows the same licensing terms.

## 🙋‍♂️ Support

For issues or questions:
1. Check the existing API documentation
2. Verify environment configuration
3. Check browser console for errors
4. Ensure backend API is running

---

Built with ❤️ using React and Tailwind CSS
