'use client'

import React, { useState } from 'react'
import { FileText, Users, Calendar, DollarSign, TrendingUp, Settings, LogOut, Menu, X } from 'lucide-react'
import Dashboard from '@/components/Dashboard'
import PatientManagement from '@/components/PatientManagement'
import AppointmentScheduler from '@/components/AppointmentScheduler'
import TravelCoordination from '@/components/TravelCoordination'
import AnalyticsDashboard from '@/components/AnalyticsDashboard'
import PaymentSystem from '@/components/PaymentSystem'

type Page = 'dashboard' | 'patients' | 'appointments' | 'travel' | 'analytics' | 'payments'

export default function Home() {
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
  ]

  const renderPage = () => {
    const pages = {
      dashboard: <Dashboard />,
      patients: <PatientManagement />,
      appointments: <AppointmentScheduler />,
      travel: <TravelCoordination />,
      analytics: <AnalyticsDashboard />,
      payments: <PaymentSystem />,
    }
    return pages[currentPage]
  }

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white transition-all duration-300 shadow-lg overflow-hidden flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center font-bold text-lg">
              D
            </div>
            <div>
              <h1 className="font-bold text-lg">DMT</h1>
              <p className="text-xs text-slate-400">Dental CRM</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id as Page)
                  window.scrollTo(0, 0)
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-slate-700 space-y-3">
          <div className="px-3 py-3 bg-slate-700 rounded-lg">
            <div className="text-sm font-semibold text-white">{user.name}</div>
            <div className="text-xs text-slate-400">{user.role}</div>
            <div className="text-xs text-slate-500 mt-1">{user.clinic}</div>
          </div>
          <button className="w-full flex items-center space-x-2 px-4 py-2.5 text-slate-300 hover:bg-slate-700 rounded-lg transition-all duration-200">
            <Settings size={18} />
            <span className="text-sm font-medium">Settings</span>
          </button>
          <button className="w-full flex items-center space-x-2 px-4 py-2.5 text-red-400 hover:bg-slate-700 rounded-lg transition-all duration-200">
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-all duration-200"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div className="text-sm font-semibold text-slate-900">Welcome back, Dr. Özdemir</div>
              <div className="text-xs text-slate-500">Last login: Today at 9:30 AM</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-xl">
              {user.avatar}
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
