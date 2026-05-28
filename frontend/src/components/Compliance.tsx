'use client'

import React, { useState } from 'react'
import { CheckCircle2, AlertCircle, RefreshCw, Shield, Lock, Check } from 'lucide-react'

interface ComplianceAudit {
  id: string
  name: string
  country: string
  kvvkConsent: 'signed' | 'pending'
  eNabazStatus: 'synced' | 'not_synced'
  ussStatus?: 'push' | 'pending'
}

interface CredentialStatus {
  label: string
  status: 'valid' | 'excellent' | 'linked'
  value: string
  meta?: string
}

const MOCK_AUDITS: ComplianceAudit[] = [
  {
    id: '1',
    name: 'Emma Richardson',
    country: 'United Kingdom',
    kvvkConsent: 'signed',
    eNabazStatus: 'not_synced',
    ussStatus: 'push'
  },
  {
    id: '2',
    name: 'Anna Kowalski',
    country: 'Germany',
    kvvkConsent: 'signed',
    eNabazStatus: 'synced'
  },
  {
    id: '3',
    name: 'Fatima Al-Rashid',
    country: 'Saudi Arabia',
    kvvkConsent: 'signed',
    eNabazStatus: 'synced'
  },
  {
    id: '4',
    name: 'Sophie Martin',
    country: 'France',
    kvvkConsent: 'pending',
    eNabazStatus: 'not_synced',
    ussStatus: 'push'
  },
  {
    id: '5',
    name: 'David Smith',
    country: 'United States',
    kvvkConsent: 'pending',
    eNabazStatus: 'not_synced',
    ussStatus: 'push'
  }
]

const CREDENTIALS: CredentialStatus[] = [
  {
    label: 'Authorization Certificate Status:',
    status: 'valid',
    value: '✓ VALID (No: HT-2026-9812)'
  },
  {
    label: 'TUSKA Clinical Accreditation Score:',
    status: 'excellent',
    value: 'Excellent (A+)'
  },
  {
    label: 'HealthTürk API Connection:',
    status: 'linked',
    value: 'Linked'
  }
]

const KVVKBadge = ({ status }: { status: 'signed' | 'pending' }) => {
  if (status === 'signed') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
        <CheckCircle2 size={14} />
        KVVK Consent: SIGNED
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
      <AlertCircle size={14} />
      KVVK Consent: PENDING
    </span>
  )
}

const ENabazBadge = ({ status }: { status: 'synced' | 'not_synced' }) => {
  if (status === 'synced') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
        <Check size={14} />
        e-Nabaz Status: SYNCED
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
        <AlertCircle size={14} />
        e-Nabaz Status: NOT SYNCED
      </span>
    )
}

export default function Compliance() {
  const [selectedAudit, setSelectedAudit] = useState<ComplianceAudit | null>(MOCK_AUDITS[0])
  const [syncingId, setSyncingId] = useState<string | null>(null)

  const handleSync = (id: string) => {
    setSyncingId(id)
    setTimeout(() => setSyncingId(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Regulatory Compliance & MoH Portal Integrations</h1>
        <p className="text-slate-600">
          Direct dashboard monitoring Turkish Healthcare laws, KVVK, e-Nabaz sync, and USHAS health tourism certificates.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left: Live Compliance Audits & Transactions */}
        <div className="col-span-1 medical-card p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 pb-4 border-b border-slate-100">
            LIVE COMPLIANCE AUDITS & TRANSACTIONS
          </h2>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {MOCK_AUDITS.map((audit) => (
              <button
                key={audit.id}
                onClick={() => setSelectedAudit(audit)}
                className={`w-full text-left p-4 rounded-lg transition-all ${
                  selectedAudit?.id === audit.id
                    ? 'bg-blue-50 border border-blue-300 shadow-md'
                    : 'border border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="space-y-2">
                  <p className="font-semibold text-slate-900">{audit.name}</p>
                  <p className="text-xs text-slate-500">Originating Country: {audit.country}</p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <KVVKBadge status={audit.kvvkConsent} />
                    <ENabazBadge status={audit.eNabazStatus} />
                  </div>

                  {audit.ussStatus === 'push' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSync(audit.id)
                      }}
                      className={`w-full px-3 py-2 text-xs font-semibold rounded transition-all ${
                        syncingId === audit.id
                          ? 'bg-green-500 text-white'
                          : 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'
                      }`}
                    >
                      {syncingId === audit.id ? '✓ USS Push' : 'USS Push'}
                    </button>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: USHAS & HealthTürk Credentials */}
        <div className="col-span-2 medical-card p-6 space-y-6">
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900">USHAS & HEALTHTÜRKE CREDENTIALS</h2>

            {/* Credentials Grid */}
            <div className="grid grid-cols-2 gap-6">
              {CREDENTIALS.map((cred, idx) => (
                <div key={idx} className="space-y-2">
                  <p className="text-sm font-semibold text-slate-600">{cred.label}</p>
                  <div className={`p-4 rounded-lg border-2 ${
                    cred.status === 'valid'
                      ? 'bg-green-50 border-green-200'
                      : cred.status === 'excellent'
                        ? 'bg-purple-50 border-purple-200'
                        : 'bg-cyan-50 border-cyan-200'
                  }`}>
                    <p className={`font-bold text-sm ${
                      cred.status === 'valid'
                        ? 'text-green-700'
                        : cred.status === 'excellent'
                          ? 'text-purple-700'
                          : 'text-cyan-700'
                    }`}>
                      {cred.value}
                    </p>
                    {cred.meta && <p className="text-xs text-slate-600 mt-1">{cred.meta}</p>}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <button className="medical-button-primary py-3 font-semibold flex items-center justify-center gap-2">
                <RefreshCw size={18} />
                ENFORCE BULK MINISTRY OF HEALTH SYNC
              </button>
              <button className="medical-button-primary py-3 font-semibold flex items-center justify-center gap-2">
                <Lock size={18} />
                RUN COMPLETE KVVK SECURITY AUDIT
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Audit View (if selected) */}
      {selectedAudit && (
        <div className="medical-card p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Audit Details: {selectedAudit.name}</h3>

          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-600 mb-1">PATIENT NAME</p>
                <p className="font-semibold text-slate-900">{selectedAudit.name}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-600 mb-1">COUNTRY OF ORIGIN</p>
                <p className="font-semibold text-slate-900">{selectedAudit.country}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-600 mb-2">KVVK CONSENT STATUS</p>
                <KVVKBadge status={selectedAudit.kvvkConsent} />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-600 mb-2">e-NABAZ SYNC STATUS</p>
                <ENabazBadge status={selectedAudit.eNabazStatus} />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-500 text-center">
              All compliance records are encrypted and securely stored on domestic Turkish servers per KVVK regulations.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
