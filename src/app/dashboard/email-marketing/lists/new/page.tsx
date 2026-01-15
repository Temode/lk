'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ChevronLeft,
  Save,
  Users,
  Filter,
  Plus,
  X,
} from 'lucide-react'

export default function NewListPage() {
  const router = useRouter()
  const [listData, setListData] = useState({
    name: '',
    description: '',
    type: 'STATIC',
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setListData({
      ...listData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = async () => {
    if (!listData.name) {
      alert('❌ Veuillez donner un nom à votre liste')
      return
    }

    setIsSaving(true)

    // TODO: Save to database via API
    console.log('💾 Saving list:', listData)

    // Simulate save
    setTimeout(() => {
      setIsSaving(false)
      alert('✅ Liste créée avec succès !')
      router.push('/dashboard/email-marketing/lists')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Nouvelle liste de contacts</h1>
              <p className="text-sm text-gray-600">
                {listData.name || 'Sans titre'}
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving || !listData.name}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Création...' : 'Créer la liste'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de la liste *
                </label>
                <input
                  type="text"
                  name="name"
                  value={listData.name}
                  onChange={handleInputChange}
                  placeholder="Ex: Tous les abonnés"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={listData.description}
                  onChange={handleInputChange}
                  placeholder="Décrivez à quoi sert cette liste..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de liste
                </label>
                <select
                  name="type"
                  value={listData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="STATIC">📋 Statique - Gestion manuelle des contacts</option>
                  <option value="DYNAMIC">⚡ Dynamique - Mise à jour automatique selon des règles</option>
                </select>
                <p className="text-sm text-gray-500 mt-2">
                  {listData.type === 'STATIC'
                    ? 'Vous ajoutez et retirez les contacts manuellement'
                    : 'Les contacts sont ajoutés/retirés automatiquement selon vos critères'}
                </p>
              </div>

              {/* Dynamic Rules (if DYNAMIC) */}
              {listData.type === 'DYNAMIC' && (
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Règles de segmentation
                    </label>
                    <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                      <Plus className="w-4 h-4" />
                      Ajouter une règle
                    </button>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      💡 Les listes dynamiques seront disponibles dans la prochaine version.
                      Pour l'instant, créez une liste statique.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-purple-50 border border-purple-200 rounded-xl p-6">
            <h3 className="font-bold text-purple-900 mb-2">📝 Prochaines étapes</h3>
            <ul className="space-y-2 text-purple-800 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">1.</span>
                <span>Créez votre liste</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">2.</span>
                <span>Importez vos contacts (CSV, Excel) ou ajoutez-les manuellement</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-0.5">3.</span>
                <span>Utilisez cette liste dans vos campagnes email</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
