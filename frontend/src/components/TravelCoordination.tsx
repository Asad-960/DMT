'use client'

import React, { useState } from 'react'
import { Plane, Hotel, MapPin, Users, Plus, X, Calendar, DollarSign } from 'lucide-react'

interface Itinerary {
  id: string
  patientName: string
  arrivalDate: string
  departureDate: string
  hotel: string
  transfer: string
  status: 'planning' | 'confirmed' | 'completed'
}

const TravelCoordination = () => {
  const [itineraries, setItineraries] = useState<Itinerary[]>([
    {
      id: '1',
      patientName: 'John Smith',
      arrivalDate: '2024-06-10',
      departureDate: '2024-06-17',
      hotel: 'Four Seasons Hotel Istanbul',
      transfer: 'VIP Transfer Service',
      status: 'confirmed',
    },
    {
      id: '2',
      patientName: 'Sarah Johnson',
      arrivalDate: '2024-06-05',
      departureDate: '2024-06-12',
      hotel: 'Ritz-Carlton Istanbul',
      transfer: 'Airport Pickup Included',
      status: 'planning',
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [newItinerary, setNewItinerary] = useState({
    patientName: '',
    arrivalDate: '',
    departureDate: '',
    hotel: '',
    transfer: '',
  })

  const addItinerary = () => {
    if (newItinerary.patientName && newItinerary.arrivalDate && newItinerary.departureDate) {
      setItineraries([
        ...itineraries,
        {
          id: Date.now().toString(),
          ...newItinerary,
          status: 'planning',
        },
      ])
      setNewItinerary({
        patientName: '',
        arrivalDate: '',
        departureDate: '',
        hotel: '',
        transfer: '',
      })
      setShowForm(false)
    }
  }

  const statusColors = {
    planning: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    completed: 'bg-slate-100 text-slate-800',
  }

  const calculateDays = (start: string, end: string) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  }

  const hotels = [
    'Four Seasons Hotel Istanbul',
    'Ritz-Carlton Istanbul',
    'Conrad Istanbul',
    'Hyatt Regency Istanbul',
    'W Istanbul',
  ]

  const transfers = [
    'VIP Transfer Service',
    'Airport Pickup Only',
    'Airport Pickup & Hospital Transfers',
    'Full Transportation Package',
  ]

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Travel & Logistics</h1>
          <p className="text-slate-600 mt-1">Coordinate patient travel and accommodation</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="medical-button-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>New Itinerary</span>
        </button>
      </div>

      {/* New Itinerary Form */}
      {showForm && (
        <div className="medical-card p-6 animate-slideInLeft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Create Patient Itinerary</h3>
            <button onClick={() => setShowForm(false)}>
              <X size={24} className="text-slate-400 hover:text-slate-600" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="medical-label">Patient Name</label>
              <input
                type="text"
                className="medical-input"
                placeholder="Enter patient name"
                value={newItinerary.patientName}
                onChange={(e) => setNewItinerary({ ...newItinerary, patientName: e.target.value })}
              />
            </div>

            <div>
              <label className="medical-label">Arrival Date</label>
              <input
                type="date"
                className="medical-input"
                value={newItinerary.arrivalDate}
                onChange={(e) => setNewItinerary({ ...newItinerary, arrivalDate: e.target.value })}
              />
            </div>

            <div>
              <label className="medical-label">Departure Date</label>
              <input
                type="date"
                className="medical-input"
                value={newItinerary.departureDate}
                onChange={(e) => setNewItinerary({ ...newItinerary, departureDate: e.target.value })}
              />
            </div>

            <div>
              <label className="medical-label">Hotel</label>
              <select
                className="medical-input"
                value={newItinerary.hotel}
                onChange={(e) => setNewItinerary({ ...newItinerary, hotel: e.target.value })}
              >
                <option value="">Select Hotel</option>
                {hotels.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="medical-label">Transfer Service</label>
              <select
                className="medical-input"
                value={newItinerary.transfer}
                onChange={(e) => setNewItinerary({ ...newItinerary, transfer: e.target.value })}
              >
                <option value="">Select Transfer Service</option>
                {transfers.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={addItinerary} className="medical-button-primary">
              Create Itinerary
            </button>
            <button onClick={() => setShowForm(false)} className="medical-button-secondary">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Itineraries Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {itineraries.map((itinerary) => (
          <div key={itinerary.id} className="medical-card p-6 hover:shadow-medical-lg">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{itinerary.patientName}</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${statusColors[itinerary.status]}`}>
                  {itinerary.status.charAt(0).toUpperCase() + itinerary.status.slice(1)}
                </span>
              </div>
              <Plane className="text-cyan-500" size={28} />
            </div>

            {/* Dates */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-3 text-slate-600">
                <Calendar size={18} />
                <span className="font-medium">
                  {itinerary.arrivalDate} → {itinerary.departureDate}
                </span>
                <span className="text-xs bg-slate-100 px-2 py-1 rounded">
                  {calculateDays(itinerary.arrivalDate, itinerary.departureDate)} days
                </span>
              </div>
            </div>

            {/* Hotel */}
            <div className="bg-slate-50 rounded-lg p-4 mb-4">
              <div className="flex items-start space-x-3">
                <Hotel size={20} className="text-blue-500 mt-1" />
                <div>
                  <p className="text-xs text-slate-600 font-semibold">HOTEL</p>
                  <p className="font-medium text-slate-900">{itinerary.hotel}</p>
                </div>
              </div>
            </div>

            {/* Transfer */}
            <div className="bg-slate-50 rounded-lg p-4 mb-4">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-green-500 mt-1" />
                <div>
                  <p className="text-xs text-slate-600 font-semibold">TRANSFER</p>
                  <p className="font-medium text-slate-900">{itinerary.transfer}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-cyan-100 text-cyan-700 font-medium rounded-lg hover:bg-cyan-200 transition-all duration-200">
                View Details
              </button>
              <button className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-all duration-200">
                Share with Patient
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Travel Services */}
      <div className="medical-card p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Available Travel Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Plane, label: 'Flight Tracking', desc: 'Real-time flight updates' },
            { icon: Hotel, label: 'Hotel Management', desc: 'Luxury accommodations' },
            { icon: Users, label: 'VIP Transfers', desc: 'Professional drivers' },
            { icon: MapPin, label: 'Itinerary Planning', desc: 'Complete travel coordination' },
          ].map((service, idx) => {
            const Icon = service.icon
            return (
              <div key={idx} className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-lg text-center hover:shadow-medical transition-all duration-200">
                <Icon size={32} className="mx-auto text-cyan-500 mb-2" />
                <p className="font-semibold text-slate-900">{service.label}</p>
                <p className="text-xs text-slate-600 mt-1">{service.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TravelCoordination
