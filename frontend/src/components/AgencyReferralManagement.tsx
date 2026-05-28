'use client'

import React, { useState } from 'react'
import { Plus, X, DollarSign, Users, Globe, TrendingUp, CheckCircle2, Clock, AlertCircle, Send, Download, Eye } from 'lucide-react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface Agency {
  id: string
  name: string
  country: string
  contactPerson: string
  email: string
  phone: string
  status: 'active' | 'inactive' | 'pending'
  totalReferrals: number
  completedSurgeries: number
  pendingCommission: number
  paidCommission: number
  commissionRate: number // percentage
  currency: string
  portalAccess: boolean
  notes: string
}

interface ReferralLead {
  id: string
  agencyId: string
  patientName: string
  treatmentType: string
  status: 'inquiry' | 'consultation' | 'quoting' | 'booked' | 'completed' | 'cancelled'
  referralDate: string
  value: number
  currency: string
  commissionAmount: number
  commissionPaid: boolean
}

const MOCK_AGENCIES: Agency[] = [
  {
    id: '1',
    name: 'Global Health Tourism Network',
    country: 'United States',
    contactPerson: 'John Peterson',
    email: 'john@globalhealth.com',
    phone: '+1 212 555 1234',
    status: 'active',
    totalReferrals: 28,
    completedSurgeries: 12,
    pendingCommission: 3500,
    paidCommission: 8400,
    commissionRate: 15,
    currency: 'USD',
    portalAccess: true,
    notes: 'High-volume referrer, excellent cooperation',
  },
  {
    id: '2',
    name: 'European Dental Facilitators',
    country: 'Germany',
    contactPerson: 'Maria Schmidt',
    email: 'maria@eurodental.de',
    phone: '+49 30 555 4321',
    status: 'active',
    totalReferrals: 15,
    completedSurgeries: 8,
    pendingCommission: 1200,
    paidCommission: 4800,
    commissionRate: 12,
    currency: 'EUR',
    portalAccess: true,
    notes: 'Specializes in implant cases',
  },
  {
    id: '3',
    name: 'Middle East Medical Tourism',
    country: 'United Arab Emirates',
    contactPerson: 'Ahmed Al-Mansouri',
    email: 'ahmed@metourism.ae',
    phone: '+971 4 555 8765',
    status: 'pending',
    totalReferrals: 5,
    completedSurgeries: 2,
    pendingCommission: 800,
    paidCommission: 0,
    commissionRate: 18,
    currency: 'AED',
    portalAccess: false,
    notes: 'New partner, awaiting portal setup',
  },
]

const MOCK_REFERRALS: ReferralLead[] = [
  {
    id: '1',
    agencyId: '1',
    patientName: 'Emma Richardson',
    treatmentType: 'Implant Surgery',
    status: 'completed',
    referralDate: '2024-05-10',
    value: 3500,
    currency: 'USD',
    commissionAmount: 525,
    commissionPaid: true,
  },
  {
    id: '2',
    agencyId: '1',
    patientName: 'David Smith',
    treatmentType: 'Root Canal',
    status: 'booked',
    referralDate: '2024-05-15',
    value: 1200,
    currency: 'USD',
    commissionAmount: 180,
    commissionPaid: false,
  },
  {
    id: '3',
    agencyId: '2',
    patientName: 'Sophie Martin',
    treatmentType: 'Orthodontics',
    status: 'consultation',
    referralDate: '2024-05-18',
    value: 2800,
    currency: 'EUR',
    commissionAmount: 336,
    commissionPaid: false,
  },
  {
    id: '4',
    agencyId: '2',
    patientName: 'Anna Kowalski',
    treatmentType: 'Implant Surgery',
    status: 'completed',
    referralDate: '2024-04-20',
    value: 4200,
    currency: 'EUR',
    commissionAmount: 504,
    commissionPaid: true,
  },
]

export default function AgencyReferralManagement() {
  const [activeTab, setActiveTab] = useState<'agencies' | 'referrals' | 'commission' | 'portal'>('agencies')
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(MOCK_AGENCIES[0])
  const [agencies, setAgencies] = useState<Agency[]>(MOCK_AGENCIES)
  const [referrals, setReferrals] = useState<ReferralLead[]>(MOCK_REFERRALS)
  const [showNewAgencyForm, setShowNewAgencyForm] = useState(false)

  const getAgencyReferrals = (agencyId: string) => {
    return referrals.filter(r => r.agencyId === agencyId)
  }

  const getAgencyStats = (agency: Agency) => {
    const agencyReferrals = getAgencyReferrals(agency.id)
    const completedValue = agencyReferrals
      .filter(r => r.status === 'completed')
      .reduce((sum, r) => sum + r.value, 0)
    const conversionRate = agency.totalReferrals > 0 
      ? ((agency.completedSurgeries / agency.totalReferrals) * 100).toFixed(1)
      : '0'

    return { completedValue, conversionRate }
  }

  const commissionChartData = {
    labels: agencies.map(a => a.name.split(' ')[0]),
    datasets: [
      {
        label: 'Pending Commission',
        data: agencies.map(a => a.pendingCommission),
        backgroundColor: '#fbbf24',
      },
      {
        label: 'Paid Commission',
        data: agencies.map(a => a.paidCommission),
        backgroundColor: '#10b981',
      },
    ],
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Agency & Referral Management</h1>
        <p className="text-slate-600">Track referral partners, manage commissions, and provide agency portal access</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b border-slate-200">
        {[
          { id: 'agencies', label: '🏢 Agencies', icon: '🌐' },
          { id: 'referrals', label: '👥 Referrals', icon: '📊' },
          { id: 'commission', label: '💰 Commissions', icon: '💵' },
          { id: 'portal', label: '🔐 Portal Access', icon: '🔑' },
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

      {/* AGENCIES TAB */}
      {activeTab === 'agencies' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Referral Partners</h2>
            <button
              onClick={() => setShowNewAgencyForm(!showNewAgencyForm)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              <Plus size={18} />
              <span>Add Agency</span>
            </button>
          </div>

          {showNewAgencyForm && (
            <div className="medical-card p-6 bg-blue-50 border-l-4 border-blue-600">
              <p className="text-sm text-slate-600 mb-4">Add new referral partner...</p>
              <button onClick={() => setShowNewAgencyForm(false)} className="text-xs text-slate-500 hover:text-slate-700">
                Cancel
              </button>
            </div>
          )}

          {/* Agency List */}
          <div className="grid grid-cols-1 gap-6">
            {agencies.map((agency) => {
              const { completedValue, conversionRate } = getAgencyStats(agency)
              const isSelected = selectedAgency?.id === agency.id

              return (
                <div
                  key={agency.id}
                  onClick={() => setSelectedAgency(agency)}
                  className={`medical-card p-6 cursor-pointer transition-all hover:shadow-lg border-l-4 ${
                    isSelected ? 'border-blue-600 bg-blue-50' : 'border-slate-200'
                  }`}
                >
                  <div className="grid grid-cols-2 gap-6 mb-4">
                    {/* Left Side: Agency Info */}
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">{agency.name}</h3>
                          <p className="text-sm text-slate-600">{agency.country}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          agency.status === 'active' ? 'bg-green-100 text-green-700' :
                          agency.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {agency.status}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs text-slate-600">
                          <strong>Contact:</strong> {agency.contactPerson}
                        </p>
                        <p className="text-xs text-slate-600">
                          <strong>Email:</strong> {agency.email}
                        </p>
                        <p className="text-xs text-slate-600">
                          <strong>Phone:</strong> {agency.phone}
                        </p>
                      </div>
                    </div>

                    {/* Right Side: Performance Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-slate-100 rounded">
                        <p className="text-xs text-slate-600">Total Referrals</p>
                        <p className="text-2xl font-bold text-slate-900">{agency.totalReferrals}</p>
                      </div>
                      <div className="p-3 bg-green-100 rounded">
                        <p className="text-xs text-slate-600">Completed</p>
                        <p className="text-2xl font-bold text-green-700">{agency.completedSurgeries}</p>
                      </div>
                      <div className="p-3 bg-blue-100 rounded">
                        <p className="text-xs text-slate-600">Conversion Rate</p>
                        <p className="text-2xl font-bold text-blue-700">{conversionRate}%</p>
                      </div>
                      <div className="p-3 bg-purple-100 rounded">
                        <p className="text-xs text-slate-600">Commission Rate</p>
                        <p className="text-2xl font-bold text-purple-700">{agency.commissionRate}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Commission Summary */}
                  <div className="border-t border-slate-200 pt-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-slate-600">Pending Commission</p>
                        <p className="font-bold text-orange-600 text-lg">{agency.currency} {agency.pendingCommission.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">Already Paid</p>
                        <p className="font-bold text-green-600 text-lg">{agency.currency} {agency.paidCommission.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        {agency.portalAccess && (
                          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                            <CheckCircle2 size={14} />
                            <span>Portal Active</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="border-t border-slate-200 mt-4 pt-4 flex justify-between">
                    <div className="flex space-x-2">
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1">
                        <Eye size={14} />
                        <span>View Details</span>
                      </button>
                      {!agency.portalAccess && (
                        <button className="text-sm text-purple-600 hover:text-purple-700 font-semibold flex items-center space-x-1">
                          <Send size={14} />
                          <span>Enable Portal</span>
                        </button>
                      )}
                    </div>
                    <button className="text-sm text-slate-500 hover:text-slate-700">
                      <X size={18} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* REFERRALS TAB */}
      {activeTab === 'referrals' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Referral Tracking</h2>

          {/* Filter by Agency */}
          {selectedAgency && (
            <div className="medical-card p-4 bg-blue-50 border-l-4 border-blue-600">
              <p className="text-sm font-semibold text-blue-900">
                Showing referrals from: <strong>{selectedAgency.name}</strong>
              </p>
            </div>
          )}

          {/* Referrals Table */}
          <div className="medical-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-700">Patient Name</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-700">Treatment</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-700">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-700">Referral Date</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-700">Treatment Value</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-700">Commission</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-700">Paid</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {(selectedAgency
                    ? getAgencyReferrals(selectedAgency.id)
                    : referrals
                  ).map((referral) => (
                    <tr key={referral.id} className="hover:bg-slate-50 transition-all">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{referral.patientName}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{referral.treatmentType}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          referral.status === 'completed' ? 'bg-green-100 text-green-700' :
                          referral.status === 'booked' ? 'bg-blue-100 text-blue-700' :
                          referral.status === 'consultation' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {referral.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{referral.referralDate}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900">{referral.currency} {referral.value.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm font-bold text-purple-600">{referral.currency} {referral.commissionAmount.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        {referral.commissionPaid ? (
                          <CheckCircle2 className="text-green-600" size={18} />
                        ) : (
                          <Clock className="text-yellow-600" size={18} />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* COMMISSION TAB */}
      {activeTab === 'commission' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Commission Management</h2>

          {/* Commission Chart */}
          <div className="medical-card p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Commission Distribution</h3>
            <Bar
              data={commissionChartData}
              options={{
                responsive: true,
                plugins: { legend: { position: 'bottom' as const } },
                scales: { y: { beginAtZero: true } },
              }}
            />
          </div>

          {/* Commission Summary */}
          <div className="grid grid-cols-3 gap-6">
            <div className="medical-card p-6 bg-orange-50 border-l-4 border-orange-500">
              <p className="text-sm text-slate-600 mb-2">Total Pending Commissions</p>
              <p className="text-3xl font-bold text-orange-600">
                ${agencies.reduce((sum, a) => sum + a.pendingCommission, 0).toLocaleString()}
              </p>
            </div>
            <div className="medical-card p-6 bg-green-50 border-l-4 border-green-500">
              <p className="text-sm text-slate-600 mb-2">Total Paid Commissions</p>
              <p className="text-3xl font-bold text-green-600">
                ${agencies.reduce((sum, a) => sum + a.paidCommission, 0).toLocaleString()}
              </p>
            </div>
            <div className="medical-card p-6 bg-blue-50 border-l-4 border-blue-500">
              <p className="text-sm text-slate-600 mb-2">Active Agencies</p>
              <p className="text-3xl font-bold text-blue-600">{agencies.filter(a => a.status === 'active').length}</p>
            </div>
          </div>

          {/* Pending Payment Actions */}
          <div className="medical-card p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Pending Commission Payments</h3>
            <div className="space-y-3">
              {agencies.map((agency) => (
                agency.pendingCommission > 0 && (
                  <div key={agency.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div>
                      <p className="font-semibold text-slate-900">{agency.name}</p>
                      <p className="text-sm text-slate-600">{agency.currency} {agency.pendingCommission.toLocaleString()} due</p>
                    </div>
                    <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all text-sm font-semibold">
                      <Send size={14} />
                      <span>Pay Now</span>
                    </button>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PORTAL ACCESS TAB */}
      {activeTab === 'portal' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Agency Portal Access</h2>

          <div className="medical-card p-6 bg-blue-50 border-l-4 border-blue-600">
            <div className="flex items-start space-x-3">
              <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
              <div>
                <h3 className="font-semibold text-blue-900">Role-Based Portal Features</h3>
                <p className="text-sm text-blue-800 mt-1">
                  Agencies can track their referred leads from initial consultation through completed surgery, view commission status, and receive payment reports—all without burdening clinic administrative staff.
                </p>
              </div>
            </div>
          </div>

          {/* Portal Access Table */}
          <div className="medical-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-700">Agency</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-700">Contact Person</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-700">Portal Status</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-700">Login Credentials</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-700">Last Login</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {agencies.map((agency) => (
                    <tr key={agency.id} className="hover:bg-slate-50 transition-all">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{agency.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{agency.contactPerson}</td>
                      <td className="px-6 py-4">
                        {agency.portalAccess ? (
                          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                            <CheckCircle2 size={14} />
                            <span>Active</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                            <Clock size={14} />
                            <span>Pending</span>
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {agency.portalAccess ? (
                          <button className="text-blue-600 hover:text-blue-700 font-semibold text-xs">Reset Password</button>
                        ) : (
                          <button className="text-purple-600 hover:text-purple-700 font-semibold text-xs">Send Invite</button>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{agency.portalAccess ? '2 hours ago' : 'Never'}</td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-slate-500 hover:text-slate-700">
                          <X size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Portal Preview */}
          <div className="medical-card p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Agency Portal Preview</h3>
            <div className="bg-slate-50 p-8 rounded-lg border-2 border-dashed border-slate-300">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <p className="text-sm font-semibold text-slate-700 mb-2">📊 My Referrals Dashboard</p>
                  <p className="text-xs text-slate-600">Track all referred patients from inquiry to completed treatment</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <p className="text-sm font-semibold text-slate-700 mb-2">💰 Commission Reports</p>
                  <p className="text-xs text-slate-600">View earned commissions, payment status, and detailed breakdowns</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <p className="text-sm font-semibold text-slate-700 mb-2">📈 Performance Metrics</p>
                  <p className="text-xs text-slate-600">See conversion rates, average treatment values, and growth trends</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <p className="text-sm font-semibold text-slate-700 mb-2">🔐 Secure Access</p>
                  <p className="text-xs text-slate-600">Two-factor authentication and encrypted data transmission</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
