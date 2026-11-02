# Tax Filing System - Complete Project

A comprehensive tax filing management system with client portal and admin panel, fully integrated with a professional backend API.

## Project Structure

```
taxfiling/
├── src/                    # Frontend (React)
│   ├── client/            # Client Portal
│   ├── admin/             # Admin Panel
│   ├── shared/            # Shared components
│   ├── App.jsx            # Unified routing
│   └── main.jsx           # Entry point
├── backend/               # Backend API (Node.js/Express)
│   ├── src/
│   │   ├── config/        # Configuration
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Custom middleware
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── utils/         # Utilities
│   │   └── server.js      # Server entry
│   └── package.json
├── package.json           # Frontend dependencies
└── README.md
```

## Features

### Client Portal
- OTP-based authentication
- Personal information management
- Document upload
- Schedule calls
- Tax filing status tracking
- Payments
- Referrals
- Support center

### Admin Panel
- User management (Registered, Verified, Unverified)
- Free to Call scheduling
- Document management
- Tax preparation
- Payment management
- Filing management
- Audit logs
- Support ticket management
- Coupon management
- Referral management
- Team and role management

### Backend API
- RESTful API architecture
- JWT authentication
- MongoDB database
- Role-based access control
- Email OTP verification
- File upload support
- Comprehensive error handling

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)

### Installation

1. **Install Frontend Dependencies:**
```bash
npm install
```

2. **Install Backend Dependencies:**
```bash
cd backend
npm install
```

3. **Setup Environment Variables:**
```bash
# Backend
cd backend
cp .env.example .env
# Edit .env with your configuration

# Frontend (optional)
# Create .env file with: VITE_API_URL=http://localhost:3001/api
```

4. **Start MongoDB:**
```bash
# If using local MongoDB
mongod
```

5. **Start Backend:**
```bash
cd backend
npm run dev
```

6. **Start Frontend:**
```bash
# In root directory
npm run dev
```

## Access Points

- **Client Portal**: http://localhost:3000/client/login
- **Admin Panel**: http://localhost:3000/admin/login
- **Backend API**: http://localhost:3001/api

## Documentation

- [Frontend README](./README.md) - Frontend setup and structure
- [Backend README](./backend/README.md) - Backend API documentation
- [Integration Guide](./INTEGRATION.md) - Frontend-backend integration
- [Environment Setup](./backend/ENV_SETUP.md) - Environment configuration

## Technology Stack

### Frontend
- React 18.2.0
- React Router DOM 6.20.0
- Vite 5.0.0
- Tailwind CSS 3.3.5
- Zustand (state management)
- React Query (data fetching)
- Axios (HTTP client)

### Backend
- Node.js
- Express.js 4.18.2
- MongoDB/Mongoose 8.0.3
- JWT (authentication)
- Nodemailer (email)
- Multer (file uploads)
- Bcrypt (password hashing)

## Development

### Frontend Development
```bash
npm run dev          # Run both portals
npm run dev:client   # Client portal only
npm run dev:admin    # Admin panel only
```

### Backend Development
```bash
cd backend
npm run dev          # Development with auto-reload
npm start            # Production mode
```

## Building for Production

### Frontend
```bash
npm run build        # Build both portals
npm run build:client # Build client portal
npm run build:admin  # Build admin panel
```

### Backend
```bash
cd backend
npm start
```

## API Endpoints

See [Backend README](./backend/README.md) for complete API documentation.

## Security

- JWT token authentication
- Password hashing with bcrypt
- CORS configuration
- Helmet security headers
- Input validation
- Role-based access control

## License

Private project
