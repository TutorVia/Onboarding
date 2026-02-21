from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from supabase import create_client, Client

ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

# Supabase setup
supabase_url = os.environ['SUPABASE_URL']
supabase_key = os.environ['SUPABASE_ANON_KEY']
supabase: Client = create_client(supabase_url, supabase_key)

# Resend setup
import resend
resend.api_key = os.environ.get('RESEND_API_KEY', '')
NOTIFICATION_EMAIL = os.environ.get('NOTIFICATION_EMAIL', 'tutorviaa@gmail.com')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
WHATSAPP_NUMBER = os.environ.get('WHATSAPP_NUMBER', '917009201851')

app = FastAPI()
api_router = APIRouter(prefix="/api")

# --- Models ---
class DemoBooking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str = ""
    grade_level: str = ""
    subject_interest: str = ""
    preferred_date: str = ""
    message: str = ""
    status: str = "pending"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class DemoBookingCreate(BaseModel):
    name: str
    email: str
    phone: str = ""
    grade_level: str = ""
    subject_interest: str = ""
    preferred_date: str = ""
    message: str = ""

class SubjectQuery(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str = ""
    subject: str
    query_type: str = "general"
    message: str = ""
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class SubjectQueryCreate(BaseModel):
    name: str
    email: str
    phone: str = ""
    subject: str
    query_type: str = "general"
    message: str = ""

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str = ""
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    phone: str = ""
    message: str

class VisitorEventCreate(BaseModel):
    session_id: str
    event_type: str
    page: str = "/"
    user_agent: str = ""
    referrer: str = ""

# --- Email Helper ---
async def send_booking_email(booking: DemoBooking):
    if not resend.api_key or resend.api_key == 're_YOUR_API_KEY_HERE':
        logging.warning("Resend API key not configured, skipping email")
        return
    html = f"""
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #F9F8F6; padding: 32px;">
      <div style="background: #2F5D62; padding: 24px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 22px;">New Demo Booking</h1>
      </div>
      <div style="background: white; padding: 24px; border: 1px solid #E2E0D6; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #6B7280; font-size: 14px;">Name</td><td style="padding: 8px 0; font-weight: 600; color: #2C3333;">{booking.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B7280; font-size: 14px;">Email</td><td style="padding: 8px 0; color: #2C3333;">{booking.email}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B7280; font-size: 14px;">Phone</td><td style="padding: 8px 0; color: #2C3333;">{booking.phone}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B7280; font-size: 14px;">Grade</td><td style="padding: 8px 0; color: #2C3333;">{booking.grade_level}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B7280; font-size: 14px;">Subject</td><td style="padding: 8px 0; color: #2C3333;">{booking.subject_interest}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B7280; font-size: 14px;">Preferred Date</td><td style="padding: 8px 0; color: #2C3333;">{booking.preferred_date}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B7280; font-size: 14px;">Message</td><td style="padding: 8px 0; color: #2C3333;">{booking.message or 'N/A'}</td></tr>
        </table>
        <div style="margin-top: 16px; padding: 12px; background: #ECB390; border-radius: 8px; text-align: center;">
          <a href="https://wa.me/{WHATSAPP_NUMBER}?text=Hi%20{booking.name}%2C%20thanks%20for%20booking%20a%20demo%20with%20LearnSphere!" style="color: #2C3333; font-weight: 600; text-decoration: none;">Reply via WhatsApp</a>
        </div>
      </div>
    </div>
    """
    try:
        await asyncio.to_thread(resend.Emails.send, {
            "from": SENDER_EMAIL,
            "to": [NOTIFICATION_EMAIL],
            "subject": f"New Demo Booking: {booking.name} - {booking.subject_interest}",
            "html": html,
        })
        logging.info(f"Email sent for booking {booking.id}")
    except Exception as e:
        logging.error(f"Failed to send email: {e}")

async def send_query_email(query: SubjectQuery):
    if not resend.api_key or resend.api_key == 're_YOUR_API_KEY_HERE':
        return
    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #F9F8F6;">
      <div style="background: #DF7861; padding: 20px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 20px;">New Subject Query: {query.subject}</h1>
      </div>
      <div style="background: white; padding: 24px; border: 1px solid #E2E0D6; border-radius: 0 0 12px 12px;">
        <p><strong>Name:</strong> {query.name}</p>
        <p><strong>Email:</strong> {query.email}</p>
        <p><strong>Phone:</strong> {query.phone}</p>
        <p><strong>Query Type:</strong> {query.query_type}</p>
        <p><strong>Message:</strong> {query.message}</p>
      </div>
    </div>
    """
    try:
        await asyncio.to_thread(resend.Emails.send, {
            "from": SENDER_EMAIL,
            "to": [NOTIFICATION_EMAIL],
            "subject": f"Subject Query: {query.subject} from {query.name}",
            "html": html,
        })
    except Exception as e:
        logging.error(f"Failed to send query email: {e}")

# --- Routes ---
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/demo-bookings", response_model=DemoBooking)
async def create_demo_booking(input: DemoBookingCreate):
    booking = DemoBooking(**input.model_dump())
    doc = booking.model_dump()
    try:
        supabase.table('demo_bookings').insert(doc).execute()
    except Exception as e:
        logging.error(f"Error inserting booking: {e}")
        return {"error": "Failed to create booking"}
    asyncio.create_task(send_booking_email(booking))
    whatsapp_link = f"https://wa.me/{WHATSAPP_NUMBER}?text=Hi%2C%20I%20just%20booked%20a%20demo%20session%20on%20TutorVia.%20My%20name%20is%20{booking.name.replace(' ', '%20')}%20and%20I'm%20interested%20in%20{booking.subject_interest.replace(' ', '%20')}."
    return booking

@api_router.get("/demo-bookings", response_model=List[DemoBooking])
async def get_demo_bookings():
    try:
        response = supabase.table('demo_bookings').select("*").order('created_at', desc=True).execute()
        return response.data
    except Exception as e:
        logging.error(f"Error fetching bookings: {e}")
        return []

@api_router.delete("/demo-bookings/{booking_id}")
async def delete_demo_booking(booking_id: str):
    try:
        result = supabase.table('demo_bookings').delete().eq('id', booking_id).execute()
        if not result.data:
            return {"error": "Booking not found"}
        return {"message": "Booking deleted"}
    except Exception as e:
        logging.error(f"Error deleting booking: {e}")
        return {"error": "Failed to delete booking"}

@api_router.patch("/demo-bookings/{booking_id}/status")
async def update_booking_status(booking_id: str, status: str):
    try:
        result = supabase.table('demo_bookings').update({"status": status}).eq('id', booking_id).execute()
        if not result.data:
            return {"error": "Booking not found"}
        return {"message": "Status updated"}
    except Exception as e:
        logging.error(f"Error updating booking: {e}")
        return {"error": "Failed to update booking"}

@api_router.post("/subject-queries", response_model=SubjectQuery)
async def create_subject_query(input: SubjectQueryCreate):
    query = SubjectQuery(**input.model_dump())
    doc = query.model_dump()
    try:
        supabase.table('subject_queries').insert(doc).execute()
    except Exception as e:
        logging.error(f"Error inserting query: {e}")
        return {"error": "Failed to create query"}
    asyncio.create_task(send_query_email(query))
    return query

@api_router.get("/subject-queries")
async def get_subject_queries():
    try:
        response = supabase.table('subject_queries').select("*").order('created_at', desc=True).execute()
        return response.data
    except Exception as e:
        logging.error(f"Error fetching queries: {e}")
        return []

@api_router.post("/contact-messages")
async def create_contact_message(input: ContactMessageCreate):
    msg = ContactMessage(**input.model_dump())
    doc = msg.model_dump()
    try:
        supabase.table('contact_messages').insert(doc).execute()
    except Exception as e:
        logging.error(f"Error inserting message: {e}")
        return {"error": "Failed to send message"}
    return {"status": "sent", "id": msg.id}

@api_router.get("/contact-messages")
async def get_contact_messages():
    try:
        response = supabase.table('contact_messages').select("*").order('created_at', desc=True).execute()
        return response.data
    except Exception as e:
        logging.error(f"Error fetching messages: {e}")
        return []

@api_router.post("/visitors/track")
async def track_visitor(input: VisitorEventCreate):
    doc = {
        "id": str(uuid.uuid4()),
        "session_id": input.session_id,
        "event_type": input.event_type,
        "page": input.page,
        "user_agent": input.user_agent,
        "referrer": input.referrer,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
    try:
        supabase.table('visitor_events').insert(doc).execute()
    except Exception as e:
        logging.error(f"Error tracking visitor: {e}")
        return {"status": "error"}
    return {"status": "tracked"}

@api_router.get("/admin/stats")
async def get_admin_stats():
    try:
        bookings_response = supabase.table('demo_bookings').select("id", count='exact').execute()
        pending_response = supabase.table('demo_bookings').select("id", count='exact').eq('status', 'pending').execute()
        visits_response = supabase.table('visitor_events').select("id", count='exact').eq('event_type', 'visit').execute()
        leaves_response = supabase.table('visitor_events').select("id", count='exact').eq('event_type', 'leave').execute()
        queries_response = supabase.table('subject_queries').select("id", count='exact').execute()
        contacts_response = supabase.table('contact_messages').select("id", count='exact').execute()
        
        return {
            "total_bookings": bookings_response.count or 0,
            "pending_bookings": pending_response.count or 0,
            "total_visits": visits_response.count or 0,
            "total_leaves": leaves_response.count or 0,
            "total_queries": queries_response.count or 0,
            "total_contacts": contacts_response.count or 0,
        }
    except Exception as e:
        logging.error(f"Error fetching stats: {e}")
        return {
            "total_bookings": 0,
            "pending_bookings": 0,
            "total_visits": 0,
            "total_leaves": 0,
            "total_queries": 0,
            "total_contacts": 0,
        }

@api_router.get("/whatsapp-config")
async def get_whatsapp_config():
    return {"whatsapp_number": WHATSAPP_NUMBER}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)
