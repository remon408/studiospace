# StudioSpace - Peer-to-Peer Creative Workspace & Production Studio Sharing Platform

## Overview
StudioSpace is a high-performance peer-to-peer marketplace designed for creators, filmmakers, photographers, podcasters, and musicians. Studio owners and hosts can list their creative spaces—ranging from photography cyc walls and cinema sound stages to podcast lounges, music recording suites, and art workshops. Fellow creators can discover, filter, inspect dynamic availability, and reserve studio slots with transparent pricing and real-time booking management.

## Features

### Client (Next.js 16 App Router)
- **Home Page**: Hero slider (Swiper.js), Featured Studios, Browse by Categories, How It Works, CTA section
- **Explore Studios**: Search, filter by category, sort by rating/price/newest
- **Studio Detail**: Image gallery, amenities, booking form, reviews
- **Authentication**: Login & Register with form validation
- **Dashboard**: Stats, recent bookings, quick actions
- **Profile & Settings**: User management
- **My Bookings & My Listings**: Reservation management
- **About & How It Works**: Informational pages with FAQ
- **Footer**: Branding, newsletter, social links (X logo)
- **Dark/Light Theme Toggle**
- **Modern Toast Notifications (Sonner)**
- **Responsive Design**

### Server (Express.js + MongoDB)
- JWT authentication
- CRUD for studios, bookings, reviews, wishlists
- Role-based authorization

## Tech Stack
- **Frontend**: Next.js 16, TypeScript, Tailwind CSS, Swiper.js, Sonner
- **Backend**: Express.js, MongoDB, Mongoose, JWT, bcryptjs

## Setup
```bash
# Install frontend
npm install

# Install server
cd server && npm install

# Run both (in separate terminals)
npm run dev        # Frontend: localhost:3000
cd server && npm run dev   # Backend: localhost:5000
```

## Test Credentials
Create a new account to explore the platform.

## Live Site
Demo available at Vercel deployment.
