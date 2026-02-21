# TutorVia Application Setup & Run Guide

## Prerequisites
- Python 3.8+
- Node.js 14+ and npm
- Supabase account with credentials in `.env`

## ⚡ Quick Start (Recommended)

### Option 1: Using Startup Scripts

**Terminal 1 - Backend:**
```bash
chmod +x start-backend.sh
./start-backend.sh
```

**Terminal 2 - Frontend:**
```bash
chmod +x start-frontend.sh
./start-frontend.sh
```

### Option 2: Manual Setup

**Backend:**
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn server:app --host 0.0.0.0 --port 8000 --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

## Environment Setup

✅ The `.env` file has been created with:
- **APP_NAME**: TutorVia
- **Supabase Credentials**: Already configured
- **Email & Communication**: Resend API and WhatsApp configured
- **CORS_ORIGINS**: Set to '*' for development

## Backend Setup & Run

### Dependencies Fixed ✅
- Removed conflicting `httpx==0.28.1` (caused compatibility issues)
- Updated to `httpx==0.27.0` (compatible with Supabase)
- Removed unnecessary AI/ML packages
- Minimal, fast installation

### Step 1: Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### Step 2: Create Supabase Tables
The following tables need to be created in your Supabase dashboard:
- `demo_bookings`
- `subject_queries`
- `contact_messages`
- `visitor_events`

Or run these SQL commands in Supabase:
```sql
CREATE TABLE demo_bookings (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  grade_level TEXT,
  subject_interest TEXT,
  preferred_date TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE subject_queries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  query_type TEXT DEFAULT 'general',
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE contact_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE visitor_events (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  page TEXT,
  user_agent TEXT,
  referrer TEXT,
  timestamp TIMESTAMP DEFAULT NOW()
);
```

### Step 3: Run Backend Server
```bash
python -m uvicorn server:app --host 0.0.0.0 --port 8000 --reload
```

Backend will be available at: **http://localhost:8000**
API Docs: **http://localhost:8000/docs**

## Frontend Setup & Run

### Step 1: Install Frontend Dependencies
```bash
cd frontend
npm install
```

### Step 2: Run Frontend Development Server
```bash
npm start
```

Frontend will be available at: **http://localhost:3000**

## Running Both Servers (In Separate Terminals)

### Terminal 1 - Backend:
```bash
./start-backend.sh
```
Or manually:
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn server:app --host 0.0.0.0 --port 8000 --reload
```

### Terminal 2 - Frontend:
```bash
./start-frontend.sh
```
Or manually:
```bash
cd frontend
npm install
npm start
```

## Key Changes Made

✅ **Migrated from MongoDB to Supabase**
- Updated all database operations to use Supabase client
- Replaced MongoDB async operations with Supabase REST API calls
- All CRUD operations updated for Supabase

✅ **Renamed Application**
- Changed "LearnSphere" to "TutorVia" throughout the codebase
- Updated .env and documentation

✅ **Environment Configuration**
- All required environment variables configured
- Supabase URL and API keys set
- Email and communication settings ready

## API Endpoints

- `GET /api/` - Health check
- `POST /api/demo-bookings` - Create demo booking
- `GET /api/demo-bookings` - Get all bookings
- `DELETE /api/demo-bookings/{id}` - Delete booking
- `PATCH /api/demo-bookings/{id}/status` - Update booking status
- `POST /api/subject-queries` - Create subject query
- `GET /api/subject-queries` - Get all queries
- `POST /api/contact-messages` - Create contact message
- `GET /api/contact-messages` - Get all messages
- `POST /api/visitors/track` - Track visitor event
- `GET /api/admin/stats` - Get admin statistics
- `GET /api/whatsapp-config` - Get WhatsApp config

## Troubleshooting

### Backend Issues

**Issue**: `ERROR: Cannot install -r requirements.txt ... conflicting dependencies`
- **Solution**: ✅ FIXED - Updated `httpx==0.27.0` (was 0.28.1 which conflicts with supabase)
- Just run: `pip install -r requirements.txt` (should work now)

**Issue**: ModuleNotFoundError for supabase
- **Solution**: Ensure `pip install supabase` completed successfully
- Try: `pip install --upgrade supabase`

**Issue**: Supabase connection error
- **Solution**: Verify SUPABASE_URL and SUPABASE_ANON_KEY in .env match your Supabase project

**Issue**: CORS errors
- **Solution**: Check CORS_ORIGINS in .env, currently set to '*' for development

### Frontend Issues

**Issue**: `react-day-picker@8.10.1` doesn't support React 19
- **Solution**: ✅ FIXED - Downgraded to React 18.3.0 (compatible with react-day-picker)
- Just run: `npm install --legacy-peer-deps` (handles any peer dependency issues)

**Issue**: `craco: command not found`
- **Solution**: Run `npm install` first to install all dependencies including craco
- Try: `npx craco start` as alternative

**Issue**: `npm start` fails or "craco not found"
- **Solution**: Delete node_modules and try again:
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

**Issue**: Port 3000 or 8000 already in use
- **Solution**: Change the port or kill the process using it:
```bash
# Find and kill process on port 3000
lsof -i :3000
kill -9 <PID>

# Or use different port with React
PORT=3001 npm start
```

**Issue**: npm install is very slow
- **Solution**: Try using yarn or increasing npm timeout:
```bash
npm install --timeout=60000
```

## Notes

- The application is now fully configured for Supabase
- No MongoDB connection needed
- All environment variables are ready
- Frontend and backend communicate via REST API
