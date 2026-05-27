'use client'

import React, { useState } from 'react'
import { Plus, Search, Edit2, Trash2, MapPin, Mail, Phone, Globe, Filter } from 'lucide-react'

interface Patient {
  id: string
  name: string
  email: string
  phone: string
  type: 'local' | 'international'
  country?: string
  status: 'lead' | 'booked' | 'treatment' | 'follow_up'
  lastVisit?: string
  nextAppointment?: string
}

const PatientManagement = () => {
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+442071838750',
      type: 'international',
      country: 'GB',
      status: 'treatment',
      lastVisit: '2024-05-20',
      nextAppointment: '2024-06-15',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1-555-0147',
      type: 'international',
      country: 'US',
      status: 'booked',
      nextAppointment: '2024-06-10',
    },
    {
      id: '3',
      name: 'Ayşe Kaya',
      email: 'ayse@example.com',
      phone: '+905551234567',
      type: 'local',
      status: 'follow_up',
      lastVisit: '2024-05-18',
      nextAppointment: '2024-06-01',
    },
    {
      id: '4',
      name: 'Michel Dupont',
      email: 'michel@example.com',
      phone: '+33612345678',
      type: 'international',
      country: 'FR',
      status: 'lead',
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'local' | 'international'>('all')
  const [showNewForm, setShowNewForm] = useState(false)
  const [newPatient, setNewPatient] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'international' as const,
    country: '',
  })

  const filteredPatients = patients.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       p.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchType = filterType === 'all' || p.type === filterType
    return matchSearch && matchType
  })

  const addPatient = () => {
    if (newPatient.name && newPatient.email) {
      setPatients([
        ...patients,
        {
          id: Date.now().toString(),
          ...newPatient,
          status: 'lead',
        },
      ])
      setNewPatient({ name: '', email: '', phone: '', type: 'international', country: '' })
      setShowNewForm(false)
    }
  }

  const statusColors = {
    lead: 'bg-blue-100 text-blue-800',
    booked: 'bg-green-100 text-green-800',
    treatment: 'bg-purple-100 text-purple-800',
    follow_up: 'bg-yellow-100 text-yellow-800',
  }

  const patientTypeColors = {
    local: 'bg-slate-100 text-slate-800',
    international: 'bg-cyan-100 text-cyan-800',
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Patient Management</h1>
          <p className="text-slate-600 mt-1">Manage and track all your patients</p>
        </div>
        <button
          onClick={() => setShowNewForm(!showNewForm)}
          className="medical-button-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>New Patient</span>
        </button>
      </div>

      {/* New Patient Form */}
      {showNewForm && (
        <div className="medical-card p-6 animate-slideInLeft">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Add New Patient</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="medical-label">Full Name</label>
              <input
                type="text"
                className="medical-input"
                placeholder="John Smith"
                value={newPatient.name}
                onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
              />
            </div>
            <div>
              <label className="medical-label">Email</label>
              <input
                type="email"
                className="medical-input"
                placeholder="john@example.com"
                value={newPatient.email}
                onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
              />
            </div>
            <div>
              <label className="medical-label">Phone</label>
              <input
                type="tel"
                className="medical-input"
                placeholder="+44 207 1838750"
                value={newPatient.phone}
                onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="medical-label">Patient Type</label>
              <select
                className="medical-input"
                value={newPatient.type}
                onChange={(e) => setNewPatient({ ...newPatient, type: e.target.value as any })}
              >
                <option value="international">International</option>
                <option value="local">Local</option>
              </select>
            </div>
            {newPatient.type === 'international' && (
              <div>
                <label className="medical-label">Country</label>
                <input
                  type="text"
                  className="medical-input"
                  placeholder="GB"
                  value={newPatient.country}
                  onChange={(e) => setNewPatient({ ...newPatient, country: e.target.value })}
                />
              </div>
            )}
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={addPatient} className="medical-button-primary">
              Add Patient
            </button>
            <button
              onClick={() => setShowNewForm(false)}
              className="medical-button-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Search & Filter */}
      <div className="medical-card p-4 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search patients by name or email..."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-slate-500" />
          <select
            className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
          >
            <option value="all">All Patients</option>
            <option value="local">Local</option>
            <option value="international">International</option>
          </select>
        </div>
      </div>

      {/* Patients List */}
      <div className="space-y-3">
        {filteredPatients.length === 0 ? (
          <div className="medical-card p-8 text-center">
            <p className="text-slate-500">No patients found</p>
          </div>
        ) : (
          filteredPatients.map((patient) => (
            <div key={patient.id} className="medical-card p-5 hover:shadow-medical-lg cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {patient.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900">{patient.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-slate-600 mt-1">
                        <span className="flex items-center space-x-1">
                          <Mail size={14} />
                          <span>{patient.email}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Phone size={14} />
                          <span>{patient.phone}</span>
                        </span>
                        {patient.country && (
                          <span className="flex items-center space-x-1">
                            <Globe size={14} />
                            <span>{patient.country}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${patientTypeColors[patient.type]}`}>
                      {patient.type.charAt(0).toUpperCase() + patient.type.slice(1)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[patient.status]}`}>
                      {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                    </span>
                  </div>

                  {patient.nextAppointment && (
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Next Appointment</p>
                      <p className="font-semibold text-slate-900">{patient.nextAppointment}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-all duration-200">
                      <Edit2 size={18} className="text-slate-600" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg transition-all duration-200">
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Patients', value: patients.length },
          { label: 'International', value: patients.filter(p => p.type === 'international').length },
          { label: 'Local', value: patients.filter(p => p.type === 'local').length },
          { label: 'In Treatment', value: patients.filter(p => p.status === 'treatment').length },
        ].map((stat, idx) => (
          <div key={idx} className="medical-card p-4 text-center">
            <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PatientManagement
