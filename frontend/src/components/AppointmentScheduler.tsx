'use client'

import React, { useState } from 'react'
import { Plus, Calendar, Clock, User, MapPin, X, ChevronRight } from 'lucide-react'

interface Appointment {
  id: string
  patientName: string
  dentist: string
  date: string
  time: string
  treatment: string
  room: string
  status: 'scheduled' | 'confirmed' | 'completed'
}

const AppointmentScheduler = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      patientName: 'John Smith',
      dentist: 'Dr. Mehmet Özdemir',
      date: '2024-06-15',
      time: '09:00',
      treatment: 'Crown Placement',
      room: 'Operatory 1',
      status: 'scheduled',
    },
    {
      id: '2',
      patientName: 'Sarah Johnson',
      dentist: 'Dr. Ayşe Kılıç',
      date: '2024-06-15',
      time: '10:30',
      treatment: 'Implant Surgery',
      room: 'Operatory 2',
      status: 'confirmed',
    },
    {
      id: '3',
      patientName: 'Ayşe Kaya',
      dentist: 'Dr. Mehmet Özdemir',
      date: '2024-06-16',
      time: '14:00',
      treatment: 'Cleaning & Check-up',
      room: 'Operatory 1',
      status: 'scheduled',
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    dentist: '',
    date: selectedDate,
    time: '',
    treatment: '',
    room: '',
  })

  const addAppointment = () => {
    if (newAppointment.patientName && newAppointment.dentist && newAppointment.time) {
      setAppointments([
        ...appointments,
        {
          id: Date.now().toString(),
          ...newAppointment,
          status: 'scheduled',
        },
      ])
      setNewAppointment({
        patientName: '',
        dentist: '',
        date: selectedDate,
        time: '',
        treatment: '',
        room: '',
      })
      setShowForm(false)
    }
  }

  const dentists = [
    'Dr. Mehmet Özdemir',
    'Dr. Ayşe Kılıç',
    'Dr. Fatih Yilmaz',
    'Dr. Zeynep Çetin',
  ]

  const rooms = ['Operatory 1', 'Operatory 2', 'Operatory 3', 'Consultation']

  const treatments = [
    'Crown Placement',
    'Implant Surgery',
    'Cleaning & Check-up',
    'Root Canal Treatment',
    'Bridge Work',
    'Whitening Treatment',
  ]

  const generateTimeSlots = () => {
    const slots = []
    for (let i = 8; i < 18; i++) {
      for (let j = 0; j < 60; j += 30) {
        const hour = i.toString().padStart(2, '0')
        const minute = j.toString().padStart(2, '0')
        slots.push(`${hour}:${minute}`)
      }
    }
    return slots
  }

  const timeSlots = generateTimeSlots()

  const statusBadge = {
    scheduled: 'bg-blue-100 text-blue-800',
    confirmed: 'bg-green-100 text-green-800',
    completed: 'bg-slate-100 text-slate-800',
  }

  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const date = new Date(selectedDate)
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    const day = i - firstDay + 1

    if (day < 1 || day > daysInMonth) return null
    return new Date(date.getFullYear(), date.getMonth(), day)
  })

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Appointment Scheduler</h1>
          <p className="text-slate-600 mt-1">Manage and schedule patient appointments</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="medical-button-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>New Appointment</span>
        </button>
      </div>

      {/* New Appointment Form */}
      {showForm && (
        <div className="medical-card p-6 animate-slideInLeft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Schedule New Appointment</h3>
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
                placeholder="Select patient"
                value={newAppointment.patientName}
                onChange={(e) => setNewAppointment({ ...newAppointment, patientName: e.target.value })}
              />
            </div>

            <div>
              <label className="medical-label">Dentist</label>
              <select
                className="medical-input"
                value={newAppointment.dentist}
                onChange={(e) => setNewAppointment({ ...newAppointment, dentist: e.target.value })}
              >
                <option value="">Select Dentist</option>
                {dentists.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="medical-label">Date</label>
              <input
                type="date"
                className="medical-input"
                value={newAppointment.date}
                onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
              />
            </div>

            <div>
              <label className="medical-label">Time</label>
              <select
                className="medical-input"
                value={newAppointment.time}
                onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
              >
                <option value="">Select Time</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="medical-label">Treatment</label>
              <select
                className="medical-input"
                value={newAppointment.treatment}
                onChange={(e) => setNewAppointment({ ...newAppointment, treatment: e.target.value })}
              >
                <option value="">Select Treatment</option>
                {treatments.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="medical-label">Room</label>
              <select
                className="medical-input"
                value={newAppointment.room}
                onChange={(e) => setNewAppointment({ ...newAppointment, room: e.target.value })}
              >
                <option value="">Select Room</option>
                {rooms.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={addAppointment} className="medical-button-primary">
              Schedule Appointment
            </button>
            <button onClick={() => setShowForm(false)} className="medical-button-secondary">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="medical-card p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Calendar</h3>
          <div className="space-y-4">
            <input
              type="month"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              value={selectedDate.substring(0, 7)}
              onChange={(e) => setSelectedDate(`${e.target.value}-01`)}
            />

            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center font-semibold text-sm text-slate-600 py-2">
                  {day}
                </div>
              ))}
              {calendarDays.map((date, idx) =>
                date ? (
                  <button
                    key={idx}
                    className={`p-2 rounded text-sm font-medium transition-all duration-200 ${
                      selectedDate.split('T')[0] === date.toISOString().split('T')[0]
                        ? 'bg-blue-500 text-white'
                        : 'hover:bg-slate-100'
                    }`}
                    onClick={() => setSelectedDate(date.toISOString().split('T')[0])}
                  >
                    {date.getDate()}
                  </button>
                ) : (
                  <div key={idx} />
                )
              )}
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Upcoming Appointments</h3>
          {appointments.length === 0 ? (
            <div className="medical-card p-8 text-center">
              <p className="text-slate-500">No appointments scheduled</p>
            </div>
          ) : (
            appointments
              .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime())
              .map((apt) => (
                <div key={apt.id} className="medical-card p-4 hover:shadow-medical-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900">{apt.patientName}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge[apt.status]}`}>
                          {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                        </span>
                      </div>

                      <div className="space-y-2 mt-3">
                        <div className="flex items-center space-x-2 text-slate-600 text-sm">
                          <User size={16} />
                          <span>{apt.dentist}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-slate-600 text-sm">
                          <Calendar size={16} />
                          <span>{apt.date} at {apt.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-slate-600 text-sm">
                          <MapPin size={16} />
                          <span>{apt.room}</span>
                        </div>
                        <div className="text-slate-700 font-medium text-sm mt-2">
                          {apt.treatment}
                        </div>
                      </div>
                    </div>

                    <button className="p-2 hover:bg-slate-100 rounded-lg">
                      <ChevronRight size={20} className="text-slate-400" />
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AppointmentScheduler
