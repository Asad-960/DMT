'use client'

import React, { useState } from 'react'
import { ChevronDown, Plus, AlertTriangle, CheckCircle2, Clock, GripVertical } from 'lucide-react'

interface PatientCard {
  id: string
  name: string
  country: string
  value: number
  currency: string
  location?: string
  kvvk: 'signed' | 'pending'
  payment: 'fully_paid' | 'pending' | 'not_paid'
}

interface PipelineColumn {
  id: string
  title: string
  count: number
  patients: PatientCard[]
}

const MOCK_PIPELINE: PipelineColumn[] = [
  {
    id: 'inquiry',
    title: 'INQUIRY',
    count: 1,
    patients: [
      {
        id: '1',
        name: 'David Smith',
        country: 'United States',
        value: 15400,
        currency: 'USD',
        location: 'Hilton',
        kvvk: 'pending',
        payment: 'not_paid'
      }
    ]
  },
  {
    id: 'ai_diagnostics',
    title: 'AI DIAGNOSTICS',
    count: 1,
    patients: [
      {
        id: '2',
        name: 'Emma Richardson',
        country: 'United Kingdom',
        value: 8500,
        currency: 'GBP',
        location: 'Ritz-Carlton',
        kvvk: 'signed',
        payment: 'pending'
      }
    ]
  },
  {
    id: 'quoting',
    title: 'QUOTING',
    count: 1,
    patients: [
      {
        id: '3',
        name: 'Sophie Martin',
        country: 'France',
        value: 9100,
        currency: 'EUR',
        location: 'Raffles',
        kvvk: 'pending',
        payment: 'not_paid'
      }
    ]
  },
  {
    id: 'logistics_booked',
    title: 'LOGISTICS BOOKED',
    count: 1,
    patients: [
      {
        id: '4',
        name: 'Anna Kowalski',
        country: 'Germany',
        value: 12500,
        currency: 'EUR',
        location: 'SwissÔtel',
        kvvk: 'pending',
        payment: 'pending'
      }
    ]
  },
  {
    id: 'in_treatment',
    title: 'IN-TREATMENT',
    count: 1,
    patients: [
      {
        id: '5',
        name: 'Fatima Al-Rashid',
        country: 'Saudi Arabia',
        value: 18200,
        currency: 'USD',
        location: 'Mandarin',
        kvvk: 'signed',
        payment: 'fully_paid'
      }
    ]
  }
]

const PatientCardComponent = ({ patient }: { patient: PatientCard }) => {
  const paymentColors = {
    fully_paid: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Fully Paid' },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pending' },
    not_paid: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Not Paid' }
  }

  const kvvkColors = {
    signed: { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: '✓' },
    pending: { bg: 'bg-red-100', text: 'text-red-700', icon: '⚠' }
  }

  const payment = paymentColors[patient.payment]
  const kvvk = kvvkColors[patient.kvvk]

  return (
    <div className="medical-card p-4 space-y-3 hover:shadow-md transition-all cursor-grab active:cursor-grabbing">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-slate-900 text-sm">{patient.name}</p>
          <p className="text-xs text-slate-500">{patient.country}</p>
        </div>
        <GripVertical size={16} className="text-slate-300" />
      </div>

      <div className="space-y-2 py-2 border-t border-b border-slate-100">
        <p className="font-bold text-slate-900">
          Value: {patient.currency} {patient.value.toLocaleString()}
        </p>
        {patient.location && (
          <p className="text-xs text-slate-600">📍 {patient.location}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${kvvk.bg} ${kvvk.text}`}>
          {kvvk.icon}
        </div>
        <div className={`flex-1 px-2 py-1 rounded text-xs font-semibold ${payment.bg} ${payment.text}`}>
          {payment.label}
        </div>
      </div>
    </div>
  )
}

export default function PatientPipeline() {
  const [searchQuery, setSearchQuery] = useState('')
  const [complianceDropdown, setComplianceDropdown] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Interactive Patient Pipeline Board</h1>
          <p className="text-slate-600">
            Manage clinical conversion, international logistics, and payments in one interface.
          </p>
        </div>
        <input
          type="text"
          placeholder="Search active patients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="medical-input w-64"
        />
      </div>

      {/* Pipeline Board */}
      <div className="grid grid-cols-5 gap-4">
        {MOCK_PIPELINE.map((column) => (
          <div key={column.id} className="space-y-3">
            {/* Column Header */}
            <div className="medical-card p-4 bg-gradient-to-br from-slate-50 to-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">{column.title}</h3>
                <span className="bg-blue-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {column.count}
                </span>
              </div>
            </div>

            {/* Patient Cards */}
            <div className="space-y-3 min-h-96">
              {column.patients.map((patient) => (
                <PatientCardComponent key={patient.id} patient={patient} />
              ))}

              {/* Add Card Button */}
              <button className="w-full border-2 border-dashed border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 text-slate-600 hover:text-blue-600">
                <Plus size={18} />
                <span className="text-sm font-medium">Add patient</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Sections */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left: Logistics Orchestration */}
        <div className="medical-card p-6 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <AlertTriangle size={20} className="text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">LOGISTICS ORCHESTRATION</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-600 uppercase">Assigned Flight</p>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="font-semibold text-slate-900">TK1984</span>
                <select className="border border-slate-200 rounded px-2 py-1 text-xs bg-white">
                  <option>Confirmed</option>
                  <option>Pending</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-600 uppercase">Contracted Hotel</p>
              <p className="p-3 bg-slate-50 rounded-lg font-semibold text-slate-900">Ritz-Carlton Istanbul</p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-600 uppercase">VIP Airport Transfer Shuttle</p>
              <select className="w-full border border-slate-200 rounded px-3 py-2 text-sm bg-white">
                <option>Scheduled</option>
                <option>Confirmed</option>
                <option>Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Center: Financial Core & Links */}
        <div className="medical-card p-6 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <CheckCircle2 size={20} className="text-emerald-600" />
            <h2 className="text-lg font-bold text-slate-900">FINANCIAL CORE & LINKS</h2>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-slate-600 mb-1">Target Quota:</p>
              <p className="font-bold text-slate-900">GBP 8500</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-600 mb-1">Deposit Collected:</p>
              <p className="font-bold text-slate-900">GBP 2400</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-600 mb-1">Payment Gateway:</p>
              <p className="font-semibold text-slate-900">Iyzico Turkey (3DS)</p>
            </div>

            <button className="w-full medical-button-primary py-2 text-sm font-semibold">
              GENERATE IYZICO PAYMENT LINK
            </button>

            <button className="w-full border-2 border-slate-200 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
              SIMULATE GATEWAY WEBHOOK SUCCESS
            </button>
          </div>
        </div>

        {/* Right: Compliance Action */}
        <div className="medical-card p-6 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Clock size={20} className="text-slate-600" />
            <h2 className="text-lg font-bold text-slate-900">COMPLIANCE ACTION</h2>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-slate-600 mb-2">KVVK Consent Signatures:</p>
              <p className="text-xs font-semibold text-emerald-600">✓ Signed</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-600 mb-2">CRM PIPELINE STAGE LOCATION</p>
              <div className="relative">
                <button
                  onClick={() => setComplianceDropdown(!complianceDropdown)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 font-semibold flex items-center justify-between hover:bg-slate-100 transition-colors"
                >
                  <span>AI Diagnostics</span>
                  <ChevronDown size={16} className={`transition-transform ${complianceDropdown ? 'rotate-180' : ''}`} />
                </button>
                {complianceDropdown && (
                  <div className="absolute top-12 left-0 right-0 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
                    {['Inquiry', 'AI Diagnostics', 'Quoting', 'Logistics', 'In-Treatment'].map((stage) => (
                      <button
                        key={stage}
                        className="w-full text-left px-4 py-2 hover:bg-blue-50 text-sm text-slate-700 first:rounded-t-lg last:rounded-b-lg"
                        onClick={() => setComplianceDropdown(false)}
                      >
                        {stage}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-600 mb-2">MINISTRY OF HEALTH SYNC DETAILS</p>
              <p className="text-xs text-slate-700 mb-3">USS Record Sync:</p>
              <button className="w-full px-4 py-2 text-sm font-semibold text-orange-700 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors">
                Pending Action
              </button>
              <p className="text-xs text-slate-500 mt-2">Sync and push to e-Nabaz now</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
