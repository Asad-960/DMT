# DMT: Dental Medical Tourism CRM - Complete System Architecture

## Executive Product Vision

**DMT** is the next-generation, AI-powered operating system for dental medical tourism in Turkey. It seamlessly integrates:
- Dental practice management
- International patient coordination
- AI-assisted diagnostics
- Regulatory compliance automation
- Hospitality logistics orchestration
- Advanced financial management
- Multilingual AI communication

The platform transforms fragmented workflows into a unified, intelligent ecosystem that outperforms HubSpot, Salesforce, Zoho, and traditional dental PMS systems.

---

## I. CORE SYSTEM ARCHITECTURE

### 1.1 Technology Stack

**Frontend:**
- React 18 / Next.js 14
- TypeScript
- TailwindCSS + Shadcn/ui
- Zustand for state management
- React Query for data fetching
- WebSocket for real-time updates
- Mapbox for location tracking
- Three.js for 3D dental imaging visualization

**Backend:**
- Node.js / NestJS
- GraphQL + REST APIs
- PostgreSQL (primary database)
- Redis (caching, real-time messaging)
- MongoDB (unstructured medical data)
- Elasticsearch (search & analytics)

**AI/ML Services:**
- Python FastAPI microservices
- TensorFlow/PyTorch for diagnostic models
- LangChain for AI orchestration
- OpenAI/Claude for multilingual chat
- Vector databases (Pinecone/Weaviate) for semantic search

**Infrastructure:**
- Docker + Kubernetes
- AWS (primary) or Turkish local cloud (TR-Cloud)
- Event-driven architecture (RabbitMQ/Kafka)
- CI/CD: GitHub Actions
- Monitoring: Datadog/New Relic

### 1.2 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     USER INTERFACES                       │
├─────────────────────────────────────────────────────────┤
│  Web Portal │ Mobile App │ Patient App │ Agency Portal   │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│              API GATEWAY & AUTH LAYER                     │
│  (OAuth2/JWT • Rate Limiting • Request Routing)          │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│              MICROSERVICES LAYER                          │
├──────────────────────┬──────────────────────────────────┤
│ • Patient Service    │ • Scheduling Service              │
│ • Billing Service    │ • Communication Service           │
│ • Compliance Service │ • Analytics Service               │
│ • AI Service         │ • Logistics Service               │
│ • Travel Service     │ • Integration Service             │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│         DATA LAYER & MESSAGE QUEUES                      │
├──────────────────────┬──────────────────────────────────┤
│ PostgreSQL │ MongoDB │ Redis │ Kafka │ Elasticsearch     │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│         EXTERNAL INTEGRATIONS                            │
├──────────────────────┬──────────────────────────────────┤
│ • Turkish APIs       │ • Payment Gateways                │
│ • Ministry of Health │ • AI Diagnostic APIs              │
│ • HealthTürkiye      │ • Email/SMS/WhatsApp              │
│ • Hotel Systems      │ • Google Maps/Location            │
└──────────────────────┴──────────────────────────────────┘
```

---

## II. DATABASE SCHEMA

### Core Tables Architecture

**Patients Table:**
```sql
CREATE TABLE patients (
  id UUID PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  source_country VARCHAR(2),
  patient_type ENUM('local', 'international'),
  status ENUM('lead', 'booked', 'treatment', 'follow_up', 'archived'),
  passport_number VARCHAR(50),
  insurance_provider VARCHAR(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  data_residency ENUM('TR', 'EU', 'US'),
  gdpr_consent BOOLEAN,
  kvkk_consent BOOLEAN
);

CREATE TABLE patient_medical_records (
  id UUID PRIMARY KEY,
  patient_id UUID REFERENCES patients(id),
  chief_complaint TEXT,
  medical_history JSONB,
  allergies JSONB,
  medications JSONB,
  radiograph_urls TEXT[],
  treatment_plan JSONB,
  ai_diagnosis JSONB,
  created_at TIMESTAMP
);

CREATE TABLE appointments (
  id UUID PRIMARY KEY,
  patient_id UUID REFERENCES patients(id),
  dentist_id UUID REFERENCES users(id),
  clinic_id UUID REFERENCES clinics(id),
  appointment_date TIMESTAMP,
  duration_minutes INTEGER,
  treatment_type VARCHAR(255),
  room_id UUID REFERENCES rooms(id),
  status ENUM('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show'),
  notes TEXT,
  created_at TIMESTAMP
);

CREATE TABLE travel_itineraries (
  id UUID PRIMARY KEY,
  patient_id UUID REFERENCES patients(id),
  arrival_date DATE,
  departure_date DATE,
  hotel_id UUID REFERENCES hotels(id),
  hotel_name VARCHAR(255),
  room_type VARCHAR(50),
  transfer_service_id UUID,
  driver_details JSONB,
  flight_tracking JSONB,
  visit_schedule JSONB,
  created_at TIMESTAMP
);

CREATE TABLE clinics (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  city VARCHAR(100),
  address TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  license_number VARCHAR(100),
  ministry_registration VARCHAR(100),
  ushas_code VARCHAR(50),
  owner_id UUID REFERENCES users(id),
  subscription_tier ENUM('starter', 'professional', 'enterprise'),
  created_at TIMESTAMP
);

CREATE TABLE rooms (
  id UUID PRIMARY KEY,
  clinic_id UUID REFERENCES clinics(id),
  name VARCHAR(100),
  type ENUM('operatory', 'consultation', 'sterilization'),
  equipment JSONB,
  available_hours JSONB,
  created_at TIMESTAMP
);

CREATE TABLE payments (
  id UUID PRIMARY KEY,
  patient_id UUID REFERENCES patients(id),
  clinic_id UUID REFERENCES clinics(id),
  amount DECIMAL(10, 2),
  currency VARCHAR(3),
  status ENUM('pending', 'completed', 'failed', 'refunded'),
  payment_method VARCHAR(50),
  gateway_transaction_id VARCHAR(255),
  created_at TIMESTAMP,
  completed_at TIMESTAMP
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  action VARCHAR(255),
  entity_type VARCHAR(100),
  entity_id UUID,
  old_values JSONB,
  new_values JSONB,
  timestamp TIMESTAMP,
  ip_address INET
);

CREATE TABLE user_roles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  clinic_id UUID REFERENCES clinics(id),
  role ENUM('admin', 'dentist', 'hygienist', 'receptionist', 'agency', 'patient'),
  permissions JSONB,
  created_at TIMESTAMP
);
```

---

## III. API ARCHITECTURE

### 3.1 REST Endpoints

**Patient Management:**
- `GET /api/v1/patients` - List patients
- `POST /api/v1/patients` - Create patient
- `GET /api/v1/patients/:id` - Get patient details
- `PUT /api/v1/patients/:id` - Update patient
- `GET /api/v1/patients/:id/medical-records` - Get medical records
- `POST /api/v1/patients/:id/medical-records` - Add medical records

**Appointments:**
- `GET /api/v1/appointments` - List appointments
- `POST /api/v1/appointments` - Create appointment
- `GET /api/v1/appointments/availability` - Get available slots
- `PUT /api/v1/appointments/:id` - Update appointment
- `DELETE /api/v1/appointments/:id` - Cancel appointment

**Travel & Logistics:**
- `GET /api/v1/itineraries/:id` - Get patient itinerary
- `PUT /api/v1/itineraries/:id` - Update itinerary
- `GET /api/v1/transfers/tracking/:id` - Live transfer tracking
- `GET /api/v1/hotels/search` - Search hotels

**Billing:**
- `POST /api/v1/payments/process` - Process payment
- `GET /api/v1/invoices/:id` - Get invoice
- `POST /api/v1/payments/link` - Generate payment link
- `GET /api/v1/billing/analytics` - Billing analytics

### 3.2 GraphQL Schema

```graphql
type Patient {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
  patientType: PatientType!
  sourceCountry: String!
  medicalRecords: [MedicalRecord!]!
  appointments: [Appointment!]!
  itinerary: TravelItinerary
  payments: [Payment!]!
  createdAt: DateTime!
}

type MedicalRecord {
  id: ID!
  chiefComplaint: String!
  medicalHistory: JSON!
  allergies: [String!]!
  medications: [String!]!
  radiographs: [Radiograph!]!
  treatmentPlan: TreatmentPlan!
  aiDiagnosis: AIDiagnosis!
}

type Appointment {
  id: ID!
  patient: Patient!
  dentist: User!
  appointmentDate: DateTime!
  duration: Int!
  treatmentType: String!
  status: AppointmentStatus!
  room: Room!
}

type TravelItinerary {
  id: ID!
  patient: Patient!
  arrivalDate: Date!
  departureDate: Date!
  hotel: Hotel!
  transfers: [Transfer!]!
  visitSchedule: [VisitSchedule!]!
}

type AIDiagnosis {
  id: ID!
  findings: [Finding!]!
  confidenceScore: Float!
  recommendations: [String!]!
  treatmentOptions: [TreatmentOption!]!
  generatedAt: DateTime!
  approvedBy: User
}

type Query {
  patient(id: ID!): Patient
  patients(filter: PatientFilter): [Patient!]!
  appointments(clinicId: ID!, date: Date): [Appointment!]!
  itinerary(patientId: ID!): TravelItinerary
  analytics(clinicId: ID!, period: Period!): Analytics!
}

type Mutation {
  createPatient(input: CreatePatientInput!): Patient!
  updatePatient(id: ID!, input: UpdatePatientInput!): Patient!
  scheduleAppointment(input: ScheduleAppointmentInput!): Appointment!
  processPayment(input: PaymentInput!): Payment!
  generateAIDiagnosis(recordId: ID!): AIDiagnosis!
}

type Subscription {
  appointmentBooked: Appointment!
  transferLocationUpdated(transferId: ID!): Location!
  paymentStatusChanged: Payment!
}
```

---

## IV. AI ARCHITECTURE & WORKFLOWS

### 4.1 AI Diagnostic Pipeline

```
┌─────────────────────┐
│   DICOM/X-ray       │
│   Image Upload      │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│  Image Preprocessing│
│  • Normalization    │
│  • Enhancement      │
└──────────┬──────────┘
           │
┌──────────▼──────────────────────────────┐
│  AI Diagnostic Models (TensorFlow)      │
│  • Pathology Detection                  │
│  • Caries Detection                     │
│  • Tooth Segmentation                   │
│  • Bone Density Analysis                │
│  • Implant Planning                     │
└──────────┬──────────────────────────────┘
           │
┌──────────▼──────────┐
│  Confidence Scoring │
│  & Anomaly Check    │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│  AI Report          │
│  Generation         │
└──────────┬──────────┘
           │
┌──────────▼──────────────────────────────┐
│  Human-in-the-Loop Validation           │
│  • Dentist Review                       │
│  • Approval/Rejection                   │
│  • Notes Addition                       │
└──────────┬──────────────────────────────┘
           │
┌──────────▼──────────┐
│  Patient-Friendly   │
│  Report Generation  │
└────────────────────┘
```

### 4.2 AI Communication System

**Multilingual AI Chatbot (LangChain):**
- Natural language processing in 6 languages
- Dental-specific knowledge base
- Sentiment analysis for escalation
- Context-aware responses
- Integration with WhatsApp, Instagram DM
- Lead qualification automation

**Voice AI Receptionist:**
- Turkish & English support
- Appointment booking
- Preliminary medical questions
- Call routing to human staff

---

## V. REGULATORY COMPLIANCE FRAMEWORK

### 5.1 KVKK Compliance (Turkish GDPR)

**Data Residency:**
- All patient data stored in Turkey
- AWS-TR or TR-Cloud infrastructure
- Automatic data backup to Turkish servers

**Consent Management:**
- Granular consent tracking
- Audit trails for all consents
- Easy revocation mechanisms
- Consent renewal reminders

**Access Controls:**
- Role-based access control (RBAC)
- Field-level encryption
- Automatic timeout after 30 minutes
- Two-factor authentication mandatory

### 5.2 Ministry of Health Integrations

**e-Nabız Integration:**
- Automatic patient record synchronization
- Medication tracking sync
- Allergy information sync

**USS (Üniversal Sağlık Sistemi):**
- Insurance validation
- Patient eligibility checking
- Claim submission automation

**e-Reçete Support:**
- Digital prescription generation
- Pharmacy integration
- Prescription tracking

### 5.3 Health Tourism Compliance

**HealthTürkiye Integration:**
- Accreditation management
- Complication insurance tracking
- Automated reporting
- Patient satisfaction tracking

**USHAŞ (Health Tourism Accreditation):**
- Compliance dashboards
- Automated audit logs
- Quality metrics tracking

---

## VI. FINANCIAL INFRASTRUCTURE

### 6.1 Multi-Currency Billing System

**Supported Currencies:**
- Turkish Lira (TRY)
- US Dollar (USD)
- Euro (EUR)
- British Pound (GBP)
- Saudi Riyal (SAR)
- UAE Dirham (AED)

**Features:**
- Real-time exchange rate updates
- Transparent currency conversion
- Multi-currency invoicing
- Automatic reconciliation

### 6.2 Payment Gateway Integration

**Primary Gateways:**
- **iyzico**: Turkey's largest payment processor
- **PayTR**: Alternative Turkish processor
- **Stripe**: International fallback
- **2Checkout**: Merchant of Record for taxation

**Features:**
- Installment plans (3, 6, 12 months)
- Deposit management
- Payment link generation
- Webhook automation for status updates
- PCI compliance (Level 1)

### 6.3 Financial Analytics

**Executive Dashboards:**
- Real-time revenue tracking
- Patient acquisition cost (PAC)
- Lifetime patient value (LTV)
- Profit margin analysis by treatment type
- Geographic conversion metrics
- Yield management recommendations

---

## VII. PATIENT LIFECYCLE & WORKFLOWS

### 7.1 Patient Journey Map

```
LEAD → QUALIFICATION → CONSULTATION → BOOKING → TRAVEL → TREATMENT → FOLLOW-UP → RETENTION
  │         │              │           │         │         │          │          │
  ├─AI Chat │         ├─Video Call    ├─Payment │         ├─Digital  │          ├─Referral
  ├─Landing │         ├─Diagnostics   │ Capture │         │  Passport│          │ Program
  └─Landing │         └─Treatment     └─Itinerary        └─Remote   └─Analytics
              │            Plan          Updates              Care
              │
         ├─Auto-qualify
         ├─Sentiment Analysis
         └─Lead Score
```

### 7.2 Core Workflows

**New Patient Onboarding:**
1. AI chatbot captures basic info (WhatsApp/Website)
2. Automatic lead scoring
3. Initial questionnaire sent
4. Medical records request
5. AI preliminary analysis
6. Consultation booking
7. Video consultation with dentist
8. Treatment plan generation
9. Cost estimate with payment options

**Treatment Coordination:**
1. Pre-flight medical check
2. Travel itinerary generation
3. Airport transfer assignment
4. Hotel confirmation
5. Pre-operative appointment
6. Operative day coordination
7. Post-operative care scheduling
8. Follow-up appointment booking

**Post-Operative Remote Care:**
1. Daily healing photos upload via app
2. AI-powered complication detection
3. Automated pain/recovery surveys
4. Remote monitoring dashboards
5. Escalation to dentist if needed
6. Monthly follow-up for 6-12 months

---

## VIII. MODULE BREAKDOWN

### Module 1: Clinical Practice Management Core
- Multi-chair scheduling with drag-and-drop
- DICOM/CBCT viewer integrated
- Dental charting (FDI numbering system)
- Digital signatures for consent
- E-prescriptions
- Allergy & medication tracking
- Automated recalls
- WhatsApp appointment reminders
- AI no-show prediction

### Module 2: International Medical Tourism Engine
- Flight tracking integration
- Hotel management & reviews
- VIP transfer coordination with GPS tracking
- Airport pickup scheduling
- Comprehensive itinerary management
- Agency portal with commission tracking
- Referral partner management
- Commission automation

### Module 3: AI Communication System
- Multilingual chatbot (6 languages)
- Sentiment analysis
- WhatsApp integration
- Instagram DM automation
- Voice AI receptionist
- Smart lead qualification
- Automated follow-ups
- Cultural adaptation engine

### Module 4: AI Diagnostic System
- DICOM upload & storage
- CBCT analysis
- Panoramic X-ray analysis
- Tooth segmentation
- Pathology detection
- Caries detection
- Implant planning assistance
- Patient-friendly report generation
- Dentist approval workflow

### Module 5: Regulatory Compliance
- KVKK compliance tracking
- Ministry of Health integrations
- HealthTürkiye reporting
- Audit log system
- Data residency management
- Consent management
- Compliance dashboards

### Module 6: Financial Infrastructure
- Multi-currency billing
- Payment gateway integration
- Installment plan management
- Invoice generation
- Profitability analysis
- Yield management system

### Module 7: Digital Patient Passport App
- Progressive Web App (PWA)
- Live itinerary
- Appointment schedule
- Invoice viewing
- Treatment timeline
- AI diagnostic reports
- Multilingual chat
- Post-op monitoring
- Image upload for healing analysis

### Module 8: Advanced Analytics & BI
- Executive dashboards
- Patient acquisition analytics
- Geographic conversion tracking
- ROI dashboards
- Profit margin analysis
- Marketing attribution
- Predictive analytics
- Forecasting systems

---

## IX. USER ROLES & PERMISSIONS

**Admin:**
- Full system access
- Clinic configuration
- Staff management
- Financial settings
- Compliance management

**Clinic Owner:**
- Clinic dashboard
- Staff oversight
- Financial reports
- Patient overview
- Settings management

**Dentist:**
- Patient medical records
- Treatment planning
- Appointment management
- AI diagnostic review
- Digital notes & signatures

**Hygienist:**
- Treatment notes
- Appointment scheduling
- Patient records (read-only)
- Follow-up management

**Receptionist:**
- Appointment scheduling
- Patient intake
- Payment processing
- Communication management
- Inventory management

**Agency Partner:**
- Patient referral dashboard
- Commission tracking
- Referral analytics
- Patient status updates

**Patient:**
- Medical record access
- Appointment booking
- Treatment timeline
- Invoice viewing
- Chat with clinic
- Post-op monitoring
- Report viewing

---

## X. SECURITY FRAMEWORK

### 10.1 Authentication & Authorization
- OAuth 2.0 + JWT tokens
- Two-factor authentication (2FA)
- Role-based access control (RBAC)
- Field-level encryption
- Automatic session timeout

### 10.2 Data Protection
- AES-256 encryption at rest
- TLS 1.3 for data in transit
- HIPAA-compliant backup
- Regular security audits
- Penetration testing quarterly

### 10.3 Audit & Compliance
- Comprehensive audit logging
- User activity tracking
- Change history for all records
- Immutable logs
- 7-year retention for medical records

---

## XI. DEVOPS ARCHITECTURE

**Containerization:**
- Docker for all services
- Kubernetes for orchestration
- Helm charts for deployment

**CI/CD Pipeline:**
- GitHub Actions
- Automated testing on commit
- Staging environment
- Blue-green deployments
- Automatic rollback on failure

**Monitoring & Observability:**
- Datadog for infrastructure monitoring
- New Relic for APM
- CloudWatch for AWS metrics
- Alert thresholds & escalation

**Disaster Recovery:**
- Automated daily backups
- 1-hour RTO, 30-minute RPO
- Multi-region failover
- Backup restoration testing quarterly

---

## XII. MONETIZATION STRATEGY

### 12.1 SaaS Pricing Model

**Starter Tier:** $999/month
- Up to 5 dentists
- 500 patient records
- Basic scheduling
- Email support

**Professional Tier:** $2,999/month
- Up to 20 dentists
- Unlimited patient records
- Advanced analytics
- API access
- Priority support
- AI diagnostic module

**Enterprise Tier:** Custom pricing
- Unlimited dentists & clinics
- Custom integrations
- Dedicated infrastructure
- White-label options
- 24/7 phone support
- Compliance audit support

**Add-ons:**
- AI Diagnostics: +$500/month
- WhatsApp Integration: +$200/month
- Advanced Analytics: +$300/month
- HealthTürkiye Integration: +$400/month

### 12.2 Additional Revenue Streams
- White-label licensing to DSOs
- Affiliate commissions on travel services
- Premium AI feature subscriptions
- Training & certification programs
- Managed services (hosting, support)

---

## XIII. MVP ROADMAP

**Phase 1 (Months 1-3):**
- Core patient management
- Basic scheduling
- Simple appointment booking
- Email notifications

**Phase 2 (Months 4-6):**
- Payment processing integration
- Medical records management
- AI diagnostic basic integration
- WhatsApp integration

**Phase 3 (Months 7-9):**
- Travel itinerary management
- Advanced AI diagnostics
- Ministry of Health integrations
- Patient portal MVP

**Phase 4 (Months 10-12):**
- Advanced analytics
- Full AI communication system
- Patient mobile app
- Agency portal

---

## XIV. COMPETITIVE ADVANTAGES

1. **Dental-Native:** Built specifically for dental workflows, not generic CRM
2. **AI-First:** Integrated AI diagnostics, communication, and business intelligence
3. **Turkish Compliance:** Native integrations with Ministry of Health, KVKK compliance
4. **Medical Tourism Focus:** Complete travel coordination, multi-currency, multilingual
5. **Healthcare Compliance:** HIPAA, KVKK, Turkish regulations built-in
6. **Modern Architecture:** Cloud-native, scalable, AI-powered
7. **Superior UX:** Luxury medical interface, mobile-first design
8. **Transparent Pricing:** No hidden fees, clear add-ons
9. **Integration Ecosystem:** Seamless connections with 50+ services
10. **White-Label Ready:** Reseller and agency partnership models

---

## XV. 5-YEAR EXPANSION ROADMAP

**Year 1:**
- Launch MVP in Turkey
- 50+ clinic adoption
- $5M ARR

**Year 2:**
- Expand to Middle East (GCC countries)
- Multi-clinic group management
- Advanced financial suite
- 200+ clinic adoption
- $20M ARR

**Year 3:**
- Expand to Europe (UK, Germany, Spain, Poland)
- Full AI platform
- Marketplace for referral partners
- 500+ clinic adoption
- $50M ARR

**Year 4:**
- Global expansion to 15 countries
- Advanced AR/VR diagnosis
- Complete patient ecosystem
- 1000+ clinic adoption
- $100M ARR

**Year 5:**
- IPO preparation
- Full vertical integration of medical tourism
- AI-powered treatment planning with 95%+ accuracy
- 2000+ clinic adoption globally
- $200M ARR

---

## XVI. INVESTOR POSITIONING

**Market Opportunity:**
- Global dental tourism: $40B+ market
- Turkey's share: $3-5B annually
- Growing at 15% CAGR
- Underserved by technology solutions

**Solution:**
- The operating system for dental medical tourism
- Eliminates $5K-10K in annual operational costs per clinic
- Increases patient acquisition by 40%
- Reduces treatment complications by 30%
- Improves profitability by 25%

**Business Model:**
- High-margin SaaS ($36K-$60K ARR per clinic)
- Land-and-expand strategy
- Low churn (<3%)
- 5-year payback period for customers

**Go-to-Market:**
- Direct sales to clinic networks
- Integration with Turkish dental associations
- Conference sponsorships
- Partnership with medical tourism agencies
- Freemium model for new clinics

**Funding Requirement:**
- Series A: $5M for product development & Turkey launch
- Series B: $15M for regional expansion
- Series C: $50M for global scale

---

This comprehensive architecture provides the foundation for a billion-dollar SaaS company.
