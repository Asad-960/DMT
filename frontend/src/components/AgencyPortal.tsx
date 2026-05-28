'use client'

import React, { useState } from 'react'
import { Briefcase, Users, DollarSign, TrendingUp, Search, Filter, Shield, ArrowRight, CheckCircle2, Plus } from 'lucide-react'

interface Agency {
  id: string
  name: string
  contact: string
  leads: number
  converted: number
  commissionRate: string
  totalPaid: string
  status: 'active' | 'pending' | 'inactive'
}

export default function AgencyPortal() {
  const [activeView, setActiveView] = useState<'admin' | 'agency_sim'>('admin')
  const [searchTerm, setSearchTerm] = useState('')

  const agencies: Agency[] = [
    { id: '1', name: 'EuroHealth Travels', contact: 'Mark Davies (UK)', leads: 45, converted: 12, commissionRate: '15%', totalPaid: '£ 14,500', status: 'active' },
    { id: '2', name: 'MedTour Agency DE', contact: 'Julia Weber (Germany)', leads: 32, converted: 8, commissionRate: '15%', totalPaid: '€ 9,200', status: 'active' },
    { id: '3', name: 'Gulf Care Connect', contact: 'Ahmed Al-Farsi (UAE)', leads: 18, converted: 6, commissionRate: '20%', totalPaid: '$ 12,400', status: 'active' },
    { id: '4', name: 'Nordic Dental Tourism', contact: 'Erik Hansen (Sweden)', leads: 5, converted: 0, commissionRate: '10%', totalPaid: '€ 0', status: 'pending' },
  ]

  const statusColors = {
    active: 'bg-emerald-100 text-emerald-800',
    pending: 'bg-yellow-100 text-yellow-800',
    inactive: 'bg-slate-100 text-slate-800',
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Agency & Referral Portal</h1>
          <p className="text-slate-600 mt-1">Manage B2B facilitators, track commissions, and monitor referral pipelines.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveView('admin')}
            className={`px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 transition-all ${activeView === 'admin' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'}`}
          >
            <Shield size={16} /> Admin View
          </button>
          <button
            onClick={() => setActiveView('agency_sim')}
            className={`px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 transition-all ${activeView === 'agency_sim' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}
          >
            <Briefcase size={16} /> Agency Simulation View
          </button>
        </div>
      </div>

      {activeView === 'admin' && (
        <div className="space-y-6 animate-slideInLeft">
          {/* KPIs */}
          <div className="grid grid-cols-4 gap-6">
            <div className="medical-card p-6 border-l-4 border-blue-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-slate-500">Active Agencies</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">24</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg"><Briefcase className="text-blue-600" size={20} /></div>
              </div>
            </div>
            <div className="medical-card p-6 border-l-4 border-emerald-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-slate-500">Total Agency Leads (MTD)</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">142</p>
                </div>
                <div className="p-2 bg-emerald-50 rounded-lg"><Users className="text-emerald-600" size={20} /></div>
              </div>
            </div>
            <div className="medical-card p-6 border-l-4 border-purple-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-slate-500">Agency Conversion Rate</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">18.5%</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-lg"><TrendingUp className="text-purple-600" size={20} /></div>
              </div>
            </div>
            <div className="medical-card p-6 border-l-4 border-orange-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-slate-500">Commissions Paid (YTD)</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">€ 42.5K</p>
                </div>
                <div className="p-2 bg-orange-50 rounded-lg"><DollarSign className="text-orange-600" size={20} /></div>
              </div>
            </div>
          </div>

          {/* Agency List */}
          <div className="medical-card overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-lg font-bold text-slate-900">Partner Agencies Directory</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" placeholder="Search agencies..." className="medical-input pl-9 text-sm py-2" />
                </div>
                <button className="p-2 text-slate-500 hover:bg-slate-200 rounded-md"><Filter size={18} /></button>
                <button className="medical-button-primary text-sm py-2">Add Agency</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white border-b border-slate-200">
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Agency Name</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Contact</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase text-center">Leads (Total)</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase text-center">Converted</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Rate</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Paid (Total)</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {agencies.map((agency) => (
                    <tr key={agency.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-900">{agency.name}</td>
                      <td className="p-4 text-sm text-slate-600">{agency.contact}</td>
                      <td className="p-4 text-center font-semibold text-slate-700">{agency.leads}</td>
                      <td className="p-4 text-center font-bold text-emerald-600">{agency.converted}</td>
                      <td className="p-4 text-sm font-semibold text-slate-900">{agency.commissionRate}</td>
                      <td className="p-4 font-bold text-slate-700">{agency.totalPaid}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${statusColors[agency.status]}`}>
                          {agency.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold">Manage</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeView === 'agency_sim' && (
        <div className="bg-slate-900 rounded-xl p-8 animate-slideInRight text-white min-h-[600px] border-4 border-indigo-500 shadow-2xl relative overflow-hidden">
          {/* Top warning banner */}
          <div className="absolute top-0 left-0 right-0 bg-indigo-600 text-center py-1 text-xs font-bold uppercase tracking-widest">
            Simulation Mode: Agency View (EuroHealth Travels)
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-700">
              <div>
                <h2 className="text-2xl font-bold text-white">EuroHealth Travels Portal</h2>
                <p className="text-slate-400">Welcome back, Mark Davies. Here is the status of your referred patients.</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-400 mb-1">Your Commission Balance</p>
                <p className="text-3xl font-bold text-emerald-400">£ 2,400 <span className="text-sm font-normal text-slate-500">Unpaid</span></p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
                <p className="text-slate-400 text-sm mb-1">Total Leads Sent</p>
                <p className="text-2xl font-bold">45</p>
              </div>
              <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
                <p className="text-slate-400 text-sm mb-1">Active Treatments</p>
                <p className="text-2xl font-bold text-blue-400">3</p>
              </div>
              <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
                <p className="text-slate-400 text-sm mb-1">Completed Surgeries</p>
                <p className="text-2xl font-bold text-emerald-400">12</p>
              </div>
            </div>

            <h3 className="text-lg font-bold mb-4">Patient Referral Pipeline</h3>
            <div className="space-y-3">
              {[
                { name: 'Oliver Twist', status: 'Inquiry Review', date: 'Today', commission: 'Pending Quote', stage: 1 },
                { name: 'Charlotte Brontë', status: 'Booked - Awaiting Arrival', date: '12 May 2024', commission: '£ 800 (Pending)', stage: 3 },
                { name: 'Arthur Conan Doyle', status: 'Treatment Completed', date: '05 May 2024', commission: '£ 1,200 (Cleared)', stage: 4 },
              ].map((patient, idx) => (
                <div key={idx} className="bg-slate-800 p-4 rounded-lg flex items-center justify-between border border-slate-700 hover:border-slate-500 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-500 bg-opacity-20 rounded-full flex items-center justify-center text-indigo-300 font-bold">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-white">{patient.name}</p>
                      <p className="text-xs text-slate-400">Referred: {patient.date}</p>
                    </div>
                  </div>

                  {/* Visual Pipeline progress line */}
                  <div className="flex items-center gap-1 w-1/3">
                    {[1, 2, 3, 4].map(step => (
                      <div key={step} className={`h-1.5 flex-1 rounded-full ${step <= patient.stage ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                    ))}
                  </div>

                  <div className="text-right w-48">
                    <p className={`text-sm font-bold ${patient.stage === 4 ? 'text-emerald-400' : 'text-slate-300'}`}>{patient.status}</p>
                    <p className="text-xs text-slate-400 mt-1">{patient.commission}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-6 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
              <Plus size={18} /> Submit New Patient Referral
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
