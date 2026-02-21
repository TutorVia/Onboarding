from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

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
    await db.demo_bookings.insert_one(doc)
    asyncio.create_task(send_booking_email(booking))
    whatsapp_link = f"https://wa.me/{WHATSAPP_NUMBER}?text=Hi%2C%20I%20just%20booked%20a%20demo%20session%20on%20LearnSphere.%20My%20name%20is%20{booking.name.replace(' ', '%20')}%20and%20I'm%20interested%20in%20{booking.subject_interest.replace(' ', '%20')}."
    return booking

@api_router.get("/demo-bookings", response_model=List[DemoBooking])
async def get_demo_bookings():
    bookings = await db.demo_bookings.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return bookings

@api_router.delete("/demo-bookings/{booking_id}")
async def delete_demo_booking(booking_id: str):
    result = await db.demo_bookings.delete_one({"id": booking_id})
    if result.deleted_count == 0:
        return {"error": "Booking not found"}
    return {"message": "Booking deleted"}

@api_router.patch("/demo-bookings/{booking_id}/status")
async def update_booking_status(booking_id: str, status: str):
    result = await db.demo_bookings.update_one(
        {"id": booking_id}, {"$set": {"status": status}}
    )
    if result.matched_count == 0:
        return {"error": "Booking not found"}
    return {"message": "Status updated"}

@api_router.post("/subject-queries", response_model=SubjectQuery)
async def create_subject_query(input: SubjectQueryCreate):
    query = SubjectQuery(**input.model_dump())
    doc = query.model_dump()
    await db.subject_queries.insert_one(doc)
    asyncio.create_task(send_query_email(query))
    return query

@api_router.get("/subject-queries")
async def get_subject_queries():
    queries = await db.subject_queries.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return queries

@api_router.post("/contact-messages")
async def create_contact_message(input: ContactMessageCreate):
    msg = ContactMessage(**input.model_dump())
    doc = msg.model_dump()
    await db.contact_messages.insert_one(doc)
    return {"status": "sent", "id": msg.id}

@api_router.get("/contact-messages")
async def get_contact_messages():
    messages = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return messages

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
    await db.visitor_events.insert_one(doc)
    return {"status": "tracked"}

@api_router.get("/admin/stats")
async def get_admin_stats():
    total_bookings = await db.demo_bookings.count_documents({})
    pending_bookings = await db.demo_bookings.count_documents({"status": "pending"})
    total_visits = await db.visitor_events.count_documents({"event_type": "visit"})
    total_leaves = await db.visitor_events.count_documents({"event_type": "leave"})
    total_queries = await db.subject_queries.count_documents({})
    total_contacts = await db.contact_messages.count_documents({})
    return {
        "total_bookings": total_bookings,
        "pending_bookings": pending_bookings,
        "total_visits": total_visits,
        "total_leaves": total_leaves,
        "total_queries": total_queries,
        "total_contacts": total_contacts,
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

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
