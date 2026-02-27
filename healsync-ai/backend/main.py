from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import datetime

# --- Database Setup ---
SQLALCHEMY_DATABASE_URL = "sqlite:///./healsync.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# --- Models ---
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="patient") # patient, pharmacist

class Prescription(Base):
    __tablename__ = "prescriptions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    doctor_name = Column(String)
    extracted_text = Column(String)
    status = Column(String, default="pending") # pending, processing, completed
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Medication(Base):
    __tablename__ = "medications"
    id = Column(Integer, primary_key=True, index=True)
    prescription_id = Column(Integer, ForeignKey("prescriptions.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String, index=True)
    dosage = Column(String)
    frequency = Column(String)
    duration = Column(String)
    instructions = Column(String)
    is_ongoing = Column(Boolean, default=True)

class Bill(Base):
    __tablename__ = "bills"
    id = Column(Integer, primary_key=True, index=True)
    prescription_id = Column(Integer, ForeignKey("prescriptions.id"))
    pharmacist_id = Column(Integer, ForeignKey("users.id"))
    total_amount = Column(Integer)
    status = Column(String, default="unpaid") # unpaid, paid
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

Base.metadata.create_all(bind=engine)

# --- FastAPI App ---
app = FastAPI(title="HealSync AI Backend", description="API for smart prescription management", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Dependency ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Schemas ---
class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str = "patient"

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: str
    class Config:
        from_attributes = True

class ExtractRequest(BaseModel):
    text: str
    user_id: int

class BillCreate(BaseModel):
    prescription_id: int
    pharmacist_id: int
    total_amount: int

# --- Routes ---
@app.get("/")
def read_root():
    return {"status": "ok", "message": "HealSync AI API is running"}

@app.post("/api/auth/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # In a real app, hash the password! This is just a mock setup.
    fake_hashed_password = user.password + "notreallyhashed"
    
    new_user = User(name=user.name, email=user.email, hashed_password=fake_hashed_password, role=user.role)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.get("/api/users/{user_id}/medications")
def get_user_medications(user_id: int, db: Session = Depends(get_db)):
    meds = db.query(Medication).filter(Medication.user_id == user_id).all()
    return meds

# --- Mock AI Extraction Route ---
@app.post("/api/ai/extract")
def mock_ai_extraction(request: ExtractRequest, db: Session = Depends(get_db)):
    """
    This endpoint simulates extracting structured data from raw prescription text.
    """
    new_prescription = Prescription(
        user_id=request.user_id,
        doctor_name="Dr. Unknown (Extracted)",
        extracted_text=request.text,
        status="completed"
    )
    db.add(new_prescription)
    db.commit()
    db.refresh(new_prescription)
    
    # Generate mock extracted medications based on input
    mock_meds = [
        {"name": "Amoxicillin", "dosage": "500mg", "frequency": "3x a day", "duration": "7 days", "instructions": "Take after meals"},
        {"name": "Paracetamol", "dosage": "650mg", "frequency": "As needed", "duration": "5 days", "instructions": "For fever"}
    ]
    
    for m in mock_meds:
        new_med = Medication(
            prescription_id=new_prescription.id,
            user_id=request.user_id,
            name=m["name"],
            dosage=m["dosage"],
            frequency=m["frequency"],
            duration=m["duration"],
            instructions=m["instructions"],
            is_ongoing=True
        )
        db.add(new_med)
    db.commit()
    
    return {
        "status": "success", 
        "message": "AI extraction complete", 
        "prescription_id": new_prescription.id,
        "extracted_data": mock_meds
    }

# --- Pharmacist Billing Route ---
@app.post("/api/pharmacist/bills")
def create_bill(bill: BillCreate, db: Session = Depends(get_db)):
    # Check if prescription exists
    prescription = db.query(Prescription).filter(Prescription.id == bill.prescription_id).first()
    if not prescription:
        raise HTTPException(status_code=404, detail="Prescription not found")
        
    new_bill = Bill(
        prescription_id=bill.prescription_id,
        pharmacist_id=bill.pharmacist_id,
        total_amount=bill.total_amount,
        status="unpaid"
    )
    db.add(new_bill)
    db.commit()
    db.refresh(new_bill)
    
    return {"status": "success", "message": "Bill created successfully", "bill_id": new_bill.id}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
