'use client'

import React, { useState } from 'react'
import { Plane, Hotel, Car, Calendar, MapPin, CheckCircle2, AlertCircle, FileText, Download, Send, Plus, Search } from 'lucide-react'

interface LogisticsRecord {
  id: string
  patientName: string
  flight: {
    arrivalNo: string
    arrivalDate: string
    arrivalTime: string
    departureNo: string
    departureDate: string
    departureTime: string
  }
  hotel: {
    name: string
    checkIn: string
    checkOut: string
  }
  transfer: {
    company: string
    status: 'dispatched' | 'pending' | 'completed'
    type: 'VIP Van' | 'Standard'
  }
  status: 'arriving_today' | 'in_country' | 'departed' | 'upcoming'
}

const MOCK_RECORDS: LogisticsRecord[] = [
  {
    id: 'TRV-8492',
    patientName: 'Emma Richardson',
    flight: { arrivalNo: 'TK1984', arrivalDate: '2024-05-28', arrivalTime: '14:30', departureNo: 'TK1985', departureDate: '2024-06-04', departureTime: '09:15' },
    hotel: { name: 'Ritz-Carlton Istanbul', checkIn: '2024-05-28', checkOut: '2024-06-04' },
    transfer: { company: 'Elite Transfers TR', status: 'dispatched', type: 'VIP Van' },
    status: 'arriving_today'
  },
  {
    id: 'TRV-8493',
    patientName: 'David Smith',
    flight: { arrivalNo: 'BA676', arrivalDate: '2024-05-28', arrivalTime: '18:45', departureNo: 'BA677', departureDate: '2024-06-05', departureTime: '11:00' },
    hotel: { name: 'Four Seasons Bosphorus', checkIn: '2024-05-28', checkOut: '2024-06-05' },
    transfer: { company: 'Elite Transfers TR', status: 'pending', type: 'VIP Van' },
    status: 'arriving_today'
  },
  {
    id: 'TRV-8494',
    patientName: 'Sophie Martin',
    flight: { arrivalNo: 'AF1390', arrivalDate: '2024-05-25', arrivalTime: '16:20', departureNo: 'AF1391', departureDate: '2024-06-02', departureTime: '10:45' },
    hotel: { name: 'Swissôtel The Bosphorus', checkIn: '2024-05-25', checkOut: '2024-06-02' },
    transfer: { company: 'VIP Drive Istanbul', status: 'completed', type: 'Standard' },
    status: 'in_country'
  }
]

export default function TravelCoordination() {
  const [activeTab, setActiveTab] = useState<'itineraries' | 'manifests'>('itineraries')
  const [records] = useState<LogisticsRecord[]>(MOCK_RECORDS)
  const [manifestGenerated, setManifestGenerated] = useState(false)

  const arrivingToday = records.filter(r => r.status === 'arriving_today')

  const generateManifest = () => {
    setManifestGenerated(true)
    setTimeout(() => {
      alert("Manifest successfully dispatched to Elite Transfers TR and Ritz-Carlton Istanbul via secure link.")
    }, 800)
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Logistics & Travel Control</h1>
          <p className="text-slate-600 mt-1">Seamlessly coordinate physical patient journeys, flights, and VIP transfers.</p>
        </div>
        <div className="flex space-x-3">
          <button className="medical-button-secondary flex items-center space-x-2">
            <Search size={18} />
            <span>Search</span>
          </button>
          <button className="medical-button-primary flex items-center space-x-2">
            <Plus size={18} />
            <span>New Itinerary</span>
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-4 gap-6">
        <div className="medical-card p-5 border-l-4 border-blue-500">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">Arriving Today</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{arrivingToday.length}</p>
            </div>
            <Plane className="text-blue-500" size={24} />
          </div>
        </div>
        <div className="medical-card p-5 border-l-4 border-emerald-500">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">In-Country Patients</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{records.filter(r => r.status === 'in_country' || r.status === 'arriving_today').length}</p>
            </div>
            <MapPin className="text-emerald-500" size={24} />
          </div>
        </div>
        <div className="medical-card p-5 border-l-4 border-purple-500">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">Active Hotel Bookings</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">12</p>
            </div>
            <Hotel className="text-purple-500" size={24} />
          </div>
        </div>
        <div className="medical-card p-5 border-l-4 border-orange-500">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">Transfers Pending</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{records.filter(r => r.transfer.status === 'pending').length}</p>
            </div>
            <Car className="text-orange-500" size={24} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg w-max">
        <button
          onClick={() => setActiveTab('itineraries')}
          className={`flex items-center space-x-2 py-2 px-6 rounded-md text-sm font-semibold transition-all ${
            activeTab === 'itineraries' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Calendar size={18} />
          <span>Patient Itineraries</span>
        </button>
        <button
          onClick={() => setActiveTab('manifests')}
          className={`flex items-center space-x-2 py-2 px-6 rounded-md text-sm font-semibold transition-all ${
            activeTab === 'manifests' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          <FileText size={18} />
          <span>Daily Arrival Manifests</span>
        </button>
      </div>

      {/* Content */}
      {activeTab === 'itineraries' && (
        <div className="space-y-4 animate-slideInLeft">
          {records.map((record) => (
            <div key={record.id} className="medical-card p-0 overflow-hidden flex flex-col md:flex-row border border-slate-200 hover:shadow-lg transition-shadow">
              {/* Left Side: Patient & Status */}
              <div className="p-6 bg-slate-50 w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col justify-center">
                <span className="text-xs font-bold text-slate-400 mb-1">{record.id}</span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{record.patientName}</h3>
                {record.status === 'arriving_today' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold w-max">
                    <Plane size={12} /> Arriving Today
                  </span>
                )}
                {record.status === 'in_country' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold w-max">
                    <MapPin size={12} /> In Country
                  </span>
                )}
              </div>

              {/* Middle & Right: Flight, Hotel, Transfer */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                
                {/* Flight Tracking */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-blue-600 font-bold mb-2">
                    <Plane size={18} /> Flight Status
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Arr: {record.flight.arrivalNo}</span>
                      <span className="font-bold text-slate-900">{record.flight.arrivalTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Dep: {record.flight.departureNo}</span>
                      <span className="font-bold text-slate-900">{record.flight.departureDate}</span>
                    </div>
                  </div>
                </div>

                {/* Hotel Booking */}
                <div className="p-5 space-y-3 bg-white">
                  <div className="flex items-center gap-2 text-purple-600 font-bold mb-2">
                    <Hotel size={18} /> Accommodation
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="font-bold text-slate-900">{record.hotel.name}</div>
                    <div className="flex justify-between items-center text-xs text-slate-500 bg-slate-50 p-2 rounded">
                      <span>{record.hotel.checkIn}</span>
                      <span className="text-slate-300">→</span>
                      <span>{record.hotel.checkOut}</span>
                    </div>
                  </div>
                </div>

                {/* VIP Transfer */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-orange-600 font-bold mb-2">
                    <Car size={18} /> VIP Transfer
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="font-semibold text-slate-700">{record.transfer.company}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-slate-100 px-2 py-1 rounded font-semibold text-slate-600">
                        {record.transfer.type}
                      </span>
                      {record.transfer.status === 'dispatched' ? (
                         <span className="flex items-center gap-1 text-xs font-bold text-blue-600">
                           <CheckCircle2 size={14} /> Dispatched
                         </span>
                      ) : record.transfer.status === 'pending' ? (
                         <span className="flex items-center gap-1 text-xs font-bold text-orange-600">
                           <AlertCircle size={14} /> Pending Dispatch
                         </span>
                      ) : (
                         <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                           <CheckCircle2 size={14} /> Completed
                         </span>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'manifests' && (
        <div className="grid grid-cols-3 gap-6 animate-slideInRight">
          {/* Manifest Generator */}
          <div className="col-span-1 space-y-6">
            <div className="medical-card p-6 border-t-4 border-indigo-500">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Generate Arrival Manifest</h2>
              <p className="text-sm text-slate-600 mb-6">Automatically aggregate all arriving flights and hotel assignments for today to dispatch to vendors.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">Target Date</label>
                  <input type="date" className="medical-input mt-1 w-full" defaultValue="2024-05-28" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">Vendor Company</label>
                  <select className="medical-input mt-1 w-full">
                    <option>Elite Transfers TR</option>
                    <option>VIP Drive Istanbul</option>
                  </select>
                </div>
                
                <button 
                  onClick={generateManifest}
                  disabled={manifestGenerated}
                  className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors ${
                    manifestGenerated ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                  }`}
                >
                  {manifestGenerated ? <><CheckCircle2 size={18} /> Manifest Dispatched</> : <><Send size={18} /> Generate & Dispatch</>}
                </button>
              </div>
            </div>
          </div>

          {/* Manifest Preview */}
          <div className="col-span-2">
            <div className="medical-card p-8 bg-slate-50 relative min-h-[500px]">
              {manifestGenerated ? (
                <div className="bg-white border border-slate-200 shadow-lg p-8 animate-fadeIn">
                  <div className="flex justify-between items-start border-b border-slate-200 pb-6 mb-6">
                    <div>
                      <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Arrival Manifest</h1>
                      <p className="text-slate-500 text-sm mt-1">Date: 28 May 2024</p>
                      <p className="text-slate-500 text-sm">Vendor: Elite Transfers TR</p>
                    </div>
                    <div className="text-right">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded flex items-center justify-center font-bold text-xl ml-auto mb-2">
                        D
                      </div>
                      <p className="text-xs font-bold text-slate-400">DMT CRM SECURE DISPATCH</p>
                    </div>
                  </div>

                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-slate-100 text-slate-600 uppercase text-xs">
                        <th className="p-3 font-bold rounded-tl-lg">Time</th>
                        <th className="p-3 font-bold">Flight</th>
                        <th className="p-3 font-bold">Patient / Pax</th>
                        <th className="p-3 font-bold">Drop-off (Hotel)</th>
                        <th className="p-3 font-bold rounded-tr-lg">Vehicle Required</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {arrivingToday.map((record, idx) => (
                        <tr key={idx}>
                          <td className="p-3 font-bold text-slate-900">{record.flight.arrivalTime}</td>
                          <td className="p-3 font-semibold text-blue-600">{record.flight.arrivalNo}</td>
                          <td className="p-3 font-semibold text-slate-800">{record.patientName} (1 Pax)</td>
                          <td className="p-3 text-slate-600">{record.hotel.name}</td>
                          <td className="p-3">
                            <span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold text-slate-600">{record.transfer.type}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center">
                    <p className="text-xs text-slate-400">Auto-generated by DentOS CRM • Confirmed receipt required.</p>
                    <button className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800">
                      <Download size={16} /> Download PDF
                    </button>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                  <FileText size={64} className="mb-4 opacity-20" />
                  <p className="font-semibold">Select date and generate manifest to preview.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
