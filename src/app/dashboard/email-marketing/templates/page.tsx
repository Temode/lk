import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import {
  Plus,
  Search,
  Filter,
  Eye,
  Copy,
  Edit,
  Trash2,
  Star,
} from 'lucide-react'
import Image from 'next/image'

export default async function TemplatesPage() {
  const session = await getServerSession(authOptions)

  // Mock templates data
  const templates = [
    {
      id: '1',
      name: 'Newsletter Moderne',
      description: 'Template élégant pour newsletter hebdomadaire',
      category: 'Newsletter',
      thumbnail: '/templates/newsletter-modern.jpg',
      isPublic: true,
      usageCount: 45,
      isFavorite: true,
    },
    {
      id: '2',
      name: 'Promotion E-commerce',
      description: 'Template optimisé pour les promotions produits',
      category: 'E-commerce',
      thumbnail: '/templates/ecommerce-promo.jpg',
      isPublic: true,
      usageCount: 128,
      isFavorite: false,
    },
    {
      id: '3',
      name: 'Email de Bienvenue',
      description: 'Accueillez vos nouveaux abonnés avec style',
      category: 'Onboarding',
      thumbnail: '/templates/welcome-email.jpg',
      isPublic: true,
      usageCount: 89,
      isFavorite: true,
    },
    {
      id: '4',
      name: 'Annonce d\'Événement',
      description: 'Parfait pour promouvoir vos événements',
      category: 'Événement',
      thumbnail: '/templates/event-announcement.jpg',
      isPublic: true,
      usageCount: 34,
      isFavorite: false,
    },
    {
      id: '5',
      name: 'Newsletter Minimaliste',
      description: 'Design épuré et professionnel',
      category: 'Newsletter',
      thumbnail: '/templates/newsletter-minimal.jpg',
      isPublic: true,
      usageCount: 67,
      isFavorite: false,
    },
    {
      id: '6',
      name: 'Panier Abandonné',
      description: 'Récupérez vos ventes perdues',
      category: 'E-commerce',
      thumbnail: '/templates/abandoned-cart.jpg',
      isPublic: true,
      usageCount: 156,
      isFavorite: true,
    },
  ]

  const categories = [
    'Tous',
    'Newsletter',
    'E-commerce',
    'Onboarding',
    'Événement',
    'Promotion',
    'Transactionnel',
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Templates Email</h1>
          <p className="text-gray-600 mt-2">
            Choisissez parmi {templates.length} templates professionnels ou créez le vôtre
          </p>
        </div>
        <Link
          href="/dashboard/email-marketing/templates/new"
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Créer un template
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher un template..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                category === 'Tous'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
          >
            {/* Thumbnail */}
            <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
              {template.isFavorite && (
                <div className="absolute top-3 right-3 z-10">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                </div>
              )}
              {/* Placeholder image - en production, remplacer par de vraies images */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <div className="text-6xl mb-2">📧</div>
                  <p className="text-sm font-medium">{template.name}</p>
                </div>
              </div>

              {/* Overlay with actions on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Link
                  href={`/dashboard/email-marketing/templates/${template.id}/preview`}
                  className="p-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Prévisualiser"
                >
                  <Eye className="w-5 h-5" />
                </Link>
                <Link
                  href={`/dashboard/email-marketing/campaigns/new?template=${template.id}`}
                  className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  title="Utiliser ce template"
                >
                  <Copy className="w-5 h-5" />
                </Link>
                <button
                  className="p-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Éditer"
                >
                  <Edit className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{template.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {template.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                  {template.category}
                </span>
                <span className="text-xs text-gray-500">
                  Utilisé {template.usageCount} fois
                </span>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-2">
                <Link
                  href={`/dashboard/email-marketing/campaigns/new?template=${template.id}`}
                  className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Utiliser
                </Link>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Star className={`w-4 h-4 ${template.isFavorite ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (if no templates) */}
      {templates.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📧</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun template</h3>
          <p className="text-gray-600 mb-6">
            Commencez par créer votre premier template email
          </p>
          <Link
            href="/dashboard/email-marketing/templates/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Créer un template
          </Link>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-bold text-blue-900 mb-2">💡 Astuce Pro</h3>
        <p className="text-blue-800 text-sm">
          Créez vos propres templates pour gagner du temps lors de la création de vos campagnes.
          Les templates peuvent être réutilisés à l'infini et partagés avec votre équipe.
        </p>
      </div>
    </div>
  )
}
