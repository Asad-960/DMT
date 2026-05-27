// Types for the DMT platform

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'admin' | 'dentist' | 'hygienist' | 'receptionist' | 'agency' | 'patient'
  clinicId: string
  avatar?: string
  createdAt: Date
}

export interface Clinic {
  id: string
  name: string
  city: string
  address: string
  phone: string
  email: string
  ministryLicenseNumber: string
  subscriptionTier: 'starter' | 'professional' | 'enterprise'
  maxDentists: number
  maxPatients: number
  createdAt: Date
}

export interface Patient {
  id: string
  clinicId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: Date
  nationality: string
  patientType: 'local' | 'international'
  status: 'lead' | 'booked' | 'treatment' | 'follow_up' | 'completed'
  leadSource: string
  insuranceProvider?: string
  kvkkConsent: boolean
  gdprConsent: boolean
  createdAt: Date
}

export interface MedicalRecord {
  id: string
  patientId: string
  clinicId: string
  chiefComplaint: string
  medicalHistory: Record<string, any>
  allergies: string[]
  medications: string[]
  radiographs: Radiograph[]
  treatmentPlan: TreatmentPlan
  aiDiagnosis?: AIDiagnosis
  createdAt: Date
}

export interface Radiograph {
  id: string
  patientId: string
  type: 'panoramic' | 'periapical' | 'bitewings' | 'occlusal' | 'cbct'
  fileUrl: string
  dicomMetadata?: Record<string, any>
  aiAnalysisStatus: 'pending' | 'completed' | 'failed'
  aiFindings?: Record<string, any>
  uploadedAt: Date
}

export interface TreatmentPlan {
  id: string
  patientId: string
  dentistId: string
  procedures: TreatmentProcedure[]
  estimatedTotalCost: number
  estimatedDuration: number
  estimatedNumVisits: number
  status: 'draft' | 'proposed' | 'approved' | 'active'
  createdAt: Date
}

export interface TreatmentProcedure {
  id: string
  tooth: string
  type: string
  material: string
  estimatedCost: number
  duration: number
}

export interface AIDiagnosis {
  id: string
  patientId: string
  medicalRecordId: string
  findings: Finding[]
  overallConfidenceScore: number
  recommendedTreatments: RecommendedTreatment[]
  reviewedBy?: string
  approvalStatus: 'pending' | 'approved' | 'rejected'
  createdAt: Date
}

export interface Finding {
  tooth: string
  finding: string
  confidence: number
  severity: 'mild' | 'moderate' | 'severe'
}

export interface RecommendedTreatment {
  tooth: string
  treatment: string
  material: string
  estimatedCost: number
  estimatedDuration: number
}

export interface Appointment {
  id: string
  patientId: string
  clinicId: string
  dentistId: string
  roomId: string
  appointmentDate: Date
  durationMinutes: number
  treatmentType: string
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled'
  reminderSent: boolean
  notes?: string
  createdAt: Date
}

export interface TravelItinerary {
  id: string
  patientId: string
  clinicId: string
  arrivalDate: Date
  departureDate: Date
  hotelId: string
  hotelName: string
  hotelAddress: string
  transfers: Transfer[]
  appointmentIds: string[]
  status: 'planning' | 'confirmed' | 'completed'
  createdAt: Date
}

export interface Transfer {
  id: string
  itineraryId: string
  transferType: 'airport_pickup' | 'airport_dropoff' | 'clinic_transfer'
  pickupLocation: string
  dropoffLocation: string
  pickupDateTime: Date
  status: 'scheduled' | 'confirmed' | 'in_transit' | 'completed'
  currentLocation?: GeoLocation
}

export interface GeoLocation {
  latitude: number
  longitude: number
  address: string
  timestamp: Date
}

export interface Payment {
  id: string
  patientId: string
  clinicId: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  paymentMethod: string
  gatewayTransactionId: string
  description: string
  createdAt: Date
  completedAt?: Date
}

export interface Invoice {
  id: string
  invoiceNumber: string
  patientId: string
  clinicId: string
  lineItems: InvoiceLineItem[]
  subtotal: number
  tax: number
  total: number
  currency: string
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  dueDate: Date
  createdAt: Date
}

export interface InvoiceLineItem {
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Communication {
  id: string
  patientId: string
  communicationType: 'email' | 'sms' | 'whatsapp' | 'chat'
  recipientPhone: string
  message: string
  status: 'sent' | 'delivered' | 'read' | 'failed'
  sentAt: Date
}

export interface Analytics {
  totalPatients: number
  newPatients: number
  totalRevenue: number
  appointmentsCompleted: number
  appointmentsCancelled: number
  noShowRate: number
  patientSatisfactionScore: number
}

export interface AuditLog {
  id: string
  userId: string
  clinicId: string
  action: string
  entityType: string
  entityId: string
  oldValues?: Record<string, any>
  newValues?: Record<string, any>
  timestamp: Date
}
