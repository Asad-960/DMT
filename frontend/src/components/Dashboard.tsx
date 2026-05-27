'use client'

import React from 'react'
import { ArrowUp, ArrowDown, Users, Activity, TrendingUp, Clock, CheckCircle } from 'lucide-react'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const StatCard = ({ icon: Icon, label, value, trend, color }: any) => (
  <div className="medical-card p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-slate-600 text-sm font-medium">{label}</p>
        <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
        {trend && (
          <div className={`flex items-center space-x-1 mt-2 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            <span className="text-sm font-semibold">{Math.abs(trend)}% from last month</span>
          </div>
        )}
      </div>
      <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${color}`}>
        <Icon size={28} className="text-white" />
      </div>
    </div>
  </div>
)

export default function Dashboard() {
  const stats = [
    { icon: Users, label: 'Total Patients', value: '1,245', trend: 12, color: 'bg-blue-500' },
    { icon: Activity, label: 'Active Cases', value: '34', trend: 5, color: 'bg-green-500' },
    { icon: CheckCircle, label: 'Completed Treatments', value: '892', trend: 8, color: 'bg-purple-500' },
    { icon: TrendingUp, label: 'This Month Revenue', value: '$58.5K', trend: 15, color: 'bg-cyan-500' },
  ]

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'International Patients',
        data: [45, 52, 48, 61, 55, 67],
        borderColor: 'rgb(0, 184, 217)',
        backgroundColor: 'rgba(0, 184, 217, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: 'Local Patients',
        data: [30, 35, 32, 40, 45, 42],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  }

  const barChartData = {
    labels: ['Crown', 'Implant', 'Cleaning', 'Root Canal', 'Whitening', 'Bridge'],
    datasets: [
      {
        label: 'Treatments',
        data: [45, 38, 52, 28, 35, 22],
        backgroundColor: [
          'rgba(0, 184, 217, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
      },
    ],
  }

  const doughnutData = {
    labels: ['International', 'Local', 'Referral'],
    datasets: [
      {
        data: [45, 35, 20],
        backgroundColor: ['rgba(0, 184, 217, 0.8)', 'rgba(59, 130, 246, 0.8)', 'rgba(34, 197, 94, 0.8)'],
        borderColor: ['rgb(0, 184, 217)', 'rgb(59, 130, 246)', 'rgb(34, 197, 94)'],
        borderWidth: 2,
      },
    ],
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Key Stats */}
      <div className="grid grid-cols-responsive">
        {stats.map((stat, idx) => (
          <div key={idx} className="animate-slideInLeft" style={{ animationDelay: `${idx * 50}ms` }}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Trends */}
        <div className="medical-card p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Patient Acquisition Trends</h3>
          <div className="h-80">
            <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } } }} />
          </div>
        </div>

        {/* Treatment Distribution */}
        <div className="medical-card p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Treatment Distribution</h3>
          <div className="h-80">
            <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false, indexAxis: 'y' }} />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Source */}
        <div className="medical-card p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Patient Source</h3>
          <div className="h-80 flex items-center justify-center">
            <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="medical-card p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Upcoming Appointments</h3>
          <div className="space-y-3">
            {[
              { name: 'John Smith', time: '09:00 AM', treatment: 'Crown', doctor: 'Dr. Mehmet' },
              { name: 'Sarah Johnson', time: '10:30 AM', treatment: 'Implant', doctor: 'Dr. Ayşe' },
              { name: 'Mike Chen', time: '01:00 PM', treatment: 'Cleaning', doctor: 'Dr. Mehmet' },
              { name: 'Lisa Brown', time: '02:30 PM', treatment: 'Root Canal', doctor: 'Dr. Fatih' },
            ].map((apt, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all duration-200">
                <div className="flex items-center space-x-3">
                  <Clock size={18} className="text-cyan-500" />
                  <div>
                    <p className="font-medium text-slate-900">{apt.name}</p>
                    <p className="text-xs text-slate-500">{apt.treatment} - {apt.doctor}</p>
                  </div>
                </div>
                <span className="font-semibold text-slate-700">{apt.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
