'use client'

import { useState } from 'react'
import { Mail, Plus, Send, Clock, CheckCircle } from 'lucide-react'

export default function EmailPage() {
  const [campaigns] = useState([
    { id: '1', name: 'Newsletter Janvier', subject: 'Nouveautés du mois', status: 'SENT', sentAt: '2025-01-10', recipients: 1250 },
    { id: '2', name: 'Promotion Hiver', subject: '-30% sur tous nos produits', status: 'SCHEDULED', scheduledAt: '2025-01-20', recipients: 2500 },
    { id: '3', name: 'Onboarding nouveaux clients', subject: 'Bienvenue chez WorkHub', status: 'DRAFT', recipients: 0 },
  ])

  const statusIcons = {
    DRAFT: Clock,
    SCHEDULED: Clock,
    SENT: CheckCircle,
  }

  const statusColors = {
    DRAFT: 'bg-gray-100 text-gray-700',
    SCHEDULED: 'bg-blue-100 text-blue-700',
    SENT: 'bg-green-100 text-green-700',
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Email Marketing</h1>
          <p className="text-gray-600 mt-2">Créez et gérez vos campagnes email</p>
        </div>
        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Nouvelle campagne
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total envoyés</span>
            <Send className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">12.5k</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Taux d'ouverture</span>
            <Mail className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">32.5%</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Taux de clic</span>
            <CheckCircle className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">8.2%</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Campagnes</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {campaigns.map((campaign) => {
            const StatusIcon = statusIcons[campaign.status as keyof typeof statusIcons]
            return (
              <div key={campaign.id} className="p-6 hover:bg-gray-50 transition cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{campaign.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{campaign.subject}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{campaign.recipients} destinataires</span>
                      {campaign.sentAt && <span>Envoyé le {campaign.sentAt}</span>}
                      {campaign.scheduledAt && <span>Programmé pour le {campaign.scheduledAt}</span>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center ${statusColors[campaign.status as keyof typeof statusColors]}`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {campaign.status}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
