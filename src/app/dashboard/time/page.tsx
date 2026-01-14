'use client'

import { useState } from 'react'
import { Clock, Play, Square, Calendar } from 'lucide-react'

export default function TimePage() {
  const [isTracking, setIsTracking] = useState(false)
  const [timeEntries] = useState([
    { id: '1', description: 'Développement frontend', duration: 120, date: '2025-01-14', project: 'WorkHub' },
    { id: '2', description: 'Réunion client', duration: 60, date: '2025-01-14', project: 'Client A' },
    { id: '3', description: 'Code review', duration: 45, date: '2025-01-13', project: 'WorkHub' },
    { id: '4', description: 'Documentation', duration: 90, date: '2025-01-13', project: 'WorkHub' },
  ])

  const totalHours = timeEntries.reduce((acc, entry) => acc + entry.duration, 0) / 60

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Suivi du temps</h1>
        <p className="text-gray-600 mt-2">Suivez le temps passé sur vos projets</p>
      </div>

      {/* Timer Card */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg p-8 mb-8 text-white">
        <div className="text-center mb-6">
          <div className="text-6xl font-bold mb-4">00:00:00</div>
          <input
            type="text"
            placeholder="Que faites-vous ?"
            className="w-full max-w-md mx-auto px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white"
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => setIsTracking(!isTracking)}
            className={`flex items-center px-8 py-4 rounded-lg font-semibold transition ${
              isTracking
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-white text-purple-600 hover:bg-gray-100'
            }`}
          >
            {isTracking ? (
              <>
                <Square className="w-5 h-5 mr-2" />
                Arrêter
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Démarrer
              </>
            )}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Aujourd'hui</span>
            <Clock className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">3h 00m</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Cette semaine</span>
            <Calendar className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">24h 15m</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total</span>
            <Clock className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalHours.toFixed(1)}h</p>
        </div>
      </div>

      {/* Time Entries */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Historique</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {timeEntries.map((entry) => (
            <div key={entry.id} className="p-6 hover:bg-gray-50 transition">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{entry.description}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{entry.project}</span>
                    <span>{entry.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.floor(entry.duration / 60)}h {entry.duration % 60}m
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
