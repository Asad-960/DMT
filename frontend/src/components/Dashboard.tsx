'use client'

import React, { useState } from 'react'
import { Bell, Users, Calendar, DollarSign, TrendingUp, CheckCircle, ChevronRight, ArrowUp, ArrowDown, Plus, Filter } from 'lucide-react'
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
  <div className="medical-card p-6 animate-slideInUp hover:shadow-lg transition-all duration-300" style={{ animationFillMode: 'both' }}>
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-slate-500 text-sm font-medium">{label}</p>
        <p className="text-4xl font-bold text-slate-900 mt-2 tracking-tight">{value}</p>
        {trend && (
          <div className={`flex items-center space-x-1 mt-2 font-semibold text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            <span>{Math.abs(trend)}% from last month</span>
          </div>
        )}
      </div>
      <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${color} shadow-lg`}>
        <Icon size={32} className="text-white" />
      </div>
    </div>
  </div>
)

const TeamMemberCard = ({ name, role, level, avatar, idx }: any) => (
  <div
    className="medical-card p-4 text-center card-hover animate-slideInUp"
    style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'both' }}
  >
    <div className="w-20 h-20 rounded-full mx-auto mb-3 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-3xl shadow-md">
      {avatar}
    </div>
    <h4 className="font-semibold text-slate-900 text-sm">{name}</h4>
    <p className="text-slate-600 text-xs mt-1">{role}</p>
    <div className="mt-3 inline-block px-2 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600">
      {level}
    </div>
  </div>
)

const EventItem = ({ title, time, color, idx, type }: any) => (
  <div
    className="flex items-center space-x-3 p-4 rounded-lg border border-slate-100 hover:bg-slate-50 transition-all duration-200 animate-slideInUp"
    style={{ animationDelay: `${idx * 80}ms`, animationFillMode: 'both' }}
  >
    <div className={`w-1 h-8 rounded-full ${color}`}></div>
    <div className="flex-1">
      <p className="font-semibold text-slate-900 text-sm">{title}</p>
      <p className="text-xs text-slate-500 mt-0.5">{time}</p>
    </div>
    {type && (
      <span className={`text-lg`}>{type}</span>
    )}
  </div>
)

const ProjectCard = ({ name, code, date, priority, stats, idx }: any) => {
  const priorityColor = {
    'Medium': 'text-amber-500',
    'High': 'text-orange-500',
    'Low': 'text-green-500',
  }

  const priorityBg = {
    'Medium': 'bg-amber-50',
    'High': 'bg-orange-50',
    'Low': 'bg-green-50',
  }

  return (
    <div
      className="medical-card p-6 card-hover animate-slideInUp"
      style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-slate-500 text-xs font-semibold">{code}</p>
          <h4 className="font-bold text-slate-900 mt-1">{name}</h4>
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${priorityBg[priority as keyof typeof priorityBg]} ${priorityColor[priority as keyof typeof priorityColor]}`}>
          {priority}
        </span>
      </div>

      <p className="text-slate-500 text-xs mb-4">Created {date}</p>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-xs font-medium text-slate-600">
          <span>All tasks</span>
          <span>{stats.all}</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div className="bg-blue-500 h-full rounded-full" style={{ width: `${(stats.active / stats.all) * 100}%` }}></div>
        </div>
        <div className="flex justify-between text-xs font-medium text-slate-600">
          <span>Active tasks</span>
          <span>{stats.active}</span>
        </div>
      </div>

      <div className="flex -space-x-2">
        {stats.assignees?.map((avatar: string, i: number) => (
          <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-xs text-white font-bold border-2 border-white">
            {avatar}
          </div>
        ))}
        {stats.more && (
          <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs text-slate-600 font-bold border-2 border-white">
            +{stats.more}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const stats = [
    { icon: Users, label: 'Total Patients', value: '1,245', trend: 12, color: 'bg-gradient-to-br from-blue-500 to-blue-600' },
    { icon: Calendar, label: 'Active Cases', value: '34', trend: 5, color: 'bg-gradient-to-br from-green-500 to-green-600' },
    { icon: CheckCircle, label: 'Completed', value: '892', trend: 8, color: 'bg-gradient-to-br from-purple-500 to-purple-600' },
    { icon: TrendingUp, label: 'This Month Revenue', value: '$58.5K', trend: 15, color: 'bg-gradient-to-br from-blue-500 to-blue-600' },
  ]

  const teamMembers = [
    { name: 'Dr. Mehmet Ö.', role: 'Lead Dentist', level: 'Senior', avatar: '👨‍⚕️', idx: 0 },
    { name: 'Dr. Ayşe K.', role: 'Dentist', level: 'Senior', avatar: '👩‍⚕️', idx: 1 },
    { name: 'Dr. Fatih Y.', role: 'Prosthodontist', level: 'Senior', avatar: '👨‍⚕️', idx: 2 },
    { name: 'Dr. Zeynep Ç.', role: 'Oral Surgeon', level: 'Senior', avatar: '👩‍⚕️', idx: 3 },
    { name: 'Nurse Leyla', role: 'Dental Assistant', level: 'Middle', avatar: '👩‍⚕️', idx: 4 },
    { name: 'Nurse Ahmet', role: 'Dental Assistant', level: 'Middle', avatar: '👨‍⚕️', idx: 5 },
    { name: 'Admin Cem', role: 'Administrative', level: 'Junior', avatar: '👨‍💼', idx: 6 },
    { name: 'Admin Selin', role: 'Administrative', level: 'Junior', avatar: '👩‍💼', idx: 7 },
  ]

  const events = [
    { title: 'Medical Conference - Istanbul', time: 'Today | 5:00 PM', color: 'bg-yellow-400', idx: 0, type: '📈' },
    { title: 'Team Meeting - Q3 Review', time: 'Today | 6:00 PM', color: 'bg-blue-400', idx: 1, type: '👥' },
    { title: 'Patient Follow-up Schedule', time: 'Tomorrow | 2:00 PM', color: 'bg-green-400', idx: 2, type: '⏰' },
  ]

  const projects = [
    {
      name: 'International Implant Program',
      code: 'PN0001265',
      date: 'Sep 12, 2020',
      priority: 'High',
      stats: { all: 34, active: 13, assignees: ['👨‍⚕️', '👩‍⚕️', '👨‍⚕️'], more: 2 },
      idx: 0
    },
    {
      name: 'Cosmetic Smile Makeover',
      code: 'PN0001221',
      date: 'Sep 10, 2020',
      priority: 'Medium',
      stats: { all: 50, active: 24, assignees: ['👨‍⚕️', '👩‍⚕️', '👨‍⚕️'] },
      idx: 1
    },
    {
      name: 'Root Canal Specialization',
      code: 'PN0001290',
      date: 'May 28, 2020',
      priority: 'Medium',
      stats: { all: 23, active: 20, assignees: ['👨‍⚕️', '👩‍⚕️'] },
      idx: 2
    },
  ]

  const activityStream = [
    { user: 'Dr. Mehmet Ö.', role: 'Lead Dentist', action: 'Started treatment plan for international patient John Smith', avatar: '👨‍⚕️', idx: 0 },
    { user: '', role: '', action: 'Uploaded before/after treatment photos', avatar: '📸', idx: 1 },
    { user: 'Admin Selin', role: 'Administrative', action: 'Confirmed appointment for Sarah Johnson - Implant Surgery', avatar: '👩‍💼', idx: 2 },
  ]

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'International Patients',
        data: [45, 52, 48, 61, 55, 67],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointHoverRadius: 7,
        pointBorderColor: 'white',
        pointBorderWidth: 2,
      },
      {
        label: 'Local Patients',
        data: [30, 35, 32, 40, 45, 42],
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: 'rgb(139, 92, 246)',
        pointHoverRadius: 7,
        pointBorderColor: 'white',
        pointBorderWidth: 2,
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
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(6, 182, 212, 0.8)',
        ],
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  }

  const doughnutData = {
    labels: ['International', 'Local', 'Referral'],
    datasets: [
      {
        data: [45, 35, 20],
        backgroundColor: ['rgba(59, 130, 246, 0.8)', 'rgba(139, 92, 246, 0.8)', 'rgba(34, 197, 94, 0.8)'],
        borderColor: ['rgb(59, 130, 246)', 'rgb(139, 92, 246)', 'rgb(34, 197, 94)'],
        borderWidth: 2,
      },
    ],
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Key Stats */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">Dashboard</h2>
        <div className="grid grid-cols-responsive">
          {stats.map((stat, idx) => (
            <div key={idx} style={{ animationDelay: `${idx * 50}ms` }}>
              <StatCard {...stat} />
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Workload + Nearest Events + Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Workload Section - 2 columns */}
        <div className="lg:col-span-2 medical-card p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-slate-900">Workload</h3>
            <a href="#" className="text-blue-600 text-sm font-semibold hover:text-blue-700 flex items-center space-x-1">
              <span>View all</span>
              <ChevronRight size={16} />
            </a>
          </div>
          <div className="grid grid-cols-workload">
            {teamMembers.map((member, idx) => (
              <TeamMemberCard key={idx} {...member} />
            ))}
          </div>
        </div>

        {/* Right Column: Nearest Events + Activity Stream */}
        <div className="lg:col-span-2 space-y-6">
          {/* Nearest Events */}
          <div className="medical-card p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Nearest Events</h3>
              <a href="#" className="text-blue-600 text-sm font-semibold hover:text-blue-700 flex items-center space-x-1">
                <span>View all</span>
                <ChevronRight size={16} />
              </a>
            </div>
            <div className="space-y-3">
              {events.map((event) => (
                <EventItem key={event.idx} {...event} />
              ))}
            </div>
          </div>

          {/* Activity Stream */}
          <div className="medical-card p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Activity Stream</h3>
              <a href="#" className="text-blue-600 text-sm font-semibold hover:text-blue-700">
                <span>View more</span>
              </a>
            </div>
            <div className="space-y-4">
              {activityStream.map((activity, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-3 pb-4 border-b border-slate-100 last:border-b-0 animate-slideInUp"
                  style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-lg flex-shrink-0">
                    {activity.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    {activity.user && (
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{activity.user}</p>
                        <p className="text-slate-500 text-xs">{activity.role}</p>
                      </div>
                    )}
                    <p className="text-slate-600 text-sm mt-1">{activity.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="medical-card p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-slate-900">Projects</h3>
          <a href="#" className="text-blue-600 text-sm font-semibold hover:text-blue-700 flex items-center space-x-1">
            <span>View all</span>
            <ChevronRight size={16} />
          </a>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.idx} {...project} />
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Trends */}
        <div className="medical-card p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Patient Acquisition Trends</h3>
          <div className="h-80">
            <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' as const } } }} />
          </div>
        </div>

        {/* Treatment Distribution */}
        <div className="medical-card p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Treatment Distribution</h3>
          <div className="h-80">
            <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false, indexAxis: 'y' as const }} />
          </div>
        </div>
      </div>

      {/* Patient Source */}
      <div className="medical-card p-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Patient Source</h3>
        <div className="h-80 flex items-center justify-center">
          <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  )
}
