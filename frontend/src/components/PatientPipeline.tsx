'use client'

import React, { useState } from 'react'
import { Plus, GripVertical, CheckCircle2, AlertTriangle, Zap, MessageCircle, Mail, DollarSign, Brain, BarChart2, Activity, Play, ChevronRight, UserCircle2 } from 'lucide-react'

// --- Types ---
type PipelineStage = 'inquiry' | 'diagnostics' | 'quoting' | 'logistics' | 'presurgery' | 'treatment'

interface LeadScore {
  xray: number
  treatment: number
  origin: number
  sentiment: number
  total: number
}

interface PatientCard {
  id: string
  name: string
  country: string
  treatment: string
  score: LeadScore
  stage: PipelineStage
  actionsFired: ('whatsapp' | 'email' | 'payment' | 'ai')[]
}

// --- Mock Data ---
const STAGES: { id: PipelineStage; title: string; count: number; color: string }[] = [
  { id: 'inquiry', title: 'RAW INQUIRY', count: 12, color: 'border-slate-300 bg-slate-50' },
  { id: 'diagnostics', title: 'AI DIAGNOSTICS', count: 8, color: 'border-blue-300 bg-blue-50' },
  { id: 'quoting', title: 'QUOTING & FINANCIAL', count: 5, color: 'border-indigo-300 bg-indigo-50' },
  { id: 'logistics', title: 'LOGISTICS BOOKED', count: 4, color: 'border-emerald-300 bg-emerald-50' },
  { id: 'presurgery', title: 'PRE-SURGERY ARRIVAL', count: 2, color: 'border-orange-300 bg-orange-50' },
  { id: 'treatment', title: 'IN-TREATMENT', count: 3, color: 'border-purple-300 bg-purple-50' },
]

const INITIAL_PATIENTS: PatientCard[] = [
  { id: '1', name: 'David Smith', country: 'UK', treatment: 'Full Mouth Implants', score: { xray: 25, treatment: 30, origin: 20, sentiment: 15, total: 90 }, stage: 'diagnostics', actionsFired: ['whatsapp', 'ai'] },
  { id: '2', name: 'Emma Richardson', country: 'Germany', treatment: 'Veneers (E-max)', score: { xray: 0, treatment: 20, origin: 20, sentiment: 10, total: 50 }, stage: 'inquiry', actionsFired: ['whatsapp'] },
  { id: '3', name: 'James Wilson', country: 'USA', treatment: 'All-on-4', score: { xray: 25, treatment: 30, origin: 25, sentiment: 18, total: 98 }, stage: 'logistics', actionsFired: ['whatsapp', 'email', 'payment', 'ai'] },
]

// --- Components ---

const ActionBadge = ({ type }: { type: string }) => {
  const styles: Record<string, { icon: any, color: string, label: string }> = {
    whatsapp: { icon: MessageCircle, color: 'bg-green-100 text-green-700 border-green-200', label: 'WA' },
    email: { icon: Mail, color: 'bg-blue-100 text-blue-700 border-blue-200', label: 'EM' },
    payment: { icon: DollarSign, color: 'bg-emerald-100 text-emerald-700 border-emerald-200', label: 'PAY' },
    ai: { icon: Brain, color: 'bg-purple-100 text-purple-700 border-purple-200', label: 'AI' }
  }
  const Icon = styles[type].icon
  return (
    <div title={`Action Fired: ${styles[type].label}`} className={`flex items-center justify-center w-6 h-6 rounded-full border ${styles[type].color}`}>
      <Icon size={12} />
    </div>
  )
}

export default function PatientPipeline() {
  const [patients, setPatients] = useState<PatientCard[]>(INITIAL_PATIENTS)
  const [selectedLead, setSelectedLead] = useState<PatientCard | null>(INITIAL_PATIENTS[0])
  const [simulatorState, setSimulatorState] = useState<'idle' | 'running' | 'completed'>('idle')
  const [simMessage, setSimMessage] = useState('')

  // Live Sequence Simulator Logic
  const runSimulator = () => {
    setSimulatorState('running')
    setSimMessage('1. New Inquiry Received from Instagram Ads (UK)')
    
    setTimeout(() => {
      setSimMessage('2. AI analyzes intent: "High intent, mentions All-on-4, anxious about pain."')
      
      setTimeout(() => {
        setSimMessage('3. Contextual Branching Fired: Sending Empathy-focused WhatsApp + CBCT upload link.')
        
        setTimeout(() => {
          setSimMessage('4. Lead automatically moved to "AI DIAGNOSTICS".')
          setSimulatorState('completed')
        }, 2000)
      }, 2000)
    }, 2000)
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Contextual AI Pipeline</h1>
          <p className="text-slate-600 mt-1">
            6-stage visual journey with AI-driven contextual branching based on medical data, country, and sentiment.
          </p>
        </div>
        <button 
          onClick={runSimulator}
          disabled={simulatorState === 'running'}
          className={`flex items-center gap-2 px-4 py-2 font-bold rounded-lg transition-all ${
            simulatorState === 'running' ? 'bg-slate-200 text-slate-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'
          }`}
        >
          <Play size={18} className={simulatorState === 'running' ? 'animate-pulse' : ''} />
          {simulatorState === 'running' ? 'Simulating Sequence...' : 'Run Live Sequence Simulator'}
        </button>
      </div>

      {/* Simulator Banner */}
      {simulatorState !== 'idle' && (
        <div className="bg-indigo-900 text-indigo-100 p-4 rounded-xl flex items-center justify-between border-2 border-indigo-400 shadow-lg animate-slideInLeft">
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-full ${simulatorState === 'running' ? 'bg-indigo-600 animate-spin' : 'bg-emerald-500'}`}>
              {simulatorState === 'running' ? <Activity size={20} className="text-white" /> : <CheckCircle2 size={20} className="text-white" />}
            </div>
            <div>
              <p className="text-sm text-indigo-300 font-semibold uppercase tracking-wider mb-1">Live Sequence Simulator</p>
              <p className="text-lg font-bold text-white transition-all">{simMessage}</p>
            </div>
          </div>
          {simulatorState === 'completed' && (
            <button onClick={() => setSimulatorState('idle')} className="text-sm bg-white text-indigo-900 px-4 py-2 rounded-lg font-bold">Reset</button>
          )}
        </div>
      )}

      {/* Main Grid: Pipeline + Sidebar */}
      <div className="flex gap-6">
        
        {/* Pipeline Board */}
        <div className="flex-1 overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {STAGES.map(stage => (
              <div key={stage.id} className="w-72 flex flex-col gap-3">
                {/* Stage Header */}
                <div className={`p-3 rounded-t-lg border-t-4 ${stage.color} border-x border-slate-200 shadow-sm flex justify-between items-center bg-white`}>
                  <h3 className="text-xs font-bold text-slate-800">{stage.title}</h3>
                  <span className="bg-slate-800 text-white text-xs font-bold px-2 py-0.5 rounded-full">{patients.filter(p => p.stage === stage.id).length}</span>
                </div>
                
                {/* Cards Container */}
                <div className="flex-1 bg-slate-50 border border-slate-200 rounded-b-lg p-2 space-y-3 min-h-[400px]">
                  {patients.filter(p => p.stage === stage.id).map(patient => (
                    <div 
                      key={patient.id} 
                      onClick={() => setSelectedLead(patient)}
                      className={`medical-card p-3 cursor-pointer hover:border-indigo-400 transition-colors border-2 ${selectedLead?.id === patient.id ? 'border-indigo-500 shadow-md' : 'border-transparent'}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <UserCircle2 size={16} className="text-slate-400" />
                          <span className="font-bold text-slate-900 text-sm">{patient.name}</span>
                        </div>
                        <GripVertical size={14} className="text-slate-300" />
                      </div>
                      
                      <div className="text-xs text-slate-600 mb-3 space-y-1">
                        <p>📍 {patient.country}</p>
                        <p className="font-semibold text-indigo-700">🦷 {patient.treatment}</p>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-100 pt-2 mt-2">
                        {/* Automated Actions Badges */}
                        <div className="flex gap-1">
                          {patient.actionsFired.map(action => (
                            <ActionBadge key={action} type={action} />
                          ))}
                        </div>
                        {/* Score */}
                        <div className="flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded text-xs font-bold text-emerald-700 border border-emerald-200">
                          <Zap size={12} className="text-emerald-500 fill-emerald-500" /> {patient.score.total}
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-2 border-2 border-dashed border-slate-300 rounded text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition-colors text-sm font-semibold flex items-center justify-center gap-1">
                    <Plus size={16} /> Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Scoring & Context Sidebar */}
        <div className="w-96 space-y-6">
          {selectedLead ? (
            <>
              {/* Lead Score Panel */}
              <div className="medical-card p-6 border-t-4 border-indigo-500">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Brain className="text-indigo-600" /> AI Lead Score
                  </h2>
                  <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-bold text-xl">
                    {selectedLead.score.total} <span className="text-xs font-normal">/ 100</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">X-Ray Uploaded</span>
                      <span className="font-bold text-emerald-600">+{selectedLead.score.xray}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${(selectedLead.score.xray / 30) * 100}%` }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Treatment Value (Implants)</span>
                      <span className="font-bold text-emerald-600">+{selectedLead.score.treatment}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${(selectedLead.score.treatment / 30) * 100}%` }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Country Tier ({selectedLead.country})</span>
                      <span className="font-bold text-emerald-600">+{selectedLead.score.origin}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(selectedLead.score.origin / 25) * 100}%` }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Intent & Sentiment</span>
                      <span className="font-bold text-emerald-600">+{selectedLead.score.sentiment}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-purple-500 h-2 rounded-full" style={{ width: `${(selectedLead.score.sentiment / 15) * 100}%` }}></div></div>
                  </div>
                </div>
              </div>

              {/* Contextual Multi-Channel Breakdown */}
              <div className="medical-card p-6">
                 <h2 className="text-md font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Activity size={18} className="text-slate-500" /> Multi-Channel Automation
                </h2>
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                  {/* Event 1 */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-green-500 text-slate-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ml-2 md:ml-0 z-10">
                      <MessageCircle size={12} />
                    </div>
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-slate-50 p-3 rounded border border-slate-200 shadow-sm ml-4 md:ml-0">
                      <p className="text-xs font-bold text-green-700">WhatsApp Triggered</p>
                      <p className="text-xs text-slate-600 mt-1">Sent anxiety-reducing message based on sentiment.</p>
                    </div>
                  </div>
                  {/* Event 2 */}
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-blue-500 text-slate-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ml-2 md:ml-0 z-10">
                      <Mail size={12} />
                    </div>
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-slate-50 p-3 rounded border border-slate-200 shadow-sm ml-4 md:ml-0">
                      <p className="text-xs font-bold text-blue-700">Email Branch</p>
                      <p className="text-xs text-slate-600 mt-1">Sent visual case studies for {selectedLead.treatment}.</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="medical-card p-6 text-center text-slate-500 flex flex-col items-center justify-center h-full">
              <UserCircle2 size={48} className="text-slate-300 mb-4" />
              <p>Select a patient card to view AI Lead Scoring and Contextual Breakdown</p>
            </div>
          )}
        </div>
      </div>

      {/* Conversion Analytics Funnel (Bottom Section) */}
      <div className="medical-card p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <BarChart2 className="text-blue-600" /> Conversion Funnel & AI Intervention Impact
        </h2>
        
        <div className="flex gap-2 h-32 items-end">
          {/* Funnel bars visualization */}
          {[
            { label: 'Inquiry', val: 100, drop: 0, color: 'bg-slate-300' },
            { label: 'Diagnostics', val: 85, drop: 15, color: 'bg-blue-400' },
            { label: 'Quoting', val: 60, drop: 25, color: 'bg-indigo-400' },
            { label: 'Booked', val: 40, drop: 20, color: 'bg-emerald-400' },
            { label: 'Surgery', val: 38, drop: 2, color: 'bg-purple-400' },
          ].map((step, i) => (
            <div key={i} className="flex-1 flex flex-col items-center group relative">
              {i > 0 && (
                <div className="absolute -top-8 text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  -{step.drop}% Drop-off
                  <br/>
                  <span className="text-emerald-600 text-[10px]">AI recovered 12%</span>
                </div>
              )}
              <div 
                className={`w-full rounded-t-sm transition-all duration-500 ${step.color} hover:brightness-110`} 
                style={{ height: `${step.val}%` }}
              ></div>
              <div className="w-full text-center mt-2 border-t border-slate-200 pt-2">
                <p className="text-xs font-bold text-slate-700 truncate px-1">{step.label}</p>
                <p className="text-sm font-black text-slate-900">{step.val}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
