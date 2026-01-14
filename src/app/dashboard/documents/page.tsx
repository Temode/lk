'use client'

import { useState } from 'react'
import { FileText, Plus, Search } from 'lucide-react'

export default function DocumentsPage() {
  const [documents] = useState([
    { id: '1', title: 'Proposition de projet', updatedAt: '2025-01-14', type: 'DOCUMENT' },
    { id: '2', title: 'Rapport mensuel', updatedAt: '2025-01-13', type: 'REPORT' },
    { id: '3', title: 'Présentation client', updatedAt: '2025-01-12', type: 'PRESENTATION' },
    { id: '4', title: 'Notes de réunion', updatedAt: '2025-01-11', type: 'DOCUMENT' },
  ])

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600 mt-2">Créez et gérez vos documents collaboratifs</p>
        </div>
        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Nouveau document
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un document..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition cursor-pointer">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                <p className="text-sm text-gray-600">Modifié le {doc.updatedAt}</p>
              </div>
            </div>
            <span className="px-3 py-1 text-xs font-semibold text-purple-600 bg-purple-100 rounded-full">
              {doc.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
