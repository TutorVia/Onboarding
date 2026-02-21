# LearnSphere - Product Requirements Document

## Original Problem Statement
Build an educational online one-to-one tutoring platform website with public-facing pages, demo booking, visitor tracking, admin panel, email notifications, WhatsApp integration, chatbot, and multi-page architecture.

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Shadcn/UI + React Router
- **Backend**: FastAPI (Python) + Motor (async MongoDB) + Resend (email)
- **Database**: MongoDB

## What's Been Implemented (Feb 21, 2026)

### Phase 1 (MVP):
- Landing page with hero, subjects, how it works, testimonials, CTA
- Demo booking popup with form validation + auto-popup
- Admin panel with stats + bookings table
- Visitor tracking (come and go)

### Phase 2 (Current):
- **12 pages total**: Landing, Subjects, Subject Detail, Teachers, Teacher Detail, About, How It Works, FAQ, Terms, Privacy, Contact, Admin
- **Resend email notifications** on demo bookings (placeholder API key - user adds `RESEND_API_KEY` in backend/.env)
- **WhatsApp redirect link** after successful demo booking
- **FAQ-based chatbot** widget (keyword matching, no AI)
- **Subject Query Modal** for subject-specific inquiries
- **Contact page** with phone numbers (+91-7009201851, +91-9878035355)
- **Footer links** all navigate to real pages, Careers removed
- **Navbar** fixed dropdown transparency, uses React Router links
- **6 teacher profiles** with full bios, qualifications, achievements
- **8 subject pages** with descriptions, topics, career paths, related teachers

### Backend Endpoints:
- POST/GET /api/demo-bookings, DELETE /api/demo-bookings/:id
- POST/GET /api/subject-queries
- POST/GET /api/contact-messages
- POST /api/visitors/track, GET /api/admin/stats, GET /api/whatsapp-config

## Test Results (Iteration 2)
- Backend: 100% (13/13 tests passed)
- Frontend: 98%

## Setup Notes
- Add Resend API key: Set `RESEND_API_KEY=re_xxxxx` in `/app/backend/.env` and restart backend
- Notification email: tutorviaa@gmail.com (configurable via NOTIFICATION_EMAIL in .env)
- WhatsApp number: 917009201851 (configurable via WHATSAPP_NUMBER in .env)

## Backlog
### P1
- [ ] User auth (student/teacher portals)
- [ ] Real teacher availability & booking calendar
- [ ] Payment integration (Stripe)

### P2
- [ ] Video session placeholder → real integration
- [ ] Student dashboard & progress tracking
- [ ] AI-powered chatbot upgrade
- [ ] SEO optimization & meta tags
- [ ] Ratings & reviews system
