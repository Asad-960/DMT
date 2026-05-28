'use client'

import React, { useState } from 'react'
import { FileText, Users, Calendar, DollarSign, TrendingUp, Settings, LogOut, Menu, X, Brain, MessageSquare, Activity, Shield } from 'lucide-react'
import Dashboard from '@/components/Dashboard'
import PatientManagement from '@/components/PatientManagement'
import AppointmentScheduler from '@/components/AppointmentScheduler'
import TravelCoordination from '@/components/TravelCoordination'
import AnalyticsDashboard from '@/components/AnalyticsDashboard'
import PaymentSystem from '@/components/PaymentSystem'
import AIdiagnostics from '@/components/AIdiagnostics'
import AIConcierge from '@/components/AIConcierge'
import PatientPipeline from '@/components/PatientPipeline'
import Compliance from '@/components/Compliance'
import TreatmentPlanBuilder from '@/components/TreatmentPlanBuilder'
import SalesAutomation from '@/components/SalesAutomation'
import MedicalTourismLogistics from '@/components/MedicalTourismLogistics'
import AgencyReferralManagement from '@/components/AgencyReferralManagement'

type Page = 'dashboard' | 'patients' | 'appointments' | 'travel' | 'analytics' | 'payments' | 'diagnostics' | 'concierge' | 'pipeline' | 'compliance' | 'treatment-plan' | 'sales-automation' | 'medical-logistics' | 'agency-referral'

export default function AdminPage() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [user] = useState({
    name: 'Dr. Mehmet Özdemir',
    role: 'Clinic Owner',
    clinic: 'Istanbul Dental Excellence',
    avatar: '👨‍⚕️'
  })

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'travel', label: 'Travel & Logistics', icon: FileText },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'diagnostics', label: 'AI Diagnostics', icon: Brain },
    { id: 'concierge', label: 'AI Concierge', icon: MessageSquare },
    { id: 'pipeline', label: 'Patient Pipeline', icon: Activity },
    { id: 'compliance', label: 'Compliance', icon: Shield },
    { id: 'treatment-plan', label: 'Treatment Plans', icon: FileText },
    { id: 'sales-automation', label: 'Sales Automation', icon: Zap },
    { id: 'medical-logistics', label: 'Medical Tourism', icon: Brain },
    { id: 'agency-referral', label: 'Agency Mgmt', icon: Users },
  ]

  const renderPage = () => {
    const pages = {
      dashboard: <Dashboard />,
      patients: <PatientManagement />,
      appointments: <AppointmentScheduler />,
      travel: <TravelCoordination />,
      analytics: <AnalyticsDashboard />,
      payments: <PaymentSystem />,
      diagnostics: <AIdiagnostics />,
      concierge: <AIConcierge />,
      pipeline: <PatientPipeline />,
      compliance: <Compliance />,
    }
    return pages[currentPage]
  }

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 text-white transition-all duration-300 shadow-xl overflow-hidden flex flex-col sidebar-transition`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-blue-400 border-opacity-30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-lg text-blue-600">
              D
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight">DMT</h1>
              <p className="text-xs text-blue-100">Dental CRM</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item, idx) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id as Page)
                  window.scrollTo(0, 0)
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 nav-item ${
                  isActive
                    ? 'bg-white text-blue-600 shadow-lg font-semibold'
                    : 'text-blue-50 hover:bg-blue-500 hover:bg-opacity-50'
                }`}
                style={{
                  animationDelay: `${idx * 50}ms`
                }}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-blue-400 border-opacity-30 space-y-3">
          <div className="px-3 py-3 bg-blue-500 bg-opacity-50 rounded-lg">
            <div className="text-sm font-semibold text-white">{user.name}</div>
            <div className="text-xs text-blue-100">{user.role}</div>
            <div className="text-xs text-blue-50 mt-1">{user.clinic}</div>
          </div>
          <button className="w-full flex items-center space-x-2 px-4 py-2.5 text-blue-50 hover:bg-blue-500 hover:bg-opacity-50 rounded-lg transition-all duration-200 hover:text-white">
            <Settings size={18} />
            <span className="text-sm font-medium">Settings</span>
          </button>
          <button className="w-full flex items-center space-x-2 px-4 py-2.5 text-blue-100 hover:bg-red-500 hover:bg-opacity-80 rounded-lg transition-all duration-200 hover:text-white">
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-4 flex-1">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2.5 hover:bg-slate-100 rounded-lg transition-all duration-200 text-slate-600 hover:text-slate-900"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* Date Range */}
            <div className="flex items-center space-x-2 text-slate-600 px-4 py-2 bg-slate-50 rounded-lg border border-slate-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">Nov 16, 2020 - Dec 16, 2020</span>
            </div>

            {/* Notification */}
            <button className="p-2.5 hover:bg-slate-100 rounded-lg transition-all duration-200 text-slate-600 relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></div>
            </button>

            {/* User Profile */}
            <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <div className="text-sm font-semibold text-slate-900">Evan Yates</div>
                <div className="text-xs text-slate-400">Clinic Owner</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-lg shadow-md">
                {user.avatar}
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {renderPage()}
          </div>
        </div>
      </div>
    </div>
  )
}
