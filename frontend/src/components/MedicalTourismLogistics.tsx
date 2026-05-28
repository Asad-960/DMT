'use client'

import React, { useState } from 'react'
import { Plane, Hotel, MapPin, Users, Plus, X, Calendar, DollarSign, FileText, Send, CheckCircle2, AlertCircle, Truck, Clock, Globe } from 'lucide-react'

interface Flight {
  id: string
  airline: string
  flightNumber: string
  origin: string
  destination: string
  departureTime: string
  arrivalTime: string
  date: string
  passengers: string[]
}

interface HotelBooking {
  id: string
  hotelName: string
  checkInDate: string
  checkOutDate: string
  roomType: string
  specialRequests: string
  guests: string[]
  bookingRef: string
  status: 'confirmed' | 'pending' | 'cancelled'
}

interface TransferService {
  id: string
  patient: string
  pickupLocation: string
  dropoffLocation: string
  pickupTime: string
  vehicleType: string
  status: 'scheduled' | 'completed' | 'cancelled'
}

interface ArrivalManifest {
  date: string
  flights: Flight[]
  hotels: HotelBooking[]
  transfers: TransferService[]
}

export default function MedicalTourismLogistics() {
  const [activeTab, setActiveTab] = useState<'flights' | 'hotels' | 'transfers' | 'manifests'>('flights')
  
  const [flights, setFlights] = useState<Flight[]>([
    {
      id: '1',
      airline: 'Turkish Airlines',
      flightNumber: 'TK2101',
      origin: 'London Heathrow',
      destination: 'Istanbul Atatürk',
      departureTime: '14:30',
      arrivalTime: '20:45',
      date: '2024-06-15',
      passengers: ['Emma Richardson'],
    },
    {
      id: '2',
      airline: 'Lufthansa',
      flightNumber: 'LH1205',
      origin: 'Frankfurt',
      destination: 'Istanbul Atatürk',
      departureTime: '16:00',
      arrivalTime: '21:15',
      date: '2024-06-15',
      passengers: ['Anna Kowalski', 'Sophie Martin'],
    },
  ])

  const [hotels, setHotels] = useState<HotelBooking[]>([
    {
      id: '1',
      hotelName: 'Four Seasons Hotel Istanbul',
      checkInDate: '2024-06-15',
      checkOutDate: '2024-06-22',
      roomType: 'Deluxe Ocean View Suite',
      specialRequests: 'Late checkout, hypoallergenic bedding',
      guests: ['Emma Richardson'],
      bookingRef: 'FS4S-A1B2C3',
      status: 'confirmed',
    },
    {
      id: '2',
      hotelName: 'Ritz-Carlton Istanbul',
      checkInDate: '2024-06-15',
      checkOutDate: '2024-06-20',
      roomType: 'Executive Suite',
      specialRequests: 'Twin beds, quiet floor',
      guests: ['Anna Kowalski', 'Sophie Martin'],
      bookingRef: 'RC-D4E5F6',
      status: 'confirmed',
    },
  ])

  const [transfers, setTransfers] = useState<TransferService[]>([
    {
      id: '1',
      patient: 'Emma Richardson',
      pickupLocation: 'Istanbul Atatürk Airport',
      dropoffLocation: 'Four Seasons Hotel Istanbul',
      pickupTime: '21:00',
      vehicleType: 'Premium Mercedes-Benz',
      status: 'scheduled',
    },
    {
      id: '2',
      patient: 'Anna Kowalski',
      pickupLocation: 'Istanbul Atatürk Airport',
      dropoffLocation: 'Ritz-Carlton Istanbul',
      pickupTime: '21:15',
      vehicleType: 'Luxury SUV',
      status: 'scheduled',
    },
    {
      id: '3',
      patient: 'Sophie Martin',
      pickupLocation: 'Ritz-Carlton Istanbul',
      dropoffLocation: 'DMT Dental Clinic',
      pickupTime: '08:30',
      vehicleType: 'Premium Mercedes-Benz',
      status: 'scheduled',
    },
  ])

  const [showFlightForm, setShowFlightForm] = useState(false)
  const [showHotelForm, setShowHotelForm] = useState(false)
  const [showTransferForm, setShowTransferForm] = useState(false)

  const generateManifest = () => {
    const manifest = `
DAILY ARRIVAL MANIFEST
Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}

📊 SUMMARY:
- Total Arriving Patients: ${flights.reduce((sum, f) => sum + f.passengers.length, 0)}
- Active Hotels: ${[...new Set(hotels.map(h => h.hotelName))].length}
- Scheduled Transfers: ${transfers.filter(t => t.status === 'scheduled').length}

✈️ INBOUND FLIGHTS:
${flights.map(f => `
${f.airline} ${f.flightNumber}
From: ${f.origin} → To: ${f.destination}
Departure: ${f.departureTime} | Arrival: ${f.arrivalTime}
Passengers: ${f.passengers.join(', ')}
`).join('')}

🏨 HOTEL ACCOMMODATIONS:
${hotels.map(h => `
${h.hotelName} (Booking Ref: ${h.bookingRef})
Check-in: ${h.checkInDate} | Check-out: ${h.checkOutDate}
Guests: ${h.guests.join(', ')}
Room: ${h.roomType}
Special Requests: ${h.specialRequests}
`).join('')}

🚗 TRANSFER SCHEDULE:
${transfers.filter(t => t.status === 'scheduled').map(t => `
${t.patient}
Pickup: ${t.pickupLocation} at ${t.pickupTime}
Destination: ${t.dropoffLocation}
Vehicle: ${t.vehicleType}
`).join('')}

PREPARED FOR DISPATCH TO:
- Transfer Companies
- Hotel Administrators
- Clinic Staff
    `
    return manifest
  }

  const exportManifest = () => {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(generateManifest()))
    element.setAttribute('download', `Arrival_Manifest_${new Date().toISOString().split('T')[0]}.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Medical Tourism Logistics</h1>
        <p className="text-slate-600">Seamlessly manage patient travel, accommodations, and transfers for international medical tourists</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b border-slate-200">
        {[
          { id: 'flights', label: '✈️ Flights', count: flights.length },
          { id: 'hotels', label: '🏨 Hotels', count: hotels.length },
          { id: 'transfers', label: '🚗 Transfers', count: transfers.length },
          { id: 'manifests', label: '📋 Manifests', count: 0 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 font-semibold transition-all border-b-2 flex items-center space-x-2 ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count > 0 && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{tab.count}</span>}
          </button>
        ))}
      </div>

      {/* FLIGHTS TAB */}
      {activeTab === 'flights' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Flight Tracking</h2>
            <button
              onClick={() => setShowFlightForm(!showFlightForm)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              <Plus size={18} />
              <span>Add Flight</span>
            </button>
          </div>

          {showFlightForm && (
            <div className="medical-card p-6 bg-blue-50 border-l-4 border-blue-600">
              <p className="text-sm text-slate-600 mb-4">Add new flight booking...</p>
              <button onClick={() => setShowFlightForm(false)} className="text-xs text-slate-500 hover:text-slate-700">
                Cancel
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            {flights.map((flight) => (
              <div key={flight.id} className="medical-card p-6 hover:shadow-lg transition-all">
                <div className="grid grid-cols-2 gap-6">
                  {/* Flight Info */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-slate-600 font-semibold">Airline & Flight</p>
                      <p className="text-lg font-bold text-slate-900">{flight.airline} {flight.flightNumber}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-600">Departure</p>
                        <p className="font-semibold text-slate-900">{flight.departureTime}</p>
                        <p className="text-xs text-slate-500">{flight.origin}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">Arrival</p>
                        <p className="font-semibold text-slate-900">{flight.arrivalTime}</p>
                        <p className="text-xs text-slate-500">{flight.destination}</p>
                      </div>
                    </div>
                  </div>

                  {/* Passengers & Status */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-slate-600 font-semibold">Passengers ({flight.passengers.length})</p>
                      <div className="space-y-1">
                        {flight.passengers.map((passenger, idx) => (
                          <div key={idx} className="text-sm font-medium text-slate-900 flex items-center space-x-2">
                            <Users size={14} />
                            <span>{passenger}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <Calendar size={14} className="text-slate-500" />
                      <span className="text-sm text-slate-600">{flight.date}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="border-t border-slate-200 mt-4 pt-4 flex justify-between">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1">
                    <Send size={14} />
                    <span>Send to Transfer Co.</span>
                  </button>
                  <button className="text-sm text-slate-500 hover:text-slate-700 flex items-center space-x-1">
                    <X size={14} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HOTELS TAB */}
      {activeTab === 'hotels' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Hotel Accommodations</h2>
            <button
              onClick={() => setShowHotelForm(!showHotelForm)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              <Plus size={18} />
              <span>Add Booking</span>
            </button>
          </div>

          {showHotelForm && (
            <div className="medical-card p-6 bg-blue-50 border-l-4 border-blue-600">
              <p className="text-sm text-slate-600 mb-4">Add new hotel booking...</p>
              <button onClick={() => setShowHotelForm(false)} className="text-xs text-slate-500 hover:text-slate-700">
                Cancel
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="medical-card p-6 hover:shadow-lg transition-all">
                <div className="grid grid-cols-3 gap-6">
                  {/* Hotel Info */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-600 font-semibold">Hotel</p>
                      <p className="text-lg font-bold text-slate-900">{hotel.hotelName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600">Room Type</p>
                      <p className="font-semibold text-slate-900">{hotel.roomType}</p>
                    </div>
                  </div>

                  {/* Dates & Guests */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-600">Check-in / Check-out</p>
                      <p className="font-semibold text-slate-900">{hotel.checkInDate}</p>
                      <p className="text-sm text-slate-600">to {hotel.checkOutDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600">Guests ({hotel.guests.length})</p>
                      <div className="space-y-0.5">
                        {hotel.guests.map((guest, idx) => (
                          <p key={idx} className="text-sm font-medium text-slate-900">{guest}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Status & Contact */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-600">Status</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        hotel.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        hotel.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {hotel.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600">Booking Ref</p>
                      <p className="font-mono font-semibold text-slate-900">{hotel.bookingRef}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600">Special Requests</p>
                      <p className="text-sm text-slate-700">{hotel.specialRequests}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="border-t border-slate-200 mt-4 pt-4 flex justify-between">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1">
                    <Send size={14} />
                    <span>Send to Hotel</span>
                  </button>
                  <button className="text-sm text-slate-500 hover:text-slate-700 flex items-center space-x-1">
                    <X size={14} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TRANSFERS TAB */}
      {activeTab === 'transfers' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">VIP Airport Transfer Coordination</h2>
            <button
              onClick={() => setShowTransferForm(!showTransferForm)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              <Plus size={18} />
              <span>Add Transfer</span>
            </button>
          </div>

          {showTransferForm && (
            <div className="medical-card p-6 bg-blue-50 border-l-4 border-blue-600">
              <p className="text-sm text-slate-600 mb-4">Add new transfer booking...</p>
              <button onClick={() => setShowTransferForm(false)} className="text-xs text-slate-500 hover:text-slate-700">
                Cancel
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            {transfers.map((transfer) => (
              <div key={transfer.id} className="medical-card p-6 hover:shadow-lg transition-all border-l-4 border-blue-500">
                <div className="grid grid-cols-2 gap-6 items-center">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-slate-600 font-semibold">Patient</p>
                      <p className="text-lg font-bold text-slate-900">{transfer.patient}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600">Vehicle Type</p>
                      <p className="font-semibold text-slate-900">{transfer.vehicleType}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="text-xs text-slate-600">Pickup</p>
                        <p className="font-semibold text-slate-900">{transfer.pickupTime}</p>
                      </div>
                      <Truck size={20} className="text-blue-500" />
                      <div className="flex-1">
                        <p className="text-xs text-slate-600">Dropoff</p>
                        <p className="font-semibold text-slate-900">{transfer.dropoffLocation}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={14} className="text-slate-500" />
                      <span className="text-sm text-slate-600">{transfer.pickupLocation}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      transfer.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                      transfer.status === 'completed' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {transfer.status}
                    </span>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1">
                      <Send size={14} />
                      <span>Confirm</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MANIFESTS TAB */}
      {activeTab === 'manifests' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Daily Arrival Manifests</h2>
            <button
              onClick={exportManifest}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all"
            >
              <FileText size={18} />
              <span>Export Manifest</span>
            </button>
          </div>

          {/* Manifest Preview */}
          <div className="medical-card p-8">
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle size={16} className="text-blue-600" />
                <span className="font-semibold text-blue-900">Daily Manifest Ready</span>
              </div>
              <p className="text-sm text-blue-800">
                This manifest will be securely dispatched to transfer companies and hotel administrators
              </p>
            </div>

            <div className="bg-slate-900 text-slate-100 p-6 rounded-lg font-mono text-xs overflow-x-auto mb-6">
              <pre>{generateManifest()}</pre>
            </div>

            {/* Recipients */}
            <div>
              <h3 className="font-bold text-slate-900 mb-4">Recipients</h3>
              <div className="space-y-3">
                {[
                  { name: 'Turkish Transfer Services Ltd.', type: 'Transfer Company', email: 'dispatch@turkishtransfer.com' },
                  { name: 'Four Seasons Istanbul', type: 'Hotel', email: 'reservations@fourseasons-istanbul.com' },
                  { name: 'Ritz-Carlton Istanbul', type: 'Hotel', email: 'info@ritzcarlton-istanbul.com' },
                ].map((recipient, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{recipient.name}</p>
                      <p className="text-xs text-slate-600">{recipient.type} • {recipient.email}</p>
                    </div>
                    <CheckCircle2 className="text-green-600" size={20} />
                  </div>
                ))}
              </div>
            </div>

            {/* Send Button */}
            <button className="w-full mt-6 flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all font-semibold">
              <Send size={18} />
              <span>Send Manifest to All Recipients</span>
            </button>
          </div>

          {/* Logistics Summary */}
          <div className="grid grid-cols-4 gap-4">
            <div className="medical-card p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {flights.reduce((sum, f) => sum + f.passengers.length, 0)}
              </div>
              <p className="text-sm text-slate-600">Arriving Patients</p>
            </div>
            <div className="medical-card p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{hotels.length}</div>
              <p className="text-sm text-slate-600">Active Hotels</p>
            </div>
            <div className="medical-card p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{transfers.filter(t => t.status === 'scheduled').length}</div>
              <p className="text-sm text-slate-600">Scheduled Transfers</p>
            </div>
            <div className="medical-card p-6 text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">100%</div>
              <p className="text-sm text-slate-600">Anxiety Mitigation</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
