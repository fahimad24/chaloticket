# Chaloticket

## Project Overview

Chaloticket is a modern event ticketing and management application built with **Next.js**, **React**, and **Tailwind CSS**. It supports authentication, role-based dashboards for admins, vendors, and users, ticket browsing, secure Stripe checkout, and data-driven analytics.

## Description

This project is designed to help users discover events and book tickets online while giving admins and vendors control over listings and orders. The application includes responsive UI components, search and filtering, booking history, and live dashboard metrics.

## Key Features

- User authentication with signup and login flow
- Role-based dashboard for Admin, Vendor, and User
- Ticket listing and details pages for event discovery
- Search and filter functionality for tickets
- Stripe payment integration for checkout
- Booking history and reservation management
- Admin tools for managing users, tickets, and bookings
- Analytics charts and metrics for revenue, sales, and user activity
- Profile editing and user account management
- Responsive layout and modern UI design

## Technology Stack

- Next.js 16
- React 19
- Tailwind CSS v4
- Stripe (`@stripe/stripe-js`, `stripe`)
- MongoDB (`mongodb`)
- Recharts for data visualization
- Radix UI and Shadcn UI components
- Next Themes for theme switching
- Sonner for toast notifications
- Better-auth for authentication utilities

## Project Structure

- `src/app/` — main pages and nested layouts
- `src/components/` — reusable UI components, tables, charts, modals, and forms
- `src/lib/` — API utility files, auth helpers, Stripe helpers, and other helpers
- `src/api/` — API routes for authentication, checkout sessions, and revalidation
- `public/` — static assets and shared images

## Review

Chaloticket is a well-structured event management platform that demonstrates strong use of Next.js conventions and component-driven design. The separation between frontend pages, reusable components, and API routes makes the codebase maintainable and scalable. The integration with Stripe and MongoDB adds real-world functionality for payment and data persistence.

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Run the development server:
   ```bash
   pnpm dev
   ```
3. Open the app in your browser at `http://localhost:3000`

## Notes

- Ensure your environment variables for MongoDB and Stripe are configured before running the app.
- The backend folder `chaloticke-backend/` appears to contain supporting server logic for authentication or API services.

## Improvements

- Add better role-based access control and permissions checks
- Add server-side rendering or static generation for ticket pages
- Improve error handling for checkout and API operations
- Add more detailed documentation for environment setup and deployment
