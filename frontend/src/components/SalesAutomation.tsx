'use client'

import React, { useState } from 'react'
import { Play, MessageCircle, Mail, DollarSign, Zap, BarChart3, TrendingDown, Users, Target, Sparkles, ArrowRight, CheckCircle2, Clock } from 'lucide-react'
import { Line, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

interface Lead {
  id: string
  name: string
  country: string
  treatmentType: 'implant' | 'root_canal' | 'orthodontics' | 'general'
  sentiment: 'positive' | 'neutral' | 'anxious' | 'excited'
  xrayUploaded: boolean
  diagnosticSent: boolean
  messageCount: number
  score: number
}

interface AutomationAction {
  stage: string
  type: 'whatsapp' | 'email' | 'payment' | 'ai_diagnostic' | 'sms'
  message: string
  icon: React.ReactNode
}

const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    name: 'Emma Richardson',
    country: 'United Kingdom',
    treatmentType: 'implant',
    sentiment: 'anxious',
    xrayUploaded: true,
    diagnosticSent: false,
    messageCount: 3,
    score: 78,
  },
  {
    id: '2',
    name: 'David Smith',
    country: 'United States',
    treatmentType: 'root_canal',
    sentiment: 'neutral',
    xrayUploaded: false,
    diagnosticSent: false,
    messageCount: 1,
    score: 45,
  },
  {
    id: '3',
    name: 'Sophie Martin',
    country: 'France',
    treatmentType: 'orthodontics',
    sentiment: 'excited',
    xrayUploaded: true,
    diagnosticSent: true,
    messageCount: 5,
    score: 92,
  },
]

const PIPELINE_STAGES = [
  { id: 'inquiry', name: 'Inquiry', color: 'bg-slate-100' },
  { id: 'diagnostics_sent', name: 'Diagnostics Sent', color: 'bg-blue-100' },
  { id: 'quote_accepted', name: 'Quote Accepted', color: 'bg-purple-100' },
  { id: 'payment_received', name: 'Payment Received', color: 'bg-green-100' },
  { id: 'pre_treatment', name: 'Pre-Treatment', color: 'bg-yellow-100' },
  { id: 'booked_surgery', name: 'Booked Surgery', color: 'bg-emerald-100' },
]

const getContextualActions = (lead: Lead): AutomationAction[] => {
  const baseActions: AutomationAction[] = [
    {
      stage: 'inquiry',
      type: 'whatsapp',
      message: `Hi ${lead.name}, thank you for your interest!`,
      icon: <MessageCircle size={16} />,
    },
  ]

  // Add context-based actions
  if (lead.sentiment === 'anxious') {
    baseActions.push({
      stage: 'inquiry',
      type: 'email',
      message: 'Personalized anxiety-relief guide with patient testimonials',
      icon: <Mail size={16} />,
    })
  }

  if (lead.xrayUploaded && !lead.diagnosticSent) {
    baseActions.push({
      stage: 'diagnostics_sent',
      type: 'ai_diagnostic',
      message: 'AI diagnostic analysis sent based on uploaded X-rays',
      icon: <Sparkles size={16} />,
    })
  }

  if (lead.treatmentType === 'implant') {
    baseActions.push({
      stage: 'quote_accepted',
      type: 'payment',
      message: `Payment link for implant treatment ($${3500 + (lead.country === 'United Kingdom' ? 500 : 0)})`,
      icon: <DollarSign size={16} />,
    })
  }

  if (lead.sentiment === 'excited' && lead.diagnosticSent) {
    baseActions.push({
      stage: 'payment_received',
      type: 'whatsapp',
      message: 'Fast-track booking confirmation with priority surgery date options',
      icon: <Zap size={16} />,
    })
  }

  return baseActions
}

export default function SalesAutomation() {
  const [selectedLead, setSelectedLead] = useState<Lead>(MOCK_LEADS[0])
  const [simulatedStage, setSimulatedStage] = useState(0)
  const [isSimulating, setIsSimulating] = useState(false)
  const [activeTab, setActiveTab] = useState<'pipeline' | 'scoring' | 'channels' | 'analytics'>('pipeline')

  const contextualActions = getContextualActions(selectedLead)

  const startSimulation = () => {
    setIsSimulating(true)
    setSimulatedStage(0)
    let stage = 0
    const interval = setInterval(() => {
      stage++
      setSimulatedStage(stage)
      if (stage >= PIPELINE_STAGES.length) {
        clearInterval(interval)
        setIsSimulating(false)
      }
    }, 2000)
  }

  // Analytics Data
  const funnelData = {
    labels: PIPELINE_STAGES.map(s => s.name),
    datasets: [
      {
        label: 'Without AI Intervention',
        data: [100, 78, 52, 35, 22, 12],
        borderColor: '#ef4444',
        backgroundColor: '#fee2e2',
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: 'With AI Intervention',
        data: [100, 92, 71, 58, 47, 38],
        borderColor: '#10b981',
        backgroundColor: '#d1fae5',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  }

  const conversionData = {
    labels: PIPELINE_STAGES.map(s => s.name),
    datasets: [
      {
        label: 'Drop-off Rate (%)',
        data: [0, 22, 48, 65, 78, 88],
        backgroundColor: '#fecaca',
        borderColor: '#ef4444',
        borderWidth: 1,
      },
    ],
  }

  const calculateScore = () => {
    let score = 0
    if (selectedLead.xrayUploaded) score += 25
    if (selectedLead.diagnosticSent) score += 15
    if (selectedLead.treatmentType === 'implant') score += 20
    if (selectedLead.sentiment === 'excited') score += 25
    else if (selectedLead.sentiment === 'anxious') score += 15
    score += Math.min(selectedLead.messageCount * 5, 15)
    return Math.min(score, 100)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Patient Journey Automation</h1>
        <p className="text-slate-600">AI-powered sales pipeline with medical context awareness and live simulation</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b border-slate-200">
        {[
          { id: 'pipeline', label: '📊 Pipeline', icon: '🔀' },
          { id: 'scoring', label: '🎯 Lead Scoring', icon: '📈' },
          { id: 'channels', label: '📱 Multi-Channel', icon: '💬' },
          { id: 'analytics', label: '📉 Analytics', icon: '📊' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 font-semibold transition-all border-b-2 ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* PIPELINE TAB */}
      {activeTab === 'pipeline' && (
        <div className="space-y-6">
          {/* 6-Stage Pipeline Visualization */}
          <div className="medical-card p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Patient Journey: Inquiry to Surgery</h2>
            
            {/* Pipeline Flow */}
            <div className="grid grid-cols-6 gap-2 mb-12">
              {PIPELINE_STAGES.map((stage, idx) => (
                <div key={stage.id} className="flex flex-col items-center">
                  <div className={`w-full p-4 rounded-lg text-center ${stage.color} border-2 ${
                    simulatedStage > idx ? 'border-green-500' : 'border-slate-200'
                  } transition-all transform ${simulatedStage === idx + 1 ? 'scale-105 shadow-lg' : ''}`}>
                    <p className="text-xs font-bold text-slate-900">{stage.name}</p>
                    <p className="text-lg mt-2">
                      {idx === 0 && '📧'}
                      {idx === 1 && '🔍'}
                      {idx === 2 && '📋'}
                      {idx === 3 && '💳'}
                      {idx === 4 && '⚕️'}
                      {idx === 5 && '✅'}
                    </p>
                  </div>
                  {idx < PIPELINE_STAGES.length - 1 && (
                    <ArrowRight className={`mt-2 ${simulatedStage > idx ? 'text-green-500' : 'text-slate-300'}`} size={20} />
                  )}
                </div>
              ))}
            </div>

            {/* Simulation Controls */}
            <div className="flex items-center justify-center mb-8">
              <button
                onClick={startSimulation}
                disabled={isSimulating}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play size={18} />
                <span>Simulate: New Inquiry Arrives</span>
              </button>
            </div>

            {/* Lead Selection */}
            <div className="border-t border-slate-200 pt-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Select Lead to Simulate</h3>
              <div className="grid grid-cols-3 gap-4">
                {MOCK_LEADS.map((lead) => (
                  <button
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedLead.id === lead.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <p className="font-bold text-slate-900">{lead.name}</p>
                    <p className="text-xs text-slate-600 mt-1">{lead.country}</p>
                    <p className="text-xs text-slate-600">Treatment: {lead.treatmentType}</p>
                    <p className="text-xs mt-2 font-semibold">
                      Score: <span className="text-blue-600">{calculateScore()}</span>
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Automation Actions - Contextual */}
          <div className="medical-card p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Contextual Automation Triggers</h2>
            <p className="text-slate-600 text-sm mb-6">
              🧠 <strong>Medical AI Context:</strong> Automation adapts based on treatment type ({selectedLead.treatmentType}), 
              country ({selectedLead.country}), sentiment ({selectedLead.sentiment}), and diagnostic status
            </p>

            <div className="grid grid-cols-2 gap-4">
              {contextualActions.map((action, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2 text-blue-600">
                      {action.icon}
                      <span className="font-semibold capitalize">{action.type.replace('_', ' ')}</span>
                    </div>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">{action.stage}</span>
                  </div>
                  <p className="text-sm text-slate-700">{action.message}</p>
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <span className="text-xs text-slate-500">⚡ Auto-triggered when conditions met</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Context Explanation */}
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-900">
                <strong>Why these actions?</strong> Because {selectedLead.name} is from {selectedLead.country} 
                interested in {selectedLead.treatmentType} with {selectedLead.sentiment} sentiment 
                {selectedLead.xrayUploaded ? ' (X-ray uploaded)' : ' (no diagnostic yet)'}.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SCORING TAB */}
      {activeTab === 'scoring' && (
        <div className="grid grid-cols-2 gap-6">
          {/* Lead Scoring Panel */}
          <div className="medical-card p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Lead Scoring Model</h2>
            
            <div className="space-y-4">
              {[
                { label: 'X-Ray Uploaded', value: selectedLead.xrayUploaded ? 25 : 0, max: 25 },
                { label: 'Treatment Complexity', value: selectedLead.treatmentType === 'implant' ? 20 : 10, max: 20 },
                { label: 'Sentiment Analysis', value: selectedLead.sentiment === 'excited' ? 25 : selectedLead.sentiment === 'anxious' ? 15 : 10, max: 25 },
                { label: 'Message Engagement', value: Math.min(selectedLead.messageCount * 5, 15), max: 15 },
                { label: 'Geographic Value', value: 15, max: 15 },
              ].map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">{item.label}</span>
                    <span className="text-sm font-bold text-blue-600">{item.value}/{item.max}</span>
                  </div>
                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all"
                      style={{ width: `${(item.value / item.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}

              <div className="border-t-2 border-slate-200 pt-4 mt-6">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-slate-900">Total Score</span>
                  <span className={`text-4xl font-bold ${
                    calculateScore() >= 75 ? 'text-green-600' :
                    calculateScore() >= 50 ? 'text-yellow-600' :
                    'text-orange-600'
                  }`}>
                    {calculateScore()}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  {calculateScore() >= 75 ? '🔥 Hot Lead - High priority' :
                   calculateScore() >= 50 ? '⚡ Warm Lead - Follow up soon' :
                   '❄️ Cold Lead - Nurture with content'}
                </p>
              </div>
            </div>
          </div>

          {/* Lead Details */}
          <div className="space-y-6">
            <div className="medical-card p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Selected Lead: {selectedLead.name}</h3>
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded">
                  <p className="text-xs text-slate-600">Country</p>
                  <p className="font-semibold text-slate-900">{selectedLead.country}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded">
                  <p className="text-xs text-slate-600">Treatment Interest</p>
                  <p className="font-semibold text-slate-900 capitalize">{selectedLead.treatmentType}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded">
                  <p className="text-xs text-slate-600">Sentiment</p>
                  <p className="font-semibold text-slate-900 capitalize">{selectedLead.sentiment}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="text-xs text-blue-600 font-semibold">✓ X-Ray Uploaded</p>
                </div>
                {selectedLead.diagnosticSent && (
                  <div className="p-3 bg-green-50 rounded border border-green-200">
                    <p className="text-xs text-green-600 font-semibold">✓ Diagnostic Sent</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHANNELS TAB */}
      {activeTab === 'channels' && (
        <div className="space-y-6">
          <div className="medical-card p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Multi-Channel Communication</h2>
            <p className="text-slate-600 mb-6">Same lead, different touchpoints with adapted messaging</p>

            <div className="grid grid-cols-3 gap-6">
              {[
                { channel: 'WhatsApp', emoji: '💬', color: 'bg-green-50', message: `Hi ${selectedLead.name}, Thanks for choosing us! Your X-ray analysis is ready.` },
                { channel: 'Email', emoji: '📧', color: 'bg-blue-50', message: `Dear ${selectedLead.name}, We've completed your AI diagnostic analysis. Here are the recommendations...` },
                { channel: 'Instagram DM', emoji: '📲', color: 'bg-pink-50', message: `Hey ${selectedLead.name}! 🎉 Your treatment plan is ready. Check your email for details!` },
              ].map((item, idx) => (
                <div key={idx} className={`p-6 rounded-lg border-2 border-slate-200 ${item.color}`}>
                  <div className="text-3xl mb-2">{item.emoji}</div>
                  <h3 className="font-bold text-slate-900 mb-3">{item.channel}</h3>
                  <p className="text-sm text-slate-700 p-3 bg-white rounded border border-slate-200">{item.message}</p>
                  <p className="text-xs text-slate-500 mt-3">Sent via {item.channel} • Auto-adjusted for platform</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ANALYTICS TAB */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="medical-card p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Conversion Funnel & AI Impact</h2>
            
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <p className="font-bold text-slate-900 mb-4">Conversion Rate by Stage</p>
                <Line
                  data={funnelData}
                  options={{
                    responsive: true,
                    plugins: { legend: { position: 'bottom' as const } },
                    scales: { y: { beginAtZero: true, max: 100 } },
                  }}
                />
              </div>

              <div>
                <p className="font-bold text-slate-900 mb-4">Drop-Off Analysis</p>
                <Bar
                  data={conversionData}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true, max: 100 } },
                  }}
                />
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4 border-t border-slate-200 pt-8">
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-green-600">26 pts</div>
                <p className="text-sm text-slate-600 mt-2">AI Intervention Lift</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-blue-600">38%</div>
                <p className="text-sm text-slate-600 mt-2">Booked Surgery Rate (with AI)</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-purple-600">64%</div>
                <p className="text-sm text-slate-600 mt-2">Payment Conversion (Contextual)</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
