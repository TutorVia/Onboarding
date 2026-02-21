from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
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

class VisitorEventCreate(BaseModel):
    session_id: str
    event_type: str
    page: str = "/"
    user_agent: str = ""
    referrer: str = ""

# --- Routes ---
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/demo-bookings", response_model=DemoBooking)
async def create_demo_booking(input: DemoBookingCreate):
    booking = DemoBooking(**input.model_dump())
    doc = booking.model_dump()
    await db.demo_bookings.insert_one(doc)
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
    recent_bookings = await db.demo_bookings.find({}, {"_id": 0}).sort("created_at", -1).to_list(5)
    return {
        "total_bookings": total_bookings,
        "pending_bookings": pending_bookings,
        "total_visits": total_visits,
        "total_leaves": total_leaves,
        "recent_bookings": recent_bookings,
    }

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
