# DMT API Documentation

## Authentication

All requests require authentication via JWT Bearer token:

```
Authorization: Bearer <jwt_token>
```

### Login Endpoint

```
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "doctor@clinic.com",
  "password": "secure_password"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "doctor@clinic.com",
    "firstName": "Mehmet",
    "lastName": "Özdemir",
    "role": "dentist",
    "clinic_id": "uuid"
  },
  "expiresIn": 86400
}
```

---

## Patient Management APIs

### Create Patient

```
POST /api/v1/patients
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john@example.com",
  "phone": "+442071838750",
  "dateOfBirth": "1985-06-15",
  "nationality": "GB",
  "patientType": "international",
  "passportNumber": "AB123456",
  "kvkkConsent": true,
  "gdprConsent": true,
  "medicalHistory": {
    "diabetes": false,
    "hypertension": false,
    "allergies": ["Penicillin"]
  }
}

Response (201 Created):
{
  "id": "uuid",
  "firstName": "John",
  "lastName": "Smith",
  "email": "john@example.com",
  "patientType": "international",
  "sourceCountry": "GB",
  "status": "lead",
  "createdAt": "2024-05-27T10:30:00Z",
  "medicalHistory": {...}
}
```

### List Patients

```
GET /api/v1/patients?status=lead&country=GB&limit=50&offset=0

Response:
{
  "data": [
    {
      "id": "uuid",
      "firstName": "John",
      "lastName": "Smith",
      "email": "john@example.com",
      "patientType": "international",
      "status": "lead",
      "createdAt": "2024-05-27T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 150,
    "limit": 50,
    "offset": 0,
    "hasMore": true
  }
}
```

### Get Patient Details

```
GET /api/v1/patients/{patientId}

Response:
{
  "id": "uuid",
  "firstName": "John",
  "lastName": "Smith",
  "email": "john@example.com",
  "phone": "+442071838750",
  "patientType": "international",
  "status": "booked",
  "medicalRecords": [
    {
      "id": "uuid",
      "chiefComplaint": "Wants to replace old crowns",
      "allergies": ["Penicillin"],
      "medications": [],
      "radiographs": [
        {
          "id": "uuid",
          "type": "panoramic",
          "uploadedAt": "2024-05-20T14:00:00Z",
          "url": "https://cdn.dmt.com/radiographs/uuid.jpg"
        }
      ],
      "treatmentPlan": {
        "treatments": [
          {
            "id": "uuid",
            "tooth": "16",
            "type": "crown",
            "material": "zirconia",
            "estimatedCost": 450,
            "duration": 120
          }
        ],
        "totalCost": 1200,
        "duration": 360,
        "visits": 3
      },
      "aiDiagnosis": {
        "id": "uuid",
        "findings": [
          {
            "tooth": "16",
            "finding": "Existing crown with decay at margin",
            "confidence": 0.94
          }
        ],
        "recommendations": ["Replace with new crown", "Check bite alignment"],
        "approvedBy": "dentist_id",
        "approvedAt": "2024-05-22T10:00:00Z"
      }
    }
  ],
  "appointments": [...],
  "payments": [...]
}
```

### Update Patient

```
PUT /api/v1/patients/{patientId}
Content-Type: application/json

{
  "firstName": "Jonathan",
  "phone": "+442071838751",
  "medicalHistory": {
    "diabetes": true,
    "hypertension": false,
    "allergies": ["Penicillin", "Ibuprofen"]
  }
}

Response (200 OK):
{
  "id": "uuid",
  "firstName": "Jonathan",
  "phone": "+442071838751",
  "medicalHistory": {...},
  "updatedAt": "2024-05-27T11:00:00Z"
}
```

---

## Medical Records APIs

### Upload Radiograph

```
POST /api/v1/patients/{patientId}/medical-records/radiographs
Content-Type: multipart/form-data

FormData:
- file: <image_file>
- type: panoramic | periapical | cbct | occlusal
- tooth_number: 16 (optional)

Response (201 Created):
{
  "id": "uuid",
  "patientId": "uuid",
  "type": "panoramic",
  "uploadedAt": "2024-05-27T11:30:00Z",
  "url": "https://cdn.dmt.com/radiographs/uuid.jpg",
  "dicomMetadata": {
    "studyDate": "2024-05-27",
    "manufacturer": "Planmeca",
    "studyDescription": "Full Mouth Panoramic"
  }
}
```

### Create Medical Record

```
POST /api/v1/patients/{patientId}/medical-records
Content-Type: application/json

{
  "chiefComplaint": "Wants to replace old crowns and fix chipped tooth",
  "allergies": ["Penicillin"],
  "medications": ["Lisinopril"],
  "medicalHistory": {
    "diabetes": false,
    "hypertension": true,
    "cardiacConditions": false,
    "bleedingDisorders": false
  },
  "socialHistory": {
    "smoker": false,
    "alcoholUser": false
  }
}

Response (201 Created):
{
  "id": "uuid",
  "patientId": "uuid",
  "chiefComplaint": "Wants to replace old crowns and fix chipped tooth",
  "allergies": ["Penicillin"],
  "medications": ["Lisinopril"],
  "createdAt": "2024-05-27T11:30:00Z"
}
```

### Get AI Diagnosis

```
GET /api/v1/patients/{patientId}/medical-records/{recordId}/ai-diagnosis

Response:
{
  "id": "uuid",
  "medicalRecordId": "uuid",
  "radiographAnalysis": {
    "panoramic": {
      "findings": [
        {
          "tooth": "16",
          "finding": "Crown restoration with secondary caries",
          "confidence": 0.94,
          "severity": "moderate"
        },
        {
          "tooth": "11",
          "finding": "Enamel loss, chipped edge",
          "confidence": 0.89,
          "severity": "mild"
        }
      ]
    }
  },
  "recommendations": {
    "treatments": [
      {
        "tooth": "16",
        "treatment": "Crown replacement",
        "material": "Zirconia",
        "estimatedCost": 450,
        "estimatedTime": 120
      },
      {
        "tooth": "11",
        "treatment": "Composite restoration",
        "material": "Composite resin",
        "estimatedCost": 150,
        "estimatedTime": 30
      }
    ],
    "totalEstimatedCost": 600,
    "totalEstimatedTime": 150,
    "visits": 2
  },
  "generatedAt": "2024-05-27T12:00:00Z",
  "approvedBy": "dentist_uuid",
  "approvedAt": "2024-05-27T12:30:00Z",
  "dentistNotes": "Agreed with diagnosis. Patient has good oral hygiene."
}
```

---

## Appointment APIs

### Get Available Slots

```
GET /api/v1/appointments/availability?clinicId=uuid&dentistId=uuid&date=2024-06-15&duration=60

Response:
{
  "date": "2024-06-15",
  "dentist": {
    "id": "uuid",
    "firstName": "Mehmet",
    "lastName": "Özdemir"
  },
  "availableSlots": [
    {
      "startTime": "09:00",
      "endTime": "10:00",
      "room": {
        "id": "uuid",
        "name": "Operatory 1"
      }
    },
    {
      "startTime": "10:30",
      "endTime": "11:30",
      "room": {
        "id": "uuid",
        "name": "Operatory 2"
      }
    },
    {
      "startTime": "14:00",
      "endTime": "15:00",
      "room": {
        "id": "uuid",
        "name": "Operatory 1"
      }
    }
  ]
}
```

### Schedule Appointment

```
POST /api/v1/appointments
Content-Type: application/json

{
  "patientId": "uuid",
  "dentistId": "uuid",
  "clinicId": "uuid",
  "appointmentDate": "2024-06-15T09:00:00Z",
  "duration": 60,
  "treatmentType": "crown",
  "roomId": "uuid",
  "notes": "Prefers morning appointments"
}

Response (201 Created):
{
  "id": "uuid",
  "patient": {
    "id": "uuid",
    "firstName": "John",
    "lastName": "Smith",
    "email": "john@example.com",
    "phone": "+442071838750"
  },
  "dentist": {
    "id": "uuid",
    "firstName": "Mehmet",
    "lastName": "Özdemir"
  },
  "clinic": {
    "id": "uuid",
    "name": "Istanbul Dental Clinic"
  },
  "appointmentDate": "2024-06-15T09:00:00Z",
  "duration": 60,
  "treatmentType": "crown",
  "room": {
    "id": "uuid",
    "name": "Operatory 1"
  },
  "status": "scheduled",
  "reminderSent": false,
  "createdAt": "2024-05-27T13:00:00Z"
}
```

### Cancel Appointment

```
DELETE /api/v1/appointments/{appointmentId}

Response (200 OK):
{
  "id": "uuid",
  "status": "cancelled",
  "cancelledAt": "2024-05-27T13:30:00Z",
  "reason": "Patient requested cancellation"
}
```

---

## Travel & Logistics APIs

### Create Travel Itinerary

```
POST /api/v1/itineraries
Content-Type: application/json

{
  "patientId": "uuid",
  "arrivalDate": "2024-06-10",
  "departureDate": "2024-06-17",
  "hotel": {
    "name": "Four Seasons Hotel Istanbul",
    "address": "Çırağan Caddesi, Istanbul",
    "checkIn": "2024-06-10",
    "checkOut": "2024-06-17",
    "roomType": "deluxe_suite",
    "nights": 7
  },
  "transfer": {
    "pickupLocation": "Istanbul International Airport",
    "pickupDateTime": "2024-06-10T14:30:00Z",
    "dropoffLocation": "Four Seasons Hotel Istanbul",
    "dropoffDateTime": "2024-06-10T16:00:00Z",
    "serviceType": "vip_transfer",
    "notes": "Patient prefers female driver"
  },
  "appointments": [
    {
      "appointmentId": "uuid",
      "date": "2024-06-12T09:00:00Z",
      "type": "consultation"
    },
    {
      "appointmentId": "uuid",
      "date": "2024-06-13T10:00:00Z",
      "type": "treatment"
    },
    {
      "appointmentId": "uuid",
      "date": "2024-06-15T14:00:00Z",
      "type": "follow_up"
    }
  ]
}

Response (201 Created):
{
  "id": "uuid",
  "patientId": "uuid",
  "arrivalDate": "2024-06-10",
  "departureDate": "2024-06-17",
  "hotel": {...},
  "transfer": {
    "id": "uuid",
    "status": "confirmed",
    "driverName": "Ayşe Yilmaz",
    "driverPhone": "+905551234567",
    "vehicleDetails": {
      "make": "Mercedes-Benz",
      "model": "E-Class",
      "color": "black",
      "licensePlate": "34ABC1234"
    }
  },
  "appointments": [...],
  "createdAt": "2024-05-27T14:00:00Z"
}
```

### Get Transfer Tracking

```
GET /api/v1/transfers/{transferId}/tracking

Response:
{
  "id": "uuid",
  "itineraryId": "uuid",
  "patientId": "uuid",
  "status": "in_transit",
  "currentLocation": {
    "latitude": 41.2949,
    "longitude": 28.9541,
    "address": "Istanbul Airport, Turkey",
    "timestamp": "2024-06-10T14:35:00Z"
  },
  "destination": {
    "latitude": 41.0550,
    "longitude": 29.0159,
    "address": "Four Seasons Hotel Istanbul, Turkey",
    "estimatedArrival": "2024-06-10T16:00:00Z"
  },
  "driver": {
    "name": "Ayşe Yilmaz",
    "phone": "+905551234567",
    "rating": 4.9,
    "vehicleDetails": {...}
  }
}
```

### Update Itinerary

```
PUT /api/v1/itineraries/{itineraryId}
Content-Type: application/json

{
  "hotel": {
    "name": "Ritz-Carlton Istanbul",
    "address": "Akaretler Mahallesi, Istanbul",
    "checkIn": "2024-06-10",
    "checkOut": "2024-06-17"
  }
}

Response (200 OK):
{
  "id": "uuid",
  "patientId": "uuid",
  "hotel": {...},
  "updatedAt": "2024-05-27T14:30:00Z"
}
```

---

## Payment APIs

### Process Payment

```
POST /api/v1/payments/process
Content-Type: application/json

{
  "patientId": "uuid",
  "clinicId": "uuid",
  "amount": 1200,
  "currency": "USD",
  "paymentMethod": "credit_card",
  "installments": 3,
  "description": "Crown replacement for tooth 16",
  "cardDetails": {
    "cardNumber": "4532111111111111",
    "expiryMonth": 12,
    "expiryYear": 2026,
    "cvv": "123",
    "cardHolderName": "John Smith"
  }
}

Response (201 Created):
{
  "id": "uuid",
  "patientId": "uuid",
  "clinicId": "uuid",
  "amount": 1200,
  "currency": "USD",
  "status": "completed",
  "paymentMethod": "credit_card",
  "installments": 3,
  "installmentPlans": [
    {
      "installmentNumber": 1,
      "amount": 400,
      "dueDate": "2024-06-15",
      "status": "paid"
    },
    {
      "installmentNumber": 2,
      "amount": 400,
      "dueDate": "2024-07-15",
      "status": "pending"
    },
    {
      "installmentNumber": 3,
      "amount": 400,
      "dueDate": "2024-08-15",
      "status": "pending"
    }
  ],
  "gatewayTransactionId": "iyzico_12345678",
  "processedAt": "2024-05-27T14:45:00Z"
}
```

### Generate Payment Link

```
POST /api/v1/payments/link
Content-Type: application/json

{
  "patientId": "uuid",
  "clinicId": "uuid",
  "amount": 600,
  "currency": "USD",
  "description": "Remaining balance for crown treatment",
  "expiryDays": 7
}

Response (201 Created):
{
  "id": "uuid",
  "paymentLink": "https://pay.dmt.com/link/xyz123",
  "qrCode": "https://cdn.dmt.com/qrcodes/xyz123.png",
  "expiresAt": "2024-06-03T14:50:00Z",
  "status": "active"
}
```

### Get Invoice

```
GET /api/v1/invoices/{invoiceId}

Response:
{
  "id": "uuid",
  "invoiceNumber": "INV-2024-001234",
  "patient": {
    "firstName": "John",
    "lastName": "Smith",
    "email": "john@example.com",
    "passport": "AB123456"
  },
  "clinic": {
    "name": "Istanbul Dental Clinic",
    "address": "Nisantasi, Istanbul",
    "licenseNumber": "TR-2024-1234"
  },
  "lineItems": [
    {
      "description": "Crown restoration - Tooth 16",
      "quantity": 1,
      "unitPrice": 450,
      "total": 450,
      "tax": 90
    },
    {
      "description": "Composite restoration - Tooth 11",
      "quantity": 1,
      "unitPrice": 150,
      "total": 150,
      "tax": 30
    }
  ],
  "subtotal": 600,
  "tax": 120,
  "total": 720,
  "currency": "USD",
  "issuedDate": "2024-05-27",
  "dueDate": "2024-06-27",
  "paymentTerms": "Due upon treatment completion"
}
```

---

## Communication APIs

### Send WhatsApp Message

```
POST /api/v1/communications/whatsapp
Content-Type: application/json

{
  "patientId": "uuid",
  "message": "Hi John! Your appointment is confirmed for June 15 at 9:00 AM with Dr. Mehmet. Please arrive 15 minutes early.",
  "template": "appointment_reminder",
  "language": "en"
}

Response (200 OK):
{
  "messageId": "uuid",
  "to": "+442071838750",
  "status": "sent",
  "timestamp": "2024-05-27T15:00:00Z"
}
```

### Send SMS Reminder

```
POST /api/v1/communications/sms
Content-Type: application/json

{
  "patientId": "uuid",
  "message": "Reminder: Your appointment with Istanbul Dental is tomorrow at 9:00 AM.",
  "reminderType": "appointment_reminder"
}

Response (200 OK):
{
  "messageId": "uuid",
  "to": "+442071838750",
  "status": "sent"
}
```

### Get Chat History

```
GET /api/v1/communications/chat/{patientId}?limit=50

Response:
{
  "patientId": "uuid",
  "messages": [
    {
      "id": "uuid",
      "sender": "patient",
      "message": "What is the cost of crown treatment?",
      "timestamp": "2024-05-25T10:00:00Z"
    },
    {
      "id": "uuid",
      "sender": "ai_assistant",
      "message": "Crown treatment typically costs $350-500 depending on material. A dentist will provide exact quote after diagnosis.",
      "timestamp": "2024-05-25T10:01:00Z"
    },
    {
      "id": "uuid",
      "sender": "patient",
      "message": "Can I schedule a consultation?",
      "timestamp": "2024-05-25T10:05:00Z"
    },
    {
      "id": "uuid",
      "sender": "ai_assistant",
      "message": "Yes! I can help you schedule. What date would you prefer?",
      "timestamp": "2024-05-25T10:06:00Z"
    }
  ]
}
```

---

## Analytics APIs

### Get Clinic Dashboard

```
GET /api/v1/analytics/dashboard?clinicId=uuid&period=month

Response:
{
  "period": {
    "startDate": "2024-05-01",
    "endDate": "2024-05-31"
  },
  "overview": {
    "totalPatients": 145,
    "newPatients": 32,
    "totalRevenue": 58500,
    "revenueCurrency": "USD",
    "appointmentsCompleted": 127,
    "appointmentsCancelled": 8,
    "noShowRate": 0.05,
    "patientSatisfactionScore": 4.7
  },
  "patientAcquisition": {
    "sourceBreakdown": {
      "organic": 15,
      "agency": 12,
      "paid_ads": 5
    },
    "geographicDistribution": {
      "GB": 10,
      "DE": 8,
      "US": 7,
      "TR": 7
    },
    "costPerAcquisition": 187.50,
    "lifetimeValue": 2850
  },
  "financial": {
    "totalRevenue": 58500,
    "totalCosts": 18500,
    "grossProfit": 40000,
    "profitMargin": 0.68,
    "profitByTreatmentType": {
      "crown": {
        "volume": 32,
        "revenue": 14400,
        "profit": 10800,
        "margin": 0.75
      },
      "implant": {
        "volume": 12,
        "revenue": 24000,
        "profit": 19200,
        "margin": 0.80
      },
      "cleaning": {
        "volume": 40,
        "revenue": 4000,
        "profit": 2400,
        "margin": 0.60
      }
    }
  },
  "appointments": {
    "scheduled": 38,
    "completed": 127,
    "cancelled": 8,
    "noShow": 6,
    "averageDuration": 58,
    "utilizationRate": 0.85
  },
  "predictions": {
    "expectedRevenueNextMonth": 62000,
    "expectedNewPatientsNextMonth": 35,
    "cancellationRiskPatients": [
      {
        "patientId": "uuid",
        "riskScore": 0.78,
        "reason": "No interaction in 30 days"
      }
    ]
  }
}
```

### Get Patient Acquisition Analytics

```
GET /api/v1/analytics/acquisition?clinicId=uuid&period=quarter

Response:
{
  "period": "Q2 2024",
  "totalNewPatients": 98,
  "sources": {
    "organic": {
      "count": 45,
      "percentage": 0.46,
      "costPerAcquisition": 0
    },
    "referral_agency": {
      "count": 38,
      "percentage": 0.39,
      "costPerAcquisition": 250
    },
    "paid_ads": {
      "count": 15,
      "percentage": 0.15,
      "costPerAcquisition": 450
    }
  },
  "conversionFunnel": {
    "leads": 320,
    "consultations": 156,
    "bookings": 98,
    "conversionRate": 0.306
  },
  "geographicAnalysis": {
    "GB": {
      "count": 32,
      "percentage": 0.33,
      "averageRevenue": 1850
    },
    "DE": {
      "count": 28,
      "percentage": 0.29,
      "averageRevenue": 1620
    },
    "FR": {
      "count": 18,
      "percentage": 0.18,
      "averageRevenue": 1750
    }
  }
}
```

---

## Error Response Format

All errors follow this standard format:

```
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Invalid request parameters",
    "details": {
      "field": "email",
      "issue": "Invalid email format"
    },
    "timestamp": "2024-05-27T15:30:00Z",
    "requestId": "req_12345678"
  }
}
```

Common error codes:
- `INVALID_REQUEST` (400)
- `UNAUTHORIZED` (401)
- `FORBIDDEN` (403)
- `NOT_FOUND` (404)
- `CONFLICT` (409)
- `RATE_LIMITED` (429)
- `INTERNAL_SERVER_ERROR` (500)
- `SERVICE_UNAVAILABLE` (503)

---

## Rate Limiting

- Free tier: 100 requests/minute
- Professional tier: 1,000 requests/minute
- Enterprise tier: Unlimited with SLA

Rate limit headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 956
X-RateLimit-Reset: 1727456400
```

---

## Webhooks

Supported webhook events:
- `patient.created`
- `patient.updated`
- `appointment.scheduled`
- `appointment.completed`
- `appointment.cancelled`
- `payment.completed`
- `payment.failed`
- `ai_diagnosis.ready`
- `transfer.location_updated`

Webhook payload:
```json
{
  "id": "webhook_event_uuid",
  "event": "appointment.scheduled",
  "timestamp": "2024-05-27T15:35:00Z",
  "data": {
    "appointmentId": "uuid",
    "patientId": "uuid",
    "appointmentDate": "2024-06-15T09:00:00Z"
  }
}
```

To register webhook: `POST /api/v1/webhooks`

---

This API documentation provides comprehensive coverage of all major endpoints for the DMT platform.
