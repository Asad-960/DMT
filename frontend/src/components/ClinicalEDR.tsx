'use client'

import React, { useState } from 'react'
import { Plus, Image as ImageIcon, FileText, AlertCircle, Calendar, Activity, Clock, DollarSign, Download, ChevronRight, ActivitySquare } from 'lucide-react'

type Tab = 'plan_builder' | 'edr' | 'radiology' | 'perio'

export default function ClinicalEDR() {
  const [activeTab, setActiveTab] = useState<Tab>('plan_builder')
  const [selectedPlan, setSelectedPlan] = useState('implant')

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Clinical EDR & Treatment Builder</h1>
          <p className="text-slate-600 mt-1">Comprehensive Electronic Dental Record and patient timeline management.</p>
        </div>
        <div className="flex space-x-3">
          <button className="medical-button-secondary flex items-center space-x-2">
            <Download size={18} />
            <span>Export Record</span>
          </button>
          <button className="medical-button-primary flex items-center space-x-2">
            <Plus size={18} />
            <span>New Note</span>
          </button>
        </div>
      </div>

      {/* Patient Mini-Profile */}
      <div className="medical-card p-4 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md">
            JS
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">John Smith (ID: #8492)</h2>
            <div className="flex items-center space-x-4 text-sm text-slate-600 mt-1">
              <span className="flex items-center space-x-1">
                <Calendar size={14} />
                <span>DOB: 12 May 1980 (44yo)</span>
              </span>
              <span className="flex items-center space-x-1 text-red-600 font-semibold">
                <AlertCircle size={14} />
                <span>Allergy: Penicillin</span>
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-slate-500">Last Visit</div>
          <div className="font-bold text-slate-900">14 May 2024</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
        {[
          { id: 'plan_builder', label: 'Treatment Plan Builder', icon: FileText },
          { id: 'edr', label: 'Medical History & EDR', icon: Activity },
          { id: 'radiology', label: 'Radiology & Attachments', icon: ImageIcon },
          { id: 'perio', label: 'Periodontal Charting', icon: ActivitySquare },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {activeTab === 'plan_builder' && (
          <div className="grid grid-cols-3 gap-6 animate-slideInLeft">
            {/* Plan Selector & Controls */}
            <div className="col-span-1 space-y-4">
              <div className="medical-card p-5 space-y-4">
                <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Plan Templates</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => setSelectedPlan('implant')}
                    className={`w-full text-left px-4 py-3 rounded-lg border ${selectedPlan === 'implant' ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold' : 'border-slate-200 hover:bg-slate-50 text-slate-700'}`}
                  >
                    Multi-Stage Implant Journey
                  </button>
                  <button 
                    onClick={() => setSelectedPlan('endo')}
                    className={`w-full text-left px-4 py-3 rounded-lg border ${selectedPlan === 'endo' ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold' : 'border-slate-200 hover:bg-slate-50 text-slate-700'}`}
                  >
                    Root Canal & Crown Sequence
                  </button>
                  <button 
                    onClick={() => setSelectedPlan('ortho')}
                    className={`w-full text-left px-4 py-3 rounded-lg border ${selectedPlan === 'ortho' ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold' : 'border-slate-200 hover:bg-slate-50 text-slate-700'}`}
                  >
                    Orthodontic Aligners (Invisalign)
                  </button>
                </div>
                <button className="w-full mt-4 medical-button-secondary border-dashed flex items-center justify-center gap-2">
                  <Plus size={16} /> Create Custom Plan
                </button>
              </div>

              <div className="medical-card p-5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                <h3 className="font-bold opacity-90 mb-4">Financial Summary</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="opacity-80">Total Projected Cost</span>
                    <span className="font-bold text-lg">€ 8,450</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="opacity-80">Deposit Required</span>
                    <span className="font-bold">€ 1,500</span>
                  </div>
                </div>
                <button className="w-full bg-white text-blue-700 font-bold py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-sm shadow-lg">
                  Generate Patient PDF Proposal
                </button>
              </div>
            </div>

            {/* Visual Timeline Builder */}
            <div className="col-span-2 medical-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Multi-Stage Implant Journey</h3>
                  <p className="text-sm text-slate-500">Estimated Duration: 4-6 Months</p>
                </div>
                <button className="text-blue-600 font-semibold text-sm hover:underline flex items-center gap-1">
                  Add Clinical Step <Plus size={16} />
                </button>
              </div>

              <div className="relative border-l-2 border-blue-200 ml-4 space-y-8 pb-4">
                {/* Stage 1 */}
                <div className="relative pl-8">
                  <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-blue-500 border-4 border-white shadow-sm"></div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-xs font-bold text-blue-600 tracking-wider uppercase mb-1 block">Visit 1 • Current</span>
                        <h4 className="font-bold text-slate-900 text-lg">Surgical Phase: Extraction & Implants</h4>
                      </div>
                      <span className="font-bold text-slate-700">€ 4,200</span>
                    </div>
                    <ul className="text-sm text-slate-600 space-y-2 mb-4 list-disc pl-4">
                      <li>CBCT Scan & Surgical Planning</li>
                      <li>Tooth Extractions (Teeth #14, #15)</li>
                      <li>Bone Grafting (Bio-Oss)</li>
                      <li>Placement of 2x Straumann Implants</li>
                    </ul>
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 border-t border-slate-200 pt-3 mt-3">
                      <div className="flex items-center gap-1"><Clock size={14} /> 2.5 Hours</div>
                      <div className="flex items-center gap-1"><AlertCircle size={14} /> Sedation Required</div>
                    </div>
                  </div>
                </div>

                {/* Healing Period */}
                <div className="relative pl-8">
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-200 border-4 border-white flex items-center justify-center">
                    <Clock size={12} className="text-slate-500" />
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-center justify-between">
                    <span className="text-sm font-bold text-orange-800">Healing Period: Osseointegration</span>
                    <span className="text-sm font-semibold text-orange-700">3 Months</span>
                  </div>
                </div>

                {/* Stage 2 */}
                <div className="relative pl-8">
                  <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-slate-300 border-4 border-white shadow-sm"></div>
                  <div className="bg-white border border-slate-200 rounded-xl p-5 opacity-70 hover:opacity-100 transition-opacity">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-xs font-bold text-slate-500 tracking-wider uppercase mb-1 block">Visit 2 • Future</span>
                        <h4 className="font-bold text-slate-900 text-lg">Prosthetic Phase: Abutments & Crowns</h4>
                      </div>
                      <span className="font-bold text-slate-700">€ 4,250</span>
                    </div>
                    <ul className="text-sm text-slate-600 space-y-2 mb-4 list-disc pl-4">
                      <li>Uncovering of implants</li>
                      <li>Placement of healing abutments</li>
                      <li>Digital Impressions (3Shape TRIOS)</li>
                      <li>Final Zirconia Crowns Delivery</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'edr' && (
          <div className="grid grid-cols-2 gap-6 animate-slideInLeft">
            <div className="space-y-6">
              <div className="medical-card p-6 border-l-4 border-red-500">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                    <AlertCircle className="text-red-500" size={20} /> Medical Alerts & Allergies
                  </h3>
                  <button className="text-blue-600 text-sm font-semibold hover:underline">Edit</button>
                </div>
                <div className="space-y-3">
                  <div className="bg-red-50 text-red-800 p-3 rounded-lg text-sm font-semibold border border-red-100">
                    Allergy: Penicillin (Anaphylaxis)
                  </div>
                  <div className="bg-yellow-50 text-yellow-800 p-3 rounded-lg text-sm font-semibold border border-yellow-100">
                    Condition: Hypertension (Controlled)
                  </div>
                </div>
              </div>

              <div className="medical-card p-6">
                <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                  <Activity className="text-blue-500" size={20} /> Chronic Medications
                </h3>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center p-3 border border-slate-100 rounded-lg">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">Lisinopril 10mg</div>
                      <div className="text-xs text-slate-500">Once daily</div>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">Active</span>
                  </li>
                  <li className="flex justify-between items-center p-3 border border-slate-100 rounded-lg">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">Aspirin 81mg</div>
                      <div className="text-xs text-slate-500">Once daily</div>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">Active</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="medical-card p-6">
              <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                <FileText className="text-blue-500" size={20} /> Clinical Notes History
              </h3>
              <div className="space-y-4">
                {[
                  { date: '14 May 2024', doctor: 'Dr. Mehmet Özdemir', note: 'Initial consultation for full mouth rehabilitation. CBCT reviewed. Patient presented with failing dentition in upper right quadrant. Discussed implant options. Quoted for 2 implants.' },
                  { date: '10 Feb 2023', doctor: 'Dr. Ayşe Kaya', note: 'Routine hygiene and checkup. No caries detected. Mild gingivitis present.' }
                ].map((note, idx) => (
                  <div key={idx} className="border-l-2 border-blue-500 pl-4 py-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-bold text-slate-900">{note.date}</span>
                      <span className="text-slate-500">{note.doctor}</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{note.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'radiology' && (
          <div className="medical-card p-6 animate-slideInLeft">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-900 text-lg">Radiographs & CBCT</h3>
              <button className="medical-button-primary flex items-center gap-2 text-sm">
                <Plus size={16} /> Upload Image
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="border border-slate-200 rounded-xl overflow-hidden group cursor-pointer relative">
                <div className="h-48 bg-slate-900 flex items-center justify-center relative">
                  {/* Mock Panoramic Image placeholder using gradient */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-800 to-slate-900 opacity-80"></div>
                  <ImageIcon size={48} className="text-slate-600 absolute" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-40">
                    <span className="bg-white text-slate-900 font-bold px-4 py-2 rounded-lg text-sm">View Full Screen</span>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">Panoramic X-Ray</span>
                    <span className="text-xs text-slate-500">14 May 2024</span>
                  </div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden group cursor-pointer relative">
                <div className="h-48 bg-slate-900 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-700 to-slate-900 opacity-90"></div>
                  <Activity size={48} className="text-slate-600 absolute" />
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">3D Render</div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-40">
                    <span className="bg-white text-slate-900 font-bold px-4 py-2 rounded-lg text-sm">Open 3D Viewer</span>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">CBCT Maxilla/Mandible</span>
                    <span className="text-xs text-slate-500">14 May 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'perio' && (
          <div className="medical-card p-8 flex flex-col items-center justify-center min-h-[400px] animate-slideInLeft text-center">
            <ActivitySquare size={64} className="text-blue-200 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Digital Periodontal Charting</h3>
            <p className="text-slate-500 max-w-md mb-6">Visual charting interface allows for comprehensive recording of pocket depths, recession, mobility, and bleeding on probing.</p>
            <button className="medical-button-primary">Launch Interactive Perio Chart</button>
          </div>
        )}
      </div>
    </div>
  )
}
