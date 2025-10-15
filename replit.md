# Julethi Boutique - E-Commerce Application

## Overview
A modern React-based e-commerce platform for a boutique specializing in bridal, fusion, and occasion wear. The application features a product catalog, admin dashboard, and shopping experience.

## Project Architecture

### Frontend Stack
- **Framework**: React 18.3.1 with Vite 5.4.2
- **UI Styling**: Tailwind CSS with Framer Motion for animations
- **State Management**: Redux with Redux Thunk
- **Routing**: React Router DOM v7
- **Icons**: Lucide React
- **Components**: Swiper for carousels

### Backend Configuration
- **Original Design**: AWS DynamoDB with Lambda functions
- **Database**: AWS DynamoDB (setup guide included)
- **API**: AWS API Gateway endpoints (requires configuration)
- **Alternative**: Supabase client library installed

### Current Setup
- Frontend runs on port 5000
- Products are currently using local Redux state (initial mock data)
- Admin authentication is hardcoded (username: admin, password: admin123)
- API service layer ready for integration with backend

## Project Structure

```
src/
├── components/
│   ├── admin/           # Admin dashboard components
│   ├── Footer.jsx       # Site footer
│   ├── Navbar.jsx       # Navigation bar
│   ├── ProductCard.jsx  # Product display card
│   └── WhatsAppButton.jsx
├── pages/
│   ├── AdminDashboard.jsx  # Admin panel
│   ├── Home.jsx           # Landing page
│   ├── Shop.jsx           # Product catalog
│   ├── BridalWear.jsx     # Category page
│   ├── FusionWear.jsx     # Category page
│   ├── OccasionWear.jsx   # Category page
│   ├── ProductDetail.jsx  # Product details
│   ├── Login.jsx          # Admin login
│   ├── About.jsx          # About page
│   └── Contact.jsx        # Contact page
├── redux/
│   ├── actions/         # Redux actions
│   ├── reducers/        # Redux reducers
│   └── store.js         # Redux store configuration
├── services/
│   └── api.js           # API service layer
└── utils/
    └── productIdGenerator.js
```

## Features

### Customer Features
- Browse products by category (Bridal, Fusion, Occasion wear)
- View product details (name, price, fabric, description)
- Filter new arrivals
- Search products
- Responsive design

### Admin Features
- Secure login (currently hardcoded)
- Dashboard with statistics
- Add/Edit/Delete products
- Product management with category-based ID generation

## Product Categories
- **Bridal**: Wedding and bridal wear (ID prefix: BR)
- **Fusion**: Indo-western and contemporary designs (ID prefix: FS)
- **Occasion**: Party and festive wear (ID prefix: OC)

## Environment Setup

### Required Environment Variables (for AWS Backend)
```
REACT_APP_API_BASE_URL=<your-api-gateway-url>
```

### AWS Setup
See `AWS_SETUP_GUIDE.md` for complete DynamoDB and Lambda setup instructions.
See `databaseArch.txt` for database schema and access patterns.
See `lambda-functions.js` for Lambda function implementations.

## Local Development
The application runs on Replit with Vite dev server on port 5000.

### Admin Credentials (Demo)
- Username: `admin`
- Password: `admin123`

## Recent Changes (October 15, 2025)
- Configured Vite for Replit environment (0.0.0.0:5000, HMR with WSS protocol)
- Set up development workflow on port 5000
- Configured HMR to use REPLIT_DEV_DOMAIN for proper WebSocket connection
- Configured deployment settings (autoscale with build and preview)
- Project successfully running in Replit with full hot module replacement

## Next Steps
1. Connect to backend API (AWS or Supabase)
2. Implement environment variables for API endpoints
3. Replace hardcoded authentication with real API integration
4. Set up image storage (AWS S3 or similar)
5. Configure deployment settings

## Notes
- The application is currently frontend-only with mock data
- Backend infrastructure diagrams and Lambda functions are included for AWS deployment
- Supabase client is installed as an alternative to AWS services
