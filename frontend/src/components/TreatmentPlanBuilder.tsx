'use client'

import React, { useState } from 'react'
import { Plus, X, Download, Share2, AlertCircle, Smile, Tooth, Calendar, DollarSign, FileText, Upload, Settings } from 'lucide-react'

interface TreatmentPhase {
  id: string
  name: string
  type: 'root_canal' | 'implant' | 'orthodontics' | 'cleaning' | 'extraction' | 'filling'
  teeth: number[]
  startDate: string
  endDate: string
  duration: number
  cost: number
  currency: string
  status: 'planned' | 'in_progress' | 'completed'
  notes: string
}

interface MedicalHistory {
  allergies: string[]
  chronicMedications: string[]
  medicalConditions: string[]
  surgicalHistory: string[]
}

interface PatientEDR {
  id: string
  name: string
  dob: string
  gender: 'male' | 'female' | 'other'
  country: string
  email: string
  phone: string
  medicalHistory: MedicalHistory
  xrayFiles: string[]
  cbctFiles: string[]
  periodontalChart: Record<number, { plaque: number; bleeding: number; depth: number }>
  treatmentPlans: TreatmentPhase[]
}

const MOCK_PATIENT: PatientEDR = {
  id: '1',
  name: 'Emma Richardson',
  dob: '1985-03-15',
  gender: 'female',
  country: 'United Kingdom',
  email: 'emma.richardson@example.com',
  phone: '+44 20 7123 4567',
  medicalHistory: {
    allergies: ['Penicillin', 'Latex'],
    chronicMedications: ['Levothyroxine (Hypothyroidism)'],
    medicalConditions: ['Type 2 Diabetes', 'Hypertension'],
    surgicalHistory: ['Appendectomy (2005)']
  },
  xrayFiles: ['Panoramic X-Ray 2024.jpg', 'Periapical #16.jpg'],
  cbctFiles: ['CBCT Full Mouth 2024.dcm'],
  periodontalChart: {
    1: { plaque: 2, bleeding: 1, depth: 3 },
    2: { plaque: 1, bleeding: 0, depth: 2 },
    3: { plaque: 0, bleeding: 0, depth: 2 },
  },
  treatmentPlans: [
    {
      id: '1',
      name: 'Implant Surgery #16',
      type: 'implant',
      teeth: [16],
      startDate: '2024-07-15',
      endDate: '2024-07-22',
      duration: 7,
      cost: 3500,
      currency: 'GBP',
      status: 'planned',
      notes: 'Bone graft may be required. Monitor healing for 4 months before crown placement.'
    },
    {
      id: '2',
      name: 'Root Canal Treatment #26',
      type: 'root_canal',
      teeth: [26],
      startDate: '2024-06-20',
      endDate: '2024-06-27',
      duration: 7,
      cost: 1200,
      currency: 'GBP',
      status: 'planned',
      notes: 'Post-op sensitivity expected. Follow-up after 2 weeks.'
    }
  ]
}

const typeColors: Record<string, string> = {
  root_canal: 'bg-blue-100 text-blue-700',
  implant: 'bg-purple-100 text-purple-700',
  orthodontics: 'bg-pink-100 text-pink-700',
  cleaning: 'bg-green-100 text-green-700',
  extraction: 'bg-orange-100 text-orange-700',
  filling: 'bg-yellow-100 text-yellow-700',
}

const typeLabels: Record<string, string> = {
  root_canal: 'Root Canal',
  implant: 'Implant',
  orthodontics: 'Orthodontics',
  cleaning: 'Cleaning',
  extraction: 'Extraction',
  filling: 'Filling',
}

const ToothChartItem = ({ tooth, status }: { tooth: number; status?: string }) => {
  const getColor = () => {
    switch (status) {
      case 'healthy':
        return 'bg-emerald-400'
      case 'caries':
        return 'bg-blue-400'
      case 'treatment':
        return 'bg-purple-400'
      case 'loss':
        return 'bg-amber-400'
      default:
        return 'bg-slate-200'
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm ${getColor()} cursor-pointer hover:shadow-lg transition-all`}>
        {tooth}
      </div>
      <span className="text-xs text-slate-500 mt-1">{tooth}</span>
    </div>
  )
}

export default function TreatmentPlanBuilder() {
  const [patient, setPatient] = useState<PatientEDR>(MOCK_PATIENT)
  const [selectedPhase, setSelectedPhase] = useState<TreatmentPhase | null>(patient.treatmentPlans[0] || null)
  const [showNewPhaseForm, setShowNewPhaseForm] = useState(false)
  const [editingHistory, setEditingHistory] = useState(false)
  const [newAllergyInput, setNewAllergyInput] = useState('')
  const [totalCost, setTotalCost] = useState(
    patient.treatmentPlans.reduce((sum, phase) => sum + phase.cost, 0)
  )

  const addAllergy = () => {
    if (newAllergyInput.trim()) {
      setPatient({
        ...patient,
        medicalHistory: {
          ...patient.medicalHistory,
          allergies: [...patient.medicalHistory.allergies, newAllergyInput]
        }
      })
      setNewAllergyInput('')
    }
  }

  const removeAllergy = (index: number) => {
    setPatient({
      ...patient,
      medicalHistory: {
        ...patient.medicalHistory,
        allergies: patient.medicalHistory.allergies.filter((_, i) => i !== index)
      }
    })
  }

  const handleExportTreatmentPlan = () => {
    const planText = `
DENTAL TREATMENT PLAN
Patient: ${patient.name}
Date Generated: ${new Date().toLocaleDateString()}

MEDICAL BACKGROUND:
- Allergies: ${patient.medicalHistory.allergies.join(', ') || 'None'}
- Chronic Medications: ${patient.medicalHistory.chronicMedications.join(', ') || 'None'}
- Medical Conditions: ${patient.medicalHistory.medicalConditions.join(', ') || 'None'}

TREATMENT PHASES:
${patient.treatmentPlans.map((phase, idx) => `
${idx + 1}. ${phase.name}
   Type: ${typeLabels[phase.type]}
   Duration: ${phase.duration} days (${phase.startDate} to ${phase.endDate})
   Cost: ${phase.currency} ${phase.cost}
   Notes: ${phase.notes}
`).join('')}

TOTAL TREATMENT COST: ${patient.treatmentPlans[0]?.currency || 'GBP'} ${totalCost}
ESTIMATED TIMELINE: ${patient.treatmentPlans.length > 0 ? Math.max(...patient.treatmentPlans.map(p => p.duration)) + ' weeks' : 'TBD'}
    `
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(planText))
    element.setAttribute('download', `Treatment_Plan_${patient.name.replace(' ', '_')}.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Treatment Plan Builder & EDR</h1>
        <p className="text-slate-600">Create comprehensive multi-visit treatment plans with integrated electronic dental records</p>
      </div>

      {/* Patient Info & Alerts */}
      <div className="grid grid-cols-3 gap-6">
        {/* Patient Info Card */}
        <div className="medical-card p-6 col-span-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-3xl shadow-md">
                  👩‍🦰
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{patient.name}</h2>
                  <p className="text-slate-600 text-sm">DOB: {patient.dob} | {patient.gender}</p>
                  <p className="text-slate-600 text-sm">{patient.country} • {patient.email}</p>
                </div>
              </div>
            </div>
            <Settings size={24} className="text-slate-400 cursor-pointer hover:text-slate-600" />
          </div>
        </div>

        {/* Medical Alerts */}
        <div className="medical-card p-6 bg-red-50 border-l-4 border-red-400">
          <div className="flex items-start space-x-3">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-red-900">Medical Alerts</h3>
              <div className="mt-2 space-y-1">
                {patient.medicalHistory.allergies.map((allergy, idx) => (
                  <p key={idx} className="text-sm text-red-700">⚠️ Allergic to: <strong>{allergy}</strong></p>
                ))}
                {patient.medicalHistory.medicalConditions.map((condition, idx) => (
                  <p key={idx} className="text-sm text-red-700">• {condition}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left: Treatment Timeline */}
        <div className="col-span-2 space-y-6">
          {/* Timeline Visualization */}
          <div className="medical-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Treatment Timeline</h3>
              <button
                onClick={() => setShowNewPhaseForm(!showNewPhaseForm)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
              >
                <Plus size={18} />
                <span>Add Phase</span>
              </button>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              {patient.treatmentPlans.map((phase, idx) => (
                <div
                  key={phase.id}
                  onClick={() => setSelectedPhase(phase)}
                  className={`p-4 rounded-lg border-l-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedPhase?.id === phase.id
                      ? 'bg-blue-50 border-blue-500 shadow-md'
                      : 'bg-slate-50 border-slate-200'
                  } ${typeColors[phase.type]}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900">{phase.name}</h4>
                      <p className="text-sm text-slate-600 mt-1">Teeth: {phase.teeth.join(', ')}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500">
                        <span className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{phase.duration} days</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <DollarSign size={14} />
                          <span>{phase.currency} {phase.cost}</span>
                        </span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      phase.status === 'completed' ? 'bg-green-100 text-green-700' :
                      phase.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {phase.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Phase Form */}
            {showNewPhaseForm && (
              <div className="mt-4 p-4 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
                <p className="text-sm text-slate-600 mb-4">New phase form - Add treatment phases here</p>
                <button
                  onClick={() => setShowNewPhaseForm(false)}
                  className="text-sm text-slate-500 hover:text-slate-700"
                >
                  Close form
                </button>
              </div>
            )}
          </div>

          {/* Tooth Chart */}
          <div className="medical-card p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Periodontal Chart & Treatment Map</h3>
            <div className="grid grid-cols-7 gap-3 p-4 bg-slate-50 rounded-lg">
              {[18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28].map((tooth) => (
                <ToothChartItem key={tooth} tooth={tooth} status={selectedPhase?.teeth.includes(tooth) ? 'treatment' : 'healthy'} />
              ))}
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-emerald-400 rounded"></div>
                <span>Healthy</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-400 rounded"></div>
                <span>Caries</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-purple-400 rounded"></div>
                <span>Treatment</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-amber-400 rounded"></div>
                <span>Loss</span>
              </div>
            </div>
          </div>

          {/* Selected Phase Details */}
          {selectedPhase && (
            <div className="medical-card p-6 bg-blue-50">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Phase Details: {selectedPhase.name}</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600">Start Date</p>
                    <p className="font-semibold text-slate-900">{selectedPhase.startDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">End Date</p>
                    <p className="font-semibold text-slate-900">{selectedPhase.endDate}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Clinical Notes</p>
                  <p className="font-semibold text-slate-900">{selectedPhase.notes}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: EDR & Medical History */}
        <div className="space-y-6">
          {/* EDR Summary Card */}
          <div className="medical-card p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Electronic Dental Record</h3>
            
            <div className="space-y-4">
              {/* Radiographic Files */}
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-2">📸 X-Rays</p>
                <div className="space-y-1">
                  {patient.xrayFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center space-x-2 p-2 bg-slate-50 rounded text-xs">
                      <FileText size={14} className="text-blue-500" />
                      <span className="text-slate-600">{file}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CBCT Files */}
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-2">🔍 CBCT Scans</p>
                <div className="space-y-1">
                  {patient.cbctFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center space-x-2 p-2 bg-slate-50 rounded text-xs">
                      <FileText size={14} className="text-purple-500" />
                      <span className="text-slate-600">{file}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upload New */}
              <button className="w-full flex items-center justify-center space-x-2 p-3 border-2 border-dashed border-slate-300 rounded-lg hover:bg-slate-50 transition-all text-sm font-medium text-slate-600">
                <Upload size={16} />
                <span>Upload X-Ray or CBCT</span>
              </button>
            </div>
          </div>

          {/* Allergies & Medical Info */}
          <div className="medical-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Allergies & Medications</h3>
              <button
                onClick={() => setEditingHistory(!editingHistory)}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
              >
                {editingHistory ? 'Done' : 'Edit'}
              </button>
            </div>

            <div className="space-y-3">
              {patient.medicalHistory.allergies.map((allergy, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-red-50 rounded border-l-2 border-red-400">
                  <span className="text-sm font-medium text-red-700">{allergy}</span>
                  {editingHistory && (
                    <button onClick={() => removeAllergy(idx)} className="text-red-600 hover:text-red-700">
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}

              {editingHistory && (
                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="text"
                    placeholder="Add allergy..."
                    value={newAllergyInput}
                    onChange={(e) => setNewAllergyInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addAllergy()}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={addAllergy}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Cost Summary */}
          <div className="medical-card p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-l-4 border-green-500">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Treatment Cost Summary</h3>
            <div className="space-y-3">
              {patient.treatmentPlans.map((phase) => (
                <div key={phase.id} className="flex items-center justify-between text-sm">
                  <span className="text-slate-700">{phase.name}</span>
                  <span className="font-semibold text-slate-900">{phase.currency} {phase.cost}</span>
                </div>
              ))}
              <div className="border-t border-green-200 pt-3 flex items-center justify-between">
                <span className="font-bold text-slate-900">Total Cost</span>
                <span className="text-xl font-bold text-green-700">{patient.treatmentPlans[0]?.currency} {totalCost}</span>
              </div>
            </div>
          </div>

          {/* Export */}
          <button
            onClick={handleExportTreatmentPlan}
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-all font-semibold"
          >
            <Download size={18} />
            <span>Export Treatment Plan</span>
          </button>

          <button className="w-full flex items-center justify-center space-x-2 border-2 border-blue-600 text-blue-600 px-4 py-3 rounded-lg hover:bg-blue-50 transition-all font-semibold">
            <Share2 size={18} />
            <span>Share with Patient</span>
          </button>
        </div>
      </div>
    </div>
  )
}
