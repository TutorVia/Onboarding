# LearnSphere - Product Requirements Document

## Original Problem Statement
Build an educational online one-to-one tutoring platform website. Public-facing landing page with demo booking popup, visitor tracking, and admin panel for managing bookings. No auth, payments, or video integration for MVP.

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Shadcn/UI components
- **Backend**: FastAPI (Python) with Motor (async MongoDB driver)
- **Database**: MongoDB
- **Hosting**: Kubernetes container with supervisor-managed services

## User Personas
1. **Students** (K-12, college, competitive exams) - Need personalized tutoring
2. **Parents** - Seeking reliable tutors for children
3. **Teachers** - Platform to connect with students (future phase)

## Core Requirements
- Beautiful public landing page with multiple sections
- Demo booking form with validation (name, email, phone, grade, subject, date)
- Visitor tracking (session-based, come and go)
- Admin panel to view bookings and visitor stats

## What's Been Implemented (Feb 21, 2026)
### Backend (server.py)
- POST /api/demo-bookings - Create demo booking
- GET /api/demo-bookings - List all bookings
- DELETE /api/demo-bookings/{id} - Delete booking
- PATCH /api/demo-bookings/{id}/status - Update booking status
- POST /api/visitors/track - Track visitor events (visit/leave)
- GET /api/admin/stats - Get dashboard statistics

### Frontend
- **Landing Page** with 8 sections: Hero, Subjects, How It Works, Teachers, Testimonials, FAQ, CTA, Footer
- **Demo Modal** - Shadcn Dialog with form validation (Zod + react-hook-form), calendar date picker, select dropdowns
- **Auto-popup** after 8 seconds for new visitors
- **Admin Dashboard** at /admin with stats cards + bookings table + delete functionality
- **Visitor Tracking** - Auto tracks page visits and leaves via session ID
- **Scroll Navigation** - Smooth scrolling to sections from navbar
- **Responsive Design** - Mobile-friendly with hamburger menu

### Design
- Theme: "Organic Growth" - Warm Paper bg (#F9F8F6), Deep Teal (#2F5D62), Burnt Orange (#DF7861)
- Fonts: Outfit (headings), DM Sans (body), Caveat (accents)
- Glass-morphism floating cards, decorative blobs, stagger animations

## Test Results
- Backend: 100% (8/8 tests passed)
- Frontend: 90% (minor auto-popup overlay noted as expected behavior)

## Prioritized Backlog

### P0 - Completed (MVP)
- [x] Landing page with all sections
- [x] Demo booking popup with validation
- [x] Admin panel for bookings
- [x] Visitor tracking

### P1 - Next Phase
- [ ] Email notifications for new demo bookings (Resend/SendGrid)
- [ ] User authentication (JWT or Google OAuth)
- [ ] Teacher profiles with real data
- [ ] Student dashboard

### P2 - Future
- [ ] Payment integration (Stripe)
- [ ] Live video lesson scheduling
- [ ] Content delivery (PDF uploads, notes)
- [ ] Booking calendar with availability management
- [ ] Ratings & reviews
- [ ] Analytics dashboard with charts
- [ ] SEO optimization
- [ ] Progressive Web App support
