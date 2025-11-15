# FeelWellFurniture

A modern, responsive furniture e-commerce website built with React, featuring dark/light theme support, product catalog, and smooth animations.

## Features

- 🛋️ **Product Catalog** - Browse furniture collections with category filtering
- 🎨 **Dark/Light Theme** - Toggle between light and dark modes
- 📱 **Responsive Design** - Mobile-friendly interface
- 🎭 **Smooth Animations** - Page transitions powered by Framer Motion
- 🛍️ **Product Details** - Detailed product pages with image galleries
- ⭐ **Customer Reviews** - Testimonials and reviews section
- 📧 **Contact Form** - Contact page with business information

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 14.0 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/daanniill/feelwellfurniture
cd feelwellfurniture
```

### Step 2: Install Dependencies

Install all required dependencies using npm:

```bash
npm install
```

This will install all the dependencies listed in `package.json`.

## Dependencies

### Core Dependencies

- **react** (^19.2.0) - React library for building user interfaces
- **react-dom** (^19.2.0) - React DOM renderer
- **react-router-dom** (^6.30.1) - Routing library for React applications
- **react-scripts** (^5.0.1) - Create React App scripts and configuration

### UI & Styling

- **tailwindcss** (^3.4.18) - Utility-first CSS framework
- **autoprefixer** (^10.4.21) - PostCSS plugin for adding vendor prefixes
- **framer-motion** (^12.23.24) - Animation library for React
- **lucide-react** (^0.552.0) - Icon library for React

### Development Dependencies

- **@testing-library/react** (^16.3.0) - Testing utilities for React
- **@testing-library/jest-dom** (^6.9.1) - Custom Jest matchers
- **@testing-library/user-event** (^13.5.0) - User event simulation
- **@testing-library/dom** (^10.4.1) - DOM testing utilities
- **web-vitals** (^2.1.4) - Web performance metrics

## Getting Started

### Step 3: Start the Development Server

Run the following command to start the development server:

```bash
npm start
```

The application will open in your browser at [http://localhost:3000](http://localhost:3000).

The page will automatically reload if you make changes to the code.

### Step 4: Build for Production

To create an optimized production build:

```bash
npm run build
```

This creates a `build` folder with optimized production files ready for deployment.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder. The build is optimized and minified for best performance.

### `npm run eject`

**Note: This is a one-way operation. Once you eject, you can't go back!**

Ejects from Create React App, giving you full control over the configuration files.

## Project Structure

```
feelwell-furniture/
├── public/                 # Static files
├── src/
│   ├── assets/            # Images and other assets
│   ├── components/        # Reusable React components
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx
│   │   ├── Navbar.jsx
│   │   └── FeaturedCollection.jsx
│   ├── data/              # Data files
│   │   └── products.js
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── Collection.jsx
│   │   ├── Product.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── Reviews.jsx
│   ├── App.js             # Main app component
│   ├── index.js           # Entry point
│   └── index.css          # Global styles
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── package.json           # Project dependencies
```

## Features Overview

- **Home Page**: Hero section with call-to-action buttons and featured products
- **Collection Page**: Browse all products with category filtering (All, Beds, Sofas)
- **Product Pages**: Detailed product information with image galleries
- **Reviews Page**: Customer testimonials and reviews
- **Contact Page**: Contact form and business information
- **About Page**: Company information and story

## Theme Support

The application supports both light and dark themes. Users can toggle between themes using the moon/sun icon in the navigation bar. The theme preference is saved to localStorage.

## Browser Support

The application is tested and works on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, you can specify a different port:

```bash
PORT=3001 npm start
```

### Module Not Found Errors

If you encounter module not found errors, try:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

Clear the cache and rebuild:

```bash
npm cache clean --force
rm -rf node_modules
npm install
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and proprietary.

---

Built with ❤️ using React and Tailwind CSS
