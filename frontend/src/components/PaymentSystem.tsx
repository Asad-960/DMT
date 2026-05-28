'use client'

import React, { useState } from 'react'
import { CreditCard, Send, DollarSign, CheckCircle, Clock, AlertCircle, Plus, FileText } from 'lucide-react'

interface Payment {
  id: string
  patientName: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed'
  date: string
  method: string
  treatment: string
}

interface Invoice {
  id: string
  invoiceNumber: string
  patientName: string
  amount: number
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  dueDate: string
  issueDate: string
}

const PaymentSystem = () => {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      patientName: 'John Smith',
      amount: 1200,
      currency: 'USD',
      status: 'completed',
      date: '2024-05-25',
      method: 'Credit Card',
      treatment: 'Crown Replacement',
    },
    {
      id: '2',
      patientName: 'Sarah Johnson',
      amount: 400,
      currency: 'USD',
      status: 'pending',
      date: '2024-05-26',
      method: 'Bank Transfer',
      treatment: 'Implant Surgery (1st installment)',
    },
    {
      id: '3',
      patientName: 'Ayşe Kaya',
      amount: 850,
      currency: 'TRY',
      status: 'completed',
      date: '2024-05-24',
      method: 'Mobile Payment',
      treatment: 'Root Canal Treatment',
    },
  ])

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      invoiceNumber: 'INV-2024-001234',
      patientName: 'John Smith',
      amount: 1200,
      status: 'paid',
      dueDate: '2024-06-25',
      issueDate: '2024-05-25',
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-001235',
      patientName: 'Sarah Johnson',
      amount: 1200,
      status: 'sent',
      dueDate: '2024-06-10',
      issueDate: '2024-05-26',
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-001236',
      patientName: 'Michel Dupont',
      amount: 950,
      status: 'overdue',
      dueDate: '2024-05-20',
      issueDate: '2024-04-20',
    },
  ])

  const [showPaymentForm, setShowPaymentForm] = useState(false)

  const statusColors = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800',
  }

  const invoiceStatusColors = {
    draft: 'bg-slate-100 text-slate-800',
    sent: 'bg-blue-100 text-blue-800',
    paid: 'bg-green-100 text-green-800',
    overdue: 'bg-red-100 text-red-800',
  }

  const invoiceStatusIcons = {
    draft: FileText,
    sent: Send,
    paid: CheckCircle,
    overdue: AlertCircle,
  }

  const paymentStatusIcons = {
    completed: CheckCircle,
    pending: Clock,
    failed: AlertCircle,
  }

  const totalRevenue = payments
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0)

  const pendingAmount = payments
    .filter((p) => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0)

  const overDueAmount = invoices
    .filter((i) => i.status === 'overdue')
    .reduce((sum, i) => sum + i.amount, 0)

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Payment Management</h1>
          <p className="text-slate-600 mt-1">Track payments, invoices, and financial reports</p>
        </div>
        <button
          onClick={() => setShowPaymentForm(!showPaymentForm)}
          className="medical-button-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Process Payment</span>
        </button>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-responsive">
        {[
          {
            icon: DollarSign,
            label: 'Total Revenue',
            value: `$${totalRevenue.toLocaleString()}`,
            color: 'bg-green-500',
            subtext: 'From completed payments',
          },
          {
            icon: Clock,
            label: 'Pending Payments',
            value: `$${pendingAmount.toLocaleString()}`,
            color: 'bg-yellow-500',
            subtext: 'Awaiting confirmation',
          },
          {
            icon: AlertCircle,
            label: 'Overdue Invoices',
            value: `$${overDueAmount.toLocaleString()}`,
            color: 'bg-red-500',
            subtext: `${invoices.filter((i) => i.status === 'overdue').length} invoices`,
          },
          {
            icon: CheckCircle,
            label: 'Monthly Avg',
            value: '$18,500',
            color: 'bg-blue-500',
            subtext: 'Average monthly revenue',
          },
        ].map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div key={idx} className="medical-card p-6 animate-slideInLeft" style={{ animationDelay: `${idx * 50}ms` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
                  <p className="text-xs text-slate-500 mt-2">{stat.subtext}</p>
                </div>
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <Icon size={28} className="text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Process Payment Form */}
      {showPaymentForm && (
        <div className="medical-card p-6 animate-slideInLeft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Process Payment</h3>
            <button onClick={() => setShowPaymentForm(false)}>
              <span className="text-slate-400 hover:text-slate-600">✕</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="medical-label">Patient</label>
              <select className="medical-input">
                <option>Select Patient</option>
                <option>John Smith</option>
                <option>Sarah Johnson</option>
                <option>Ayşe Kaya</option>
              </select>
            </div>
            <div>
              <label className="medical-label">Amount</label>
              <input type="number" className="medical-input" placeholder="1200" />
            </div>
            <div>
              <label className="medical-label">Currency</label>
              <select className="medical-input">
                <option>USD</option>
                <option>EUR</option>
                <option>TRY</option>
                <option>GBP</option>
              </select>
            </div>
            <div>
              <label className="medical-label">Payment Method</label>
              <select className="medical-input">
                <option>Credit Card</option>
                <option>Bank Transfer</option>
                <option>Mobile Payment</option>
                <option>Cash</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="medical-label">Treatment/Description</label>
              <input type="text" className="medical-input" placeholder="Crown replacement for tooth 16" />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button className="medical-button-primary">Process Payment</button>
            <button onClick={() => setShowPaymentForm(false)} className="medical-button-secondary">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Payments Table */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Payments</h2>
        <div className="medical-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Treatment</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Method</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, idx) => {
                  const StatusIcon = paymentStatusIcons[payment.status]
                  return (
                    <tr key={payment.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-6 py-4 font-medium text-slate-900">{payment.patientName}</td>
                      <td className="px-6 py-4 text-slate-600">{payment.treatment}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">
                        {payment.currency} {payment.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-slate-600">{payment.method}</td>
                      <td className="px-6 py-4 text-slate-600">{payment.date}</td>
                      <td className="px-6 py-4">
                        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold w-fit ${statusColors[payment.status]}`}>
                          <StatusIcon size={14} />
                          <span>{payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Invoices */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Invoices</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {invoices.map((invoice) => {
            const StatusIcon = invoiceStatusIcons[invoice.status]
            return (
              <div key={invoice.id} className="medical-card p-5 hover:shadow-medical-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-mono text-sm font-semibold text-slate-600">{invoice.invoiceNumber}</p>
                    <p className="font-bold text-slate-900 mt-1">{invoice.patientName}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${invoiceStatusColors[invoice.status]}`}>
                    <StatusIcon size={20} />
                  </div>
                </div>

                <div className="space-y-3 mb-4 pb-4 border-b border-slate-200">
                  <div>
                    <p className="text-xs text-slate-500">Amount</p>
                    <p className="font-bold text-lg text-slate-900">${invoice.amount.toLocaleString()}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-slate-500">Issue Date</p>
                      <p className="font-semibold text-slate-700">{invoice.issueDate}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Due Date</p>
                      <p className="font-semibold text-slate-700">{invoice.dueDate}</p>
                    </div>
                  </div>
                </div>

                <button className="w-full px-4 py-2 bg-blue-100 text-cyan-700 font-medium rounded-lg hover:bg-cyan-200 transition-all duration-200">
                  View Invoice
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PaymentSystem
