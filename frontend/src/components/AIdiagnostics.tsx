'use client'

import React, { useState } from 'react'
import { Upload, Download, Share2, Settings, ChevronRight, AlertCircle } from 'lucide-react'

interface SegmentationData {
  tooth: number
  status: 'healthy' | 'caries' | 'loss'
  notes?: string
}

export default function AIdiagnostics() {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null)
  const [segmentationData] = useState<Record<number, SegmentationData>>({
    13: { tooth: 13, status: 'caries' },
    14: { tooth: 14, status: 'healthy' },
    15: { tooth: 15, status: 'loss' },
    16: { tooth: 16, status: 'healthy' },
    17: { tooth: 17, status: 'caries' },
    18: { tooth: 18, status: 'loss' },
    23: { tooth: 23, status: 'healthy' },
    24: { tooth: 24, status: 'caries' },
    25: { tooth: 25, status: 'healthy' },
    26: { tooth: 26, status: 'loss' },
  })

  const getToothColor = (tooth: number): string => {
    const data = segmentationData[tooth]
    if (!data) return 'bg-slate-200'
    switch (data.status) {
      case 'healthy':
        return 'bg-emerald-500'
      case 'caries':
        return 'bg-blue-500'
      case 'loss':
        return 'bg-amber-500'
      default:
        return 'bg-slate-200'
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file.name)
    }
  }

  const toothGrid = Array.from({ length: 28 }, (_, i) => i + 1)
    .filter(i => ![9, 19].includes(i))
    .map(i => (i <= 8 ? i : i === 18 ? 28 : i - 1))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">AI Radiograph Diagnostics Suite</h1>
        <p className="text-slate-600">
          Powered by Vermenji Second Dentist and Diaphanocat APIs (FDA Cleared for 2D/3D CBCT scans).
        </p>
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-500">
            Diagnostic target: <span className="font-semibold text-cyan-600">Emma Richardson</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left: Upload Area */}
        <div className="medical-card p-8 flex flex-col items-center justify-center min-h-80 border-2 border-dashed border-slate-200 hover:border-blue-300 cursor-pointer transition-colors">
          <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer" htmlFor="file-upload">
            {uploadedFile ? (
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Download className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{uploadedFile}</p>
                  <p className="text-xs text-slate-500 mt-1">Scan processed successfully</p>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setUploadedFile(null)
                  }}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Change file
                </button>
              </div>
            ) : (
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                  <Upload className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Click to Select Sample Panoramic X-Ray Scan</p>
                  <p className="text-xs text-slate-500 mt-1">DICOM, TIFF, or JPG (Max 50MB)</p>
                </div>
              </div>
            )}
            <input
              id="file-upload"
              type="file"
              accept=".dcm,.tiff,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Right: Segmentation Chart */}
        <div className="medical-card p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-4">ANATOMICAL SEGMENTATION CHART</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-emerald-500"></div>
                <span className="text-sm font-medium text-slate-700">Healthy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-blue-500"></div>
                <span className="text-sm font-medium text-slate-700">Caries (Decay)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-amber-500"></div>
                <span className="text-sm font-medium text-slate-700">Bone Loss / Abscess</span>
              </div>
            </div>
          </div>

          {/* Tooth Grid */}
          <div className="grid grid-cols-9 gap-2">
            {Array.from({ length: 28 }, (_, i) => {
              const tooth = i < 14 ? i + 11 : i + 3
              return (
                <button
                  key={tooth}
                  onClick={() => setSelectedTooth(tooth)}
                  className={`aspect-square rounded-lg font-semibold text-sm transition-all ${getToothColor(tooth)} text-white hover:scale-110 ${
                    selectedTooth === tooth ? 'ring-2 ring-offset-2 ring-slate-900 scale-110' : ''
                  }`}
                >
                  {tooth}
                </button>
              )
            })}
          </div>

          {/* Clinical Notes */}
          <div className="pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500 text-center">
              Click any tooth on the map above to inspect clinical pathology data and draft treatment quotes.
            </p>
            {selectedTooth && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-slate-900">Tooth {selectedTooth}</p>
                <p className="text-xs text-slate-600 mt-1">
                  {segmentationData[selectedTooth]?.notes || 'Analysis complete. No immediate concerns detected.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        <button className="medical-button-secondary flex items-center gap-2">
          <Share2 size={16} />
          Export Report
        </button>
        <button className="medical-button-primary flex items-center gap-2">
          <Settings size={16} />
          Generate Treatment Plan
        </button>
      </div>
    </div>
  )
}
