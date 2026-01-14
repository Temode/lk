'use client'

import { useState } from 'react'
import { Zap, Plus, Toggle } from 'lucide-react'

export default function AutomationPage() {
  const [automations] = useState([
    { id: '1', name: 'Email de bienvenue', trigger: 'Nouveau contact', action: 'Envoyer email', isActive: true },
    { id: '2', name: 'Notification tâche urgente', trigger: 'Tâche priorité haute', action: 'Notification', isActive: true },
    { id: '3', name: 'Rapport hebdomadaire', trigger: 'Tous les lundis', action: 'Générer rapport', isActive: false },
    { id: '4', name: 'Relance client', trigger: 'Pas de réponse 7j', action: 'Envoyer email', isActive: true },
  ])

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Automatisation</h1>
          <p className="text-gray-600 mt-2">Créez des workflows automatisés</p>
        </div>
        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Nouvelle automation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total</span>
            <Zap className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{automations.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Actives</span>
            <Zap className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {automations.filter(a => a.isActive).length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Exécutions ce mois</span>
            <Zap className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">1,248</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Automations</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {automations.map((automation) => (
            <div key={automation.id} className="p-6 hover:bg-gray-50 transition">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="font-semibold text-gray-900">{automation.name}</h3>
                    <span className={`ml-3 px-2 py-1 text-xs font-semibold rounded-full ${
                      automation.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {automation.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <span className="font-medium mr-1">Déclencheur:</span>
                      {automation.trigger}
                    </span>
                    <span className="flex items-center">
                      <span className="font-medium mr-1">Action:</span>
                      {automation.action}
                    </span>
                  </div>
                </div>
                <button className="ml-4">
                  <Toggle className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
