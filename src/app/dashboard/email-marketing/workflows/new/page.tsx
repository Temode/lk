import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import {
  ChevronLeft,
  Zap,
  GitBranch,
  Calendar,
  Mail,
  Users,
} from 'lucide-react'

export default async function NewWorkflowPage() {
  const session = await getServerSession(authOptions)

  const templates = [
    {
      id: 'welcome',
      name: 'Série de Bienvenue',
      description: 'Accueillez les nouveaux abonnés avec une série d\'emails sur 7 jours',
      icon: Mail,
      color: 'bg-blue-500',
      steps: 5,
      trigger: 'Contact ajouté à une liste',
    },
    {
      id: 'nurturing',
      name: 'Nurturing de Leads',
      description: 'Éduquez vos leads avec du contenu sur plusieurs semaines',
      icon: TrendingUp,
      color: 'bg-purple-500',
      steps: 8,
      trigger: 'Contact tagué comme "Lead"',
    },
    {
      id: 'reengagement',
      name: 'Réengagement',
      description: 'Récupérez les contacts inactifs avec une campagne de réactivation',
      icon: Users,
      color: 'bg-orange-500',
      steps: 4,
      trigger: 'Contact inactif depuis 60 jours',
    },
    {
      id: 'abandoned-cart',
      name: 'Panier Abandonné',
      description: 'Récupérez les ventes perdues avec des rappels automatiques',
      icon: ShoppingCart,
      color: 'bg-green-500',
      steps: 3,
      trigger: 'Panier abandonné',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/email-marketing/workflows"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Créer un workflow</h1>
            <p className="text-sm text-gray-600">
              Choisissez un template ou créez un workflow personnalisé
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="max-w-5xl mx-auto">
          {/* Templates Grid */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Templates de workflows</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`${template.color} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                      <template.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{template.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <GitBranch className="w-3 h-3" />
                          {template.steps} étapes
                        </span>
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          {template.trigger}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                      Utiliser ce template
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Workflow */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <div className="bg-purple-600 p-3 rounded-lg">
                <GitBranch className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Créer un workflow personnalisé</h3>
                <p className="text-gray-600 mb-4">
                  Construisez votre propre workflow avec notre éditeur visuel drag & drop.
                  Ajoutez des conditions, des délais, des branches et plus encore.
                </p>
                <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium">
                  Commencer de zéro
                </button>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-bold text-blue-900 mb-2">💡 Comment fonctionnent les workflows ?</h3>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">1.</span>
                <span><strong>Déclencheur :</strong> Définissez l'événement qui démarre le workflow (nouveau contact, email ouvert, etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">2.</span>
                <span><strong>Actions :</strong> Ajoutez des étapes (envoyer email, attendre, ajouter tag, etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">3.</span>
                <span><strong>Conditions :</strong> Créez des branches basées sur le comportement (email ouvert ? lien cliqué ?)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">4.</span>
                <span><strong>Activation :</strong> Activez le workflow et les contacts entreront automatiquement</span>
              </li>
            </ul>
          </div>

          {/* Coming Soon Notice */}
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
            <h3 className="font-bold text-yellow-900 mb-2">🚧 Workflow Builder - Bientôt disponible</h3>
            <p className="text-yellow-800 text-sm">
              L'éditeur visuel de workflows sera disponible dans la prochaine version.
              En attendant, vous pouvez créer des campagnes simples dans la section Campagnes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Temporary import for icons
import { TrendingUp, ShoppingCart } from 'lucide-react'
