# Book Share Client

A modern book sharing platform built with Next.js 15, featuring user authentication, product management, and a responsive dashboard interface.

## Overview

Book Share Client is a full-stack web application that enables users to share and manage books. The platform includes user authentication via Clerk, a dashboard for managing content, and product listings with image support through Cloudinary.

## Tech Stack

- **Framework**: Next.js 15.5.6 (App Router)
- **React**: 19.1.0
- **TypeScript**: 5.x
- **Authentication**: Clerk
- **Styling**: Tailwind CSS 4.x
- **Icons**: Lucide React
- **Build Tool**: Turbopack

## Features

- 🔐 User authentication and authorization (Clerk)
- 📚 Product/Book management system
- 📊 User dashboard
- 🎨 Responsive UI with Tailwind CSS
- 🖼️ Image hosting via Cloudinary
- 🔒 Protected routes with middleware
- ⚡ Fast development with Turbopack

## Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun
- A Clerk account for authentication
- Backend API running (default: http://localhost:5000)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=''
CLERK_SECRET_KEY=''

# Clerk Routes
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Backend API
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

# Environment
NEXT_PUBLIC_ENVIRONMENT=development
```

### Getting Clerk Credentials

1. Sign up at [Clerk.com](https://clerk.com)
2. Create a new application
3. Copy your publishable key and secret key from the API Keys section
4. Paste them into your `.env` file

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd book-share-client
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Then edit `.env` with your actual credentials.

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
book-share-client/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Dashboard pages
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   ├── products/         # Product pages
│   ├── skeletons/        # Loading skeletons
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/            # Reusable components
│   ├── ui/               # UI components
│   └── passwordRequirement.tsx
├── lib/                   # Utility functions
│   └── hooks/            # Custom React hooks
├── types/                 # TypeScript type definitions
│   ├── dashboard.ts
│   └── product.ts
├── public/               # Static assets
├── middleware.ts         # Route protection middleware
└── next.config.ts        # Next.js configuration
```

## Authentication

The application uses Clerk for authentication with the following routes:

- **Public Routes**: `/`, `/login`, `/register`
- **Protected Routes**: `/dashboard`, `/products` (requires authentication)

Middleware automatically redirects unauthenticated users to the login page when accessing protected routes.

## Image Configuration

The application is configured to support images from Cloudinary. Images are optimized through Next.js Image component.

## Development

The project uses:
- **Turbopack** for faster builds and hot module replacement
- **TypeScript** for type safety
- **ESLint** for code quality
- **Tailwind CSS 4** for styling

## Deployment

### Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## License

This project is private and proprietary.
