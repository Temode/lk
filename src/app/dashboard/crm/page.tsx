'use client'

import { useState } from 'react'
import { Users, Plus, Search, Mail, Phone } from 'lucide-react'

export default function CRMPage() {
  const [contacts] = useState([
    { id: '1', name: 'Jean Dupont', email: 'jean@example.com', phone: '+33 6 12 34 56 78', company: 'Acme Corp', status: 'CUSTOMER' },
    { id: '2', name: 'Marie Martin', email: 'marie@example.com', phone: '+33 6 98 76 54 32', company: 'TechStart', status: 'LEAD' },
    { id: '3', name: 'Pierre Durand', email: 'pierre@example.com', phone: '+33 6 11 22 33 44', company: 'Innovation SAS', status: 'PROSPECT' },
  ])

  const statusColors = {
    LEAD: 'bg-yellow-100 text-yellow-700',
    PROSPECT: 'bg-blue-100 text-blue-700',
    CUSTOMER: 'bg-green-100 text-green-700',
    LOST: 'bg-gray-100 text-gray-700',
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">CRM</h1>
          <p className="text-gray-600 mt-2">Gérez vos contacts et vos relations clients</p>
        </div>
        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Nouveau contact
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un contact..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Nom</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Téléphone</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Entreprise</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {contacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50 transition cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="ml-3 font-medium text-gray-900">{contact.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {contact.email}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {contact.phone}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-900">{contact.company}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[contact.status as keyof typeof statusColors]}`}>
                    {contact.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
