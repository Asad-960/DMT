'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="w-full overflow-hidden bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-blue-900 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-lg text-blue-600">
                D
              </div>
              <span className="text-white font-bold text-xl">DMT</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#products" className="text-gray-100 hover:text-white transition">Products</a>
              <a href="#solutions" className="text-gray-100 hover:text-white transition">Solutions</a>
              <a href="#resources" className="text-gray-100 hover:text-white transition">Resources</a>
              <a href="#pricing" className="text-gray-100 hover:text-white transition">Pricing</a>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-gray-100 hover:text-white px-4 py-2 transition">Login</button>
              <Link href="/admin-98cb" className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <a href="#products" className="block text-gray-100 hover:text-white py-2">Products</a>
              <a href="#solutions" className="block text-gray-100 hover:text-white py-2">Solutions</a>
              <a href="#resources" className="block text-gray-100 hover:text-white py-2">Resources</a>
              <a href="#pricing" className="block text-gray-100 hover:text-white py-2">Pricing</a>
              <div className="flex space-x-2 pt-4">
                <button className="flex-1 text-gray-100 hover:text-white px-4 py-2 transition">Login</button>
                <Link href="/admin-98cb" className="flex-1 bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg font-semibold text-center hover:bg-yellow-300 transition">
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full pt-20 pb-20 overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700">
        {/* Parallax Background Elements */}
        <div
          className="absolute top-0 right-0 w-96 h-96 opacity-10"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M10 10 Q 25 25 40 10 T 70 10\' stroke=\'white\' fill=\'none\' stroke-width=\'2\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat'
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 opacity-10"
          style={{
            transform: `translateY(${scrollY * -0.3}px)`,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'30\' stroke=\'white\' fill=\'none\' stroke-width=\'2\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div
              style={{
                transform: `translateY(${scrollY * 0.3}px)`,
              }}
              className="text-white"
            >
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Get More Done with DMT
              </h1>
              <p className="text-xl text-gray-100 mb-8 leading-relaxed">
                AI-powered CRM software that enables your team to collaborate, manage patients, and streamline your dental practice with ease.
              </p>
              <button className="bg-blue-400 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-300 transition flex items-center space-x-2">
                <span>Try DMT Free</span>
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Right Illustration */}
            <div
              style={{
                transform: `translateY(${scrollY * -0.2}px)`,
              }}
              className="relative h-96 hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-blue-500 rounded-3xl opacity-30 blur-3xl" />
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📊</div>
                    <p className="text-blue-900 font-semibold">Dashboard Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="flex justify-center mt-16"
          style={{
            opacity: Math.max(0, 1 - scrollY / 300),
          }}
        >
          <ChevronDown className="text-white animate-bounce" size={32} />
        </div>
      </section>

      {/* Project Management Section */}
      <section id="solutions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Illustration */}
            <div
              style={{
                transform: `translateY(${Math.max(0, scrollY - 400) * 0.2}px)`,
              }}
              className="relative h-80"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200 rounded-3xl opacity-30 blur-3xl" />
              <div className="relative z-10 h-full bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">👥</div>
                  <p className="text-blue-900 font-semibold">Team Collaboration</p>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div
              style={{
                transform: `translateY(${Math.max(0, scrollY - 400) * -0.2}px)`,
              }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Patient Management</h2>
              <p className="text-xl text-gray-600 mb-6">
                Manage patient records, track treatment plans, and organize medical histories in one centralized system. Store case photos, treatment documentation, and patient communication for seamless coordination across your dental team.
              </p>
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Work Together Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div
              style={{
                transform: `translateY(${Math.max(0, scrollY - 800) * 0.2}px)`,
              }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Work Together</h2>
              <p className="text-xl text-gray-600 mb-8">
                Enable seamless team collaboration with real-time updates and shared patient information. Coordinate appointments, treatment plans, and international patient logistics across your entire dental practice network.
              </p>
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition">
                Try It Now
              </button>
            </div>

            {/* Right Circle Diagram */}
            <div
              style={{
                transform: `translateY(${Math.max(0, scrollY - 800) * -0.2}px)`,
              }}
              className="relative h-96 flex items-center justify-center"
            >
              <svg className="w-full h-full max-w-sm" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                {/* Dashed circle */}
                <circle cx="150" cy="150" r="100" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5,5" />

                {/* Center icon */}
                <circle cx="150" cy="150" r="35" fill="#3b82f6" opacity="0.1" />
                <circle cx="150" cy="150" r="25" fill="#3b82f6" />
                <text x="150" y="160" textAnchor="middle" fill="white" fontSize="20">📁</text>

                {/* Surrounding avatars */}
                {[
                  { angle: 0, emoji: '👨‍💼' },
                  { angle: 45, emoji: '👩‍💼' },
                  { angle: 90, emoji: '👨‍⚕️' },
                  { angle: 135, emoji: '👩‍⚕️' },
                  { angle: 180, emoji: '👨‍💻' },
                  { angle: 225, emoji: '👩‍💻' },
                  { angle: 270, emoji: '🧑‍🔬' },
                  { angle: 315, emoji: '👩‍🔬' },
                ].map((item, i) => {
                  const rad = (item.angle * Math.PI) / 180
                  const x = 150 + 100 * Math.cos(rad)
                  const y = 150 + 100 * Math.sin(rad)
                  return (
                    <g key={i}>
                      <circle cx={x} cy={y} r="22" fill={['#fbbf24', '#60a5fa', '#4f46e5', '#10b981', '#f87171', '#8b5cf6', '#ec4899', '#06b6d4'][i]} />
                      <text x={x} y={y + 8} textAnchor="middle" fontSize="16">{item.emoji}</text>
                    </g>
                  )
                })}
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold mb-6">Ready to transform your dental practice?</h2>
          <p className="text-xl text-blue-100 mb-8">Start managing your patients and appointments with DMT today.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/admin-98cb" className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition inline-block">
              Start Free Trial
            </Link>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-900 transition">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-bold text-blue-600">D</div>
                <span className="text-white font-bold">DMT</span>
              </div>
              <p className="text-sm">AI-powered CRM for dental practices</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 DMT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
