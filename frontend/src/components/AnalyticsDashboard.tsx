'use client'

import React from 'react'
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, Target } from 'lucide-react'
import { Line, Bar, Pie } from 'react-chartjs-2'
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

const AnalyticsDashboard = () => {
  const metrics = [
    {
      label: 'Patient Acquisition Cost',
      value: '$187.50',
      change: -12,
      icon: Target,
      color: 'bg-blue-500',
    },
    {
      label: 'Average Treatment Value',
      value: '$1,240',
      change: 8,
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      label: 'Patient Lifetime Value',
      value: '$4,850',
      change: 15,
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      label: 'No-show Rate',
      value: '3.2%',
      change: -5,
      icon: Activity,
      color: 'bg-red-500',
    },
  ]

  const revenueTrendData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
    datasets: [
      {
        label: 'Revenue (USD)',
        data: [12000, 14500, 13200, 16800, 15600, 18900, 21200],
        borderColor: 'rgb(0, 184, 217)',
        backgroundColor: 'rgba(0, 184, 217, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: 'rgb(0, 184, 217)',
      },
    ],
  }

  const treatmentTypeData = {
    labels: ['Crown', 'Implant', 'Cleaning', 'Root Canal', 'Bridge', 'Other'],
    datasets: [
      {
        label: 'Revenue by Treatment Type',
        data: [18500, 24600, 6200, 9800, 7400, 5200],
        backgroundColor: [
          'rgba(0, 184, 217, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderColor: [
          'rgb(0, 184, 217)',
          'rgb(59, 130, 246)',
          'rgb(34, 197, 94)',
          'rgb(168, 85, 247)',
          'rgb(236, 72, 153)',
          'rgb(245, 158, 11)',
        ],
        borderWidth: 2,
      },
    ],
  }

  const patientSourceData = {
    labels: ['Direct', 'Agency Referral', 'Paid Ads', 'Organic Search', 'Social Media'],
    datasets: [
      {
        data: [35, 30, 18, 12, 5],
        backgroundColor: [
          'rgba(0, 184, 217, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
      },
    ],
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Analytics & Business Intelligence</h1>
        <p className="text-slate-600 mt-1">Comprehensive insights into clinic performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-responsive">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon
          const isPositive = metric.change >= 0

          return (
            <div key={idx} className="medical-card p-6 animate-slideInLeft" style={{ animationDelay: `${idx * 50}ms` }}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">{metric.label}</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{metric.value}</p>
                  <div className={`flex items-center space-x-1 mt-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span className="text-sm font-semibold">{Math.abs(metric.change)}% from last period</span>
                  </div>
                </div>
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${metric.color}`}>
                  <Icon size={28} className="text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="medical-card p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Revenue Trend (Last 7 Days)</h3>
          <div className="h-80">
            <Line
              data={revenueTrendData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Treatment Revenue */}
        <div className="medical-card p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Revenue by Treatment Type</h3>
          <div className="h-80">
            <Bar
              data={treatmentTypeData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Source */}
        <div className="medical-card p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Patient Source Distribution</h3>
          <div className="h-80 flex items-center justify-center">
            <Pie
              data={patientSourceData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom' as const,
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Key Insights */}
        <div className="medical-card p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Key Business Insights</h3>
          <div className="space-y-4">
            {[
              {
                title: 'International Patient Growth',
                value: '+18% MoM',
                desc: 'Strong growth from UK and Germany markets',
                icon: '📈',
              },
              {
                title: 'Highest Revenue Treatment',
                value: 'Implants',
                desc: 'Generating 33% of total revenue',
                icon: '💎',
              },
              {
                title: 'Top Referral Source',
                value: 'Direct Bookings',
                desc: 'Website traffic conversion improved by 24%',
                icon: '🎯',
              },
              {
                title: 'Patient Satisfaction',
                value: '4.8/5.0',
                desc: 'Average rating across all reviews',
                icon: '⭐',
              },
            ].map((insight, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-cyan-300 transition-all duration-200">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{insight.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{insight.title}</p>
                    <p className="text-blue-600 font-bold text-lg">{insight.value}</p>
                    <p className="text-slate-600 text-sm mt-1">{insight.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Predictive Analytics */}
      <div className="medical-card p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Predictive Analytics & Forecasts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              label: 'Expected Revenue (Next Month)',
              value: '$65,200',
              accuracy: '94% confidence',
            },
            {
              label: 'Predicted New Patients',
              value: '38 patients',
              accuracy: '87% confidence',
            },
            {
              label: 'Cancellation Risk',
              value: '2 patients',
              accuracy: 'Early warning',
            },
          ].map((pred, idx) => (
            <div key={idx} className="p-4 bg-gradient-to-br from-slate-50 to-cyan-50 rounded-lg border border-slate-200">
              <p className="text-slate-600 text-sm font-medium">{pred.label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-2">{pred.value}</p>
              <p className="text-xs text-slate-500 mt-2">{pred.accuracy}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AnalyticsDashboard
