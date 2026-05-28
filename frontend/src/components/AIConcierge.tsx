'use client'

import React, { useState } from 'react'
import { Send, MessageSquare, CheckCircle2, Clock, AlertCircle, Zap, MessageCircle } from 'lucide-react'

interface Lead {
  id: string
  name: string
  country: string
  timestamp: string
  preview: string
  sentiment: 'positive' | 'neutral' | 'anxiety' | 'excited'
  fullMessage: string
  aiReply: string
}

const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    name: 'Emma Richardson',
    country: 'United Kingdom',
    timestamp: '10:15 AM',
    preview: 'Hello! I am looking to get implants done. Is the digital dia...',
    sentiment: 'neutral',
    fullMessage: 'Hello! I am looking to get implants done. Is the digital diagnostic analysis really accurate? I am a bit anxious about the pain of a sinus lift.',
    aiReply: 'Hello Emma, yes! Our FDA-cleared Vermenji Second Dentist and Diaphanocat APIs have a 94.8% accuracy. We minimize sinus lift pain with advanced computer-guided decisions...'
  },
  {
    id: '2',
    name: 'Anna Kowalski',
    country: 'Germany',
    timestamp: '9:38 AM',
    preview: 'Guten Tag, has my transfer dispatch been scheduled for al...',
    sentiment: 'neutral',
    fullMessage: 'Guten Tag, has my transfer dispatch been scheduled for al implant treatment?',
    aiReply: 'Guten Tag Anna! Yes, your transfer has been scheduled. We will send you confirmation details via email shortly.'
  },
  {
    id: '3',
    name: 'Fatima Al-Rashid',
    country: 'Saudi Arabia',
    timestamp: 'Yesterday',
    preview: 'Excellent clinical service today. Dr. Mehmet and his surg...',
    sentiment: 'excited',
    fullMessage: 'Excellent clinical service today. Dr. Mehmet and his surgical team were wonderful!',
    aiReply: 'Alhamdulillah! We are so grateful for your kind words, Fatima. Your smile is our success!'
  },
  {
    id: '4',
    name: 'Sophie Martin',
    country: 'France',
    timestamp: 'Yesterday',
    preview: 'Bonjour, j\'ai reçu devis mais le paiement y2C0...',
    sentiment: 'neutral',
    fullMessage: 'Bonjour, j\'ai reçu devis mais le paiement y2C0 via la plateforme Iyzico',
    aiReply: 'Bonjour Sophie! You can securely pay via our Iyzico gateway. Would you like a direct payment link?'
  },
  {
    id: '5',
    name: 'David Smith',
    country: 'United States',
    timestamp: '1 hours ago',
    preview: 'Hey! I\'m planning to travel to Istanbul in July. Can I just...',
    sentiment: 'positive',
    fullMessage: 'Hey! I\'m planning to travel to Istanbul in July. Can I just arrive and start treatment?',
    aiReply: 'Hi David! Yes, we can arrange everything. We coordinate flights, accommodations at our partner hotels, and treatment scheduling.'
  },
]

const SENTIMENT_CONFIG: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
  positive: { color: 'bg-green-100 text-green-700', icon: '😊', label: 'Positive' },
  neutral: { color: 'bg-slate-100 text-slate-700', icon: '😐', label: 'Neutral' },
  anxiety: { color: 'bg-orange-100 text-orange-700', icon: '😟', label: 'Anxious / High Treatment Intent' },
  excited: { color: 'bg-purple-100 text-purple-700', icon: '🎉', label: 'Excited / Satisfied' },
}

export default function AIConcierge() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(MOCK_LEADS[0])
  const [replyText, setReplyText] = useState('')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">AI Concierge</h1>
        <p className="text-slate-600">Manage incoming patient inquiries and AI-generated responses</p>
      </div>

      {/* Three Column Layout */}
      <div className="grid grid-cols-3 gap-6 h-[600px]">
        {/* Left: Incoming Leads Inbox */}
        <div className="medical-card p-6 flex flex-col overflow-hidden">
          <h2 className="text-lg font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">
            INCOMING LEADS INBOX
          </h2>
          <div className="flex-1 overflow-y-auto space-y-2">
            {MOCK_LEADS.map((lead) => (
              <button
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className={`w-full p-3 rounded-lg text-left transition-all ${
                  selectedLead?.id === lead.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-slate-50 border border-slate-100'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 text-sm">{lead.name}</p>
                    <p className="text-xs text-slate-500 truncate">{lead.preview}</p>
                  </div>
                  <p className="text-xs text-slate-400 ml-2 flex-shrink-0">{lead.timestamp}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Center: Message Detail */}
        {selectedLead && (
          <div className="medical-card p-6 flex flex-col overflow-hidden">
            <div className="mb-4 pb-4 border-b border-slate-100">
              <p className="font-semibold text-slate-900">{selectedLead.name}</p>
              <p className="text-xs text-slate-500">Country of Inquiry: {selectedLead.country}</p>
            </div>
            <div className="flex-1 overflow-y-auto mb-4 space-y-3">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-sm text-slate-900">{selectedLead.fullMessage}</p>
              </div>
            </div>
            <div className="flex gap-2 pt-3 border-t border-slate-100">
              <button className="flex-1 px-3 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors">
                ← Back
              </button>
              <button className="flex-1 px-3 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors">
                Archive
              </button>
            </div>
          </div>
        )}

        {/* Right: AI Reply Template */}
        {selectedLead && (
          <div className="medical-card p-6 flex flex-col overflow-hidden">
            <div className="mb-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-yellow-500" />
                <p className="font-semibold text-slate-900">DENTLIM CO-PILOT</p>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                INFERRED SENTIMENT:{' '}
                <span className={`font-bold ${SENTIMENT_CONFIG[selectedLead.sentiment].color}`}>
                  {SENTIMENT_CONFIG[selectedLead.sentiment].label}
                </span>
              </p>
            </div>

            <div className="mb-4">
              <p className="text-xs font-semibold text-slate-600 mb-2">CLINICAL PROFILE:</p>
              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedLead.sentiment === 'anxiety'
                  ? 'Requires direct material guarantees & dental licensing credentials.'
                  : selectedLead.sentiment === 'excited'
                    ? 'Patient satisfied. Focus on scheduling and confirmations.'
                    : 'Standard inquiry. Provide treatment options and timeline.'}
              </p>
            </div>

            <div className="flex-1 mb-4">
              <p className="text-xs font-semibold text-slate-600 mb-2">AI AUTOGENERATED TEMPLATE REPLY:</p>
              <textarea
                value={replyText || selectedLead.aiReply}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full h-32 p-3 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <div className="flex gap-2">
              <button className="flex-1 medical-button-primary flex items-center justify-center gap-2 py-2">
                <Send size={16} />
                Send
              </button>
              <button className="flex-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                <CheckCircle2 size={16} />
                Approve & Dispatch
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
