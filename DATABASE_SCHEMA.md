# DMT Database Schema

## Core Entities

### Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  profile_picture_url VARCHAR(500),
  date_of_birth DATE,
  nationality VARCHAR(2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  two_factor_enabled BOOLEAN DEFAULT false,
  two_factor_method VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
```

### Clinics Table

```sql
CREATE TABLE clinics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  country VARCHAR(2) DEFAULT 'TR',
  address VARCHAR(500) NOT NULL,
  zip_code VARCHAR(10),
  phone VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(255),
  owner_id UUID NOT NULL REFERENCES users(id),
  
  -- Licensing & Compliance
  ministry_license_number VARCHAR(100) UNIQUE,
  ministry_registration_date DATE,
  ushas_code VARCHAR(50),
  ushas_accreditation_date DATE,
  dental_association_member BOOLEAN DEFAULT false,
  
  -- Configuration
  subscription_tier VARCHAR(50) DEFAULT 'starter',
  max_dentists INTEGER DEFAULT 5,
  max_patients INTEGER DEFAULT 500,
  timezone VARCHAR(50) DEFAULT 'Europe/Istanbul',
  currency VARCHAR(3) DEFAULT 'TRY',
  language VARCHAR(2) DEFAULT 'tr',
  
  -- Data Residency & Compliance
  data_residency VARCHAR(2) DEFAULT 'TR',
  kvkk_compliant BOOLEAN DEFAULT true,
  hipaa_compliant BOOLEAN DEFAULT false,
  gdpr_compliant BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_clinics_owner ON clinics(owner_id);
CREATE INDEX idx_clinics_city ON clinics(city);
```

### User Roles Table

```sql
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'dentist', 'hygienist', 'receptionist', 'agency', 'patient')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(user_id, clinic_id, role)
);

CREATE INDEX idx_user_roles_user ON user_roles(user_id);
CREATE INDEX idx_user_roles_clinic ON user_roles(clinic_id);
```

### Patients Table

```sql
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  secondary_phone VARCHAR(20),
  
  -- Demographics
  date_of_birth DATE,
  gender VARCHAR(10),
  nationality VARCHAR(2),
  passport_number VARCHAR(50),
  passport_expiry DATE,
  
  -- Address
  country_of_residence VARCHAR(2),
  city_of_residence VARCHAR(100),
  address_line_1 VARCHAR(255),
  address_line_2 VARCHAR(255),
  
  -- Patient Type & Status
  patient_type VARCHAR(50) CHECK (patient_type IN ('local', 'international')),
  status VARCHAR(50) DEFAULT 'lead' CHECK (status IN ('lead', 'qualified', 'booked', 'treatment', 'follow_up', 'completed', 'archived')),
  lead_source VARCHAR(100),
  referring_agency_id UUID REFERENCES agencies(id),
  referral_partner_id UUID,
  
  -- Medical Insurance
  has_insurance BOOLEAN DEFAULT false,
  insurance_provider VARCHAR(255),
  insurance_policy_number VARCHAR(100),
  
  -- Compliance
  kvkk_consent BOOLEAN DEFAULT false,
  kvkk_consent_date TIMESTAMP,
  gdpr_consent BOOLEAN DEFAULT false,
  gdpr_consent_date TIMESTAMP,
  marketing_consent BOOLEAN DEFAULT false,
  marketing_consent_date TIMESTAMP,
  data_residency VARCHAR(2) DEFAULT 'TR',
  
  -- Metadata
  notes TEXT,
  preferred_language VARCHAR(2) DEFAULT 'en',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_patients_clinic ON patients(clinic_id);
CREATE INDEX idx_patients_email ON patients(email);
CREATE INDEX idx_patients_phone ON patients(phone);
CREATE INDEX idx_patients_status ON patients(status);
CREATE INDEX idx_patients_type ON patients(patient_type);
```

### Medical Records Table

```sql
CREATE TABLE medical_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  clinic_id UUID NOT NULL REFERENCES clinics(id),
  dentist_id UUID REFERENCES users(id),
  
  -- Chief Complaint & History
  chief_complaint TEXT,
  history_of_present_illness TEXT,
  
  -- Medical History (JSON for flexibility)
  medical_history JSONB,
  allergies JSONB,
  medications JSONB,
  social_history JSONB,
  
  -- Dental History
  last_dental_visit DATE,
  previous_dental_procedures JSONB,
  oral_hygiene_status VARCHAR(50),
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_medical_records_patient ON medical_records(patient_id);
CREATE INDEX idx_medical_records_dentist ON medical_records(dentist_id);
```

### Radiographs Table

```sql
CREATE TABLE radiographs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  medical_record_id UUID REFERENCES medical_records(id),
  
  radiograph_type VARCHAR(50) CHECK (radiograph_type IN ('panoramic', 'periapical', 'bitewings', 'occlusal', 'cbct')),
  tooth_number VARCHAR(10),
  
  file_url VARCHAR(500) NOT NULL,
  file_size INTEGER,
  file_format VARCHAR(10),
  
  -- DICOM Metadata
  dicom_metadata JSONB,
  study_date DATE,
  study_time TIME,
  patient_id_dicom VARCHAR(50),
  
  -- AI Analysis
  ai_analysis_status VARCHAR(50) DEFAULT 'pending',
  ai_findings JSONB,
  ai_confidence_score FLOAT,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  uploaded_by UUID REFERENCES users(id)
);

CREATE INDEX idx_radiographs_patient ON radiographs(patient_id);
CREATE INDEX idx_radiographs_type ON radiographs(radiograph_type);
```

### Treatment Plans Table

```sql
CREATE TABLE treatment_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  clinic_id UUID NOT NULL REFERENCES clinics(id),
  dentist_id UUID NOT NULL REFERENCES users(id),
  medical_record_id UUID REFERENCES medical_records(id),
  
  plan_name VARCHAR(255),
  description TEXT,
  
  -- Procedures (JSON Array)
  procedures JSONB NOT NULL,
  
  -- Estimated Costs
  estimated_total_cost DECIMAL(10, 2),
  estimated_duration_minutes INTEGER,
  estimated_num_visits INTEGER,
  currency VARCHAR(3) DEFAULT 'TRY',
  
  -- Status
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'proposed', 'approved', 'active', 'completed', 'cancelled')),
  approved_by_patient BOOLEAN DEFAULT false,
  approved_at TIMESTAMP,
  
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_treatment_plans_patient ON treatment_plans(patient_id);
CREATE INDEX idx_treatment_plans_dentist ON treatment_plans(dentist_id);
```

### AI Diagnoses Table

```sql
CREATE TABLE ai_diagnoses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  medical_record_id UUID NOT NULL REFERENCES medical_records(id) ON DELETE CASCADE,
  
  radiograph_ids UUID[] NOT NULL,
  
  -- Diagnosis Details
  findings JSONB NOT NULL,
  overall_confidence_score FLOAT,
  severity_assessment VARCHAR(50),
  
  -- Recommendations
  recommended_treatments JSONB,
  estimated_cost_range JSONB,
  estimated_duration_range JSONB,
  
  -- Dentist Review
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMP,
  dentist_notes TEXT,
  approval_status VARCHAR(50) DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected', 'revised')),
  
  -- Patient Report
  patient_report_generated BOOLEAN DEFAULT false,
  patient_report_url VARCHAR(500),
  report_language VARCHAR(2),
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ai_diagnoses_patient ON ai_diagnoses(patient_id);
CREATE INDEX idx_ai_diagnoses_status ON ai_diagnoses(approval_status);
```

### Appointments Table

```sql
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  clinic_id UUID NOT NULL REFERENCES clinics(id),
  dentist_id UUID NOT NULL REFERENCES users(id),
  room_id UUID REFERENCES rooms(id),
  
  appointment_date TIMESTAMP NOT NULL,
  duration_minutes INTEGER NOT NULL,
  treatment_type VARCHAR(100),
  
  -- Status
  status VARCHAR(50) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show')),
  
  -- Reminders
  reminder_sent BOOLEAN DEFAULT false,
  reminder_sent_at TIMESTAMP,
  reminder_method VARCHAR(50),
  
  -- Notes & Documents
  notes TEXT,
  consent_form_id UUID,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  cancelled_at TIMESTAMP,
  cancelled_by UUID REFERENCES users(id),
  cancellation_reason TEXT
);

CREATE INDEX idx_appointments_patient ON appointments(patient_id);
CREATE INDEX idx_appointments_dentist ON appointments(dentist_id);
CREATE INDEX idx_appointments_clinic ON appointments(clinic_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);
```

### Rooms Table

```sql
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  
  name VARCHAR(100) NOT NULL,
  room_type VARCHAR(50) CHECK (room_type IN ('operatory', 'consultation', 'sterilization', 'lab')),
  
  -- Capacity & Equipment
  equipment JSONB,
  capacity INTEGER DEFAULT 1,
  
  -- Availability (JSON for schedule blocks)
  available_hours JSONB,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_rooms_clinic ON rooms(clinic_id);
```

### Travel Itineraries Table

```sql
CREATE TABLE travel_itineraries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  clinic_id UUID NOT NULL REFERENCES clinics(id),
  
  arrival_date DATE NOT NULL,
  departure_date DATE NOT NULL,
  total_days INTEGER,
  
  -- Hotel Information
  hotel_id UUID REFERENCES hotels(id),
  hotel_name VARCHAR(255),
  hotel_address VARCHAR(500),
  hotel_phone VARCHAR(20),
  check_in_date DATE,
  check_out_date DATE,
  room_type VARCHAR(100),
  num_nights INTEGER,
  
  -- Transfer Information
  arrival_transfer_id UUID REFERENCES transfers(id),
  departure_transfer_id UUID REFERENCES transfers(id),
  
  -- Travel Details
  airline VARCHAR(100),
  flight_number VARCHAR(20),
  arrival_flight_number VARCHAR(20),
  departure_flight_number VARCHAR(20),
  passport_number VARCHAR(50),
  
  -- Appointment Schedule (Array of appointment IDs)
  appointment_ids UUID[],
  
  -- Visitor Information
  accompanying_person BOOLEAN DEFAULT false,
  accompanying_person_details JSONB,
  
  -- Special Requests
  special_requests TEXT,
  dietary_restrictions TEXT,
  accessibility_needs TEXT,
  
  status VARCHAR(50) DEFAULT 'planning',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_itineraries_patient ON travel_itineraries(patient_id);
CREATE INDEX idx_itineraries_dates ON travel_itineraries(arrival_date, departure_date);
```

### Transfers Table

```sql
CREATE TABLE transfers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  itinerary_id UUID NOT NULL REFERENCES travel_itineraries(id) ON DELETE CASCADE,
  clinic_id UUID NOT NULL REFERENCES clinics(id),
  
  transfer_type VARCHAR(50) CHECK (transfer_type IN ('airport_pickup', 'airport_dropoff', 'clinic_transfer', 'hotel_transfer', 'custom')),
  
  -- Location Details
  pickup_location VARCHAR(500) NOT NULL,
  pickup_latitude FLOAT,
  pickup_longitude FLOAT,
  pickup_datetime TIMESTAMP NOT NULL,
  
  dropoff_location VARCHAR(500) NOT NULL,
  dropoff_latitude FLOAT,
  dropoff_longitude FLOAT,
  estimated_dropoff_datetime TIMESTAMP,
  
  -- Driver Details
  driver_id UUID REFERENCES drivers(id),
  driver_name VARCHAR(100),
  driver_phone VARCHAR(20),
  vehicle_details JSONB,
  
  -- Current Status
  status VARCHAR(50) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'in_transit', 'completed', 'cancelled')),
  current_location JSONB,
  current_location_timestamp TIMESTAMP,
  
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_transfers_itinerary ON transfers(itinerary_id);
CREATE INDEX idx_transfers_status ON transfers(status);
```

### Hotels Table

```sql
CREATE TABLE hotels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  address VARCHAR(500) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(255),
  
  star_rating INTEGER,
  reviews_rating FLOAT,
  
  -- Location
  latitude FLOAT,
  longitude FLOAT,
  
  -- Features
  amenities JSONB,
  room_types JSONB,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_hotels_city ON hotels(city);
```

### Drivers Table

```sql
CREATE TABLE drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID REFERENCES clinics(id),
  
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  
  -- License & Documentation
  driver_license_number VARCHAR(50),
  license_expiry_date DATE,
  vehicle_registration VARCHAR(100),
  
  -- Vehicle
  vehicle_make VARCHAR(50),
  vehicle_model VARCHAR(50),
  vehicle_color VARCHAR(50),
  vehicle_license_plate VARCHAR(20),
  vehicle_type VARCHAR(50),
  
  -- Rating
  average_rating FLOAT,
  total_rides INTEGER DEFAULT 0,
  
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_drivers_clinic ON drivers(clinic_id);
```

### Payments Table

```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  clinic_id UUID NOT NULL REFERENCES clinics(id),
  
  treatment_plan_id UUID REFERENCES treatment_plans(id),
  appointment_id UUID REFERENCES appointments(id),
  
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'TRY',
  
  -- Payment Details
  payment_method VARCHAR(50) CHECK (payment_method IN ('credit_card', 'bank_transfer', 'cash', 'mobile_wallet', 'installment')),
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
  
  -- Gateway Information
  gateway_name VARCHAR(100),
  gateway_transaction_id VARCHAR(255),
  gateway_response JSONB,
  
  -- Installments
  num_installments INTEGER,
  installment_number INTEGER,
  next_installment_date DATE,
  
  description VARCHAR(500),
  
  processed_at TIMESTAMP,
  refunded_at TIMESTAMP,
  refund_reason TEXT,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_payments_patient ON payments(patient_id);
CREATE INDEX idx_payments_clinic ON payments(clinic_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_date ON payments(created_at);
```

### Invoices Table

```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  clinic_id UUID NOT NULL REFERENCES clinics(id),
  
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  invoice_date DATE NOT NULL,
  due_date DATE NOT NULL,
  
  -- Line Items (JSON Array)
  line_items JSONB NOT NULL,
  
  subtotal DECIMAL(10, 2),
  tax_amount DECIMAL(10, 2),
  discount_amount DECIMAL(10, 2),
  total_amount DECIMAL(10, 2) NOT NULL,
  
  currency VARCHAR(3) DEFAULT 'TRY',
  
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'viewed', 'partially_paid', 'paid', 'overdue', 'cancelled')),
  
  payment_terms TEXT,
  notes TEXT,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_invoices_patient ON invoices(patient_id);
CREATE INDEX idx_invoices_clinic ON invoices(clinic_id);
CREATE INDEX idx_invoices_number ON invoices(invoice_number);
```

### Audit Logs Table

```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  clinic_id UUID NOT NULL REFERENCES clinics(id),
  
  action VARCHAR(255) NOT NULL,
  entity_type VARCHAR(100) NOT NULL,
  entity_id UUID NOT NULL,
  
  old_values JSONB,
  new_values JSONB,
  
  ip_address INET,
  user_agent VARCHAR(500),
  
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_clinic ON audit_logs(clinic_id);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp);
```

### Communications Table

```sql
CREATE TABLE communications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  clinic_id UUID NOT NULL REFERENCES clinics(id),
  
  communication_type VARCHAR(50) CHECK (communication_type IN ('email', 'sms', 'whatsapp', 'chat', 'voice')),
  
  sender_id UUID REFERENCES users(id),
  recipient VARCHAR(255) NOT NULL,
  
  subject VARCHAR(255),
  message TEXT NOT NULL,
  
  status VARCHAR(50) DEFAULT 'sent' CHECK (status IN ('pending', 'sent', 'delivered', 'read', 'failed')),
  
  sent_at TIMESTAMP,
  delivered_at TIMESTAMP,
  read_at TIMESTAMP,
  
  template_used VARCHAR(100),
  template_variables JSONB,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_communications_patient ON communications(patient_id);
CREATE INDEX idx_communications_type ON communications(communication_type);
```

### Agencies Table

```sql
CREATE TABLE agencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  website VARCHAR(255),
  
  -- Contact Person
  contact_person_name VARCHAR(100),
  contact_person_phone VARCHAR(20),
  contact_person_email VARCHAR(255),
  
  -- Commission
  commission_percentage DECIMAL(5, 2),
  commission_amount_fixed DECIMAL(10, 2),
  
  -- Address
  country VARCHAR(2),
  city VARCHAR(100),
  address VARCHAR(500),
  
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_agencies_email ON agencies(email);
```

---

## Views for Analytics

```sql
CREATE VIEW patient_lifecycle_view AS
SELECT 
  p.id,
  p.first_name,
  p.last_name,
  p.status,
  COUNT(DISTINCT a.id) as total_appointments,
  COUNT(DISTINCT CASE WHEN a.status = 'completed' THEN a.id END) as completed_appointments,
  MAX(a.appointment_date) as last_appointment,
  SUM(CASE WHEN p.status = 'treatment' THEN 1 ELSE 0 END) as in_treatment,
  COALESCE(SUM(CASE WHEN pay.status = 'completed' THEN pay.amount ELSE 0 END), 0) as total_paid
FROM patients p
LEFT JOIN appointments a ON p.id = a.patient_id
LEFT JOIN payments pay ON p.id = pay.patient_id
GROUP BY p.id, p.first_name, p.last_name, p.status;

CREATE VIEW clinic_revenue_view AS
SELECT 
  c.id,
  c.name,
  DATE_TRUNC('month', pay.created_at) as revenue_month,
  COUNT(DISTINCT pay.id) as transaction_count,
  SUM(CASE WHEN pay.status = 'completed' THEN pay.amount ELSE 0 END) as total_revenue,
  AVG(CASE WHEN pay.status = 'completed' THEN pay.amount ELSE NULL END) as avg_transaction
FROM clinics c
LEFT JOIN payments pay ON c.id = pay.clinic_id
GROUP BY c.id, c.name, DATE_TRUNC('month', pay.created_at);
```

---

This comprehensive schema supports the complete DMT platform with proper indexing, constraints, and relationships.
