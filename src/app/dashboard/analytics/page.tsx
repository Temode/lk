'use client'

import { TrendingUp, Users, Activity, DollarSign } from 'lucide-react'

export default function AnalyticsPage() {
  const metrics = [
    { name: 'Utilisateurs actifs', value: '2,543', change: '+12.5%', icon: Users, color: 'text-blue-600' },
    { name: 'Taux de conversion', value: '3.2%', change: '+0.8%', icon: TrendingUp, color: 'text-green-600' },
    { name: 'Revenus', value: '€12,450', change: '+23.1%', icon: DollarSign, color: 'text-purple-600' },
    { name: 'Engagement', value: '78%', change: '+5.2%', icon: Activity, color: 'text-pink-600' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-2">Analysez vos performances en détail</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => (
          <div key={metric.name} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">{metric.name}</span>
              <metric.icon className={`w-5 h-5 ${metric.color}`} />
            </div>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
              <span className="text-sm font-semibold text-green-600">{metric.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Utilisateurs par mois</h2>
          <div className="h-64 flex items-end justify-between space-x-2">
            {[65, 78, 82, 90, 85, 95, 88, 92, 98, 105, 110, 120].map((height, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-purple-600 to-pink-600 rounded-t" style={{ height: `${height}%` }} />
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm text-gray-600">
            <span>Jan</span>
            <span>Fév</span>
            <span>Mar</span>
            <span>Avr</span>
            <span>Mai</span>
            <span>Juin</span>
            <span>Juil</span>
            <span>Août</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Déc</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Répartition des sources</h2>
          <div className="space-y-4">
            {[
              { name: 'Recherche organique', value: 45, color: 'bg-purple-600' },
              { name: 'Réseaux sociaux', value: 25, color: 'bg-pink-600' },
              { name: 'Direct', value: 20, color: 'bg-blue-600' },
              { name: 'Référents', value: 10, color: 'bg-green-600' },
            ].map((source) => (
              <div key={source.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-900 font-medium">{source.name}</span>
                  <span className="text-gray-600">{source.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`${source.color} h-2 rounded-full`} style={{ width: `${source.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
