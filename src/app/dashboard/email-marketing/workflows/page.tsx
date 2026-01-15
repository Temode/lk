import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import {
  Plus,
  Search,
  Zap,
  Play,
  Pause,
  TrendingUp,
  Users,
  Mail,
} from 'lucide-react'

export default async function WorkflowsPage() {
  const session = await getServerSession(authOptions)

  // Mock workflows data
  const workflows = [
    {
      id: '1',
      name: 'Bienvenue Nouveaux Abonnés',
      description: 'Série d\'emails de bienvenue sur 7 jours',
      trigger: 'CONTACT_ADDED',
      isActive: true,
      totalEntered: 456,
      totalCompleted: 389,
      completionRate: 85.3,
    },
    {
      id: '2',
      name: 'Réengagement Inactifs',
      description: 'Récupérer les contacts inactifs depuis 60 jours',
      trigger: 'DATE_BASED',
      isActive: true,
      totalEntered: 234,
      totalCompleted: 156,
      completionRate: 66.7,
    },
    {
      id: '3',
      name: 'Nurturing Leads',
      description: 'Éduquer les leads froids avec du contenu',
      trigger: 'CONTACT_TAGGED',
      isActive: false,
      totalEntered: 89,
      totalCompleted: 67,
      completionRate: 75.3,
    },
  ]

  const stats = [
    {
      name: 'Workflows actifs',
      value: workflows.filter(w => w.isActive).length.toString(),
      icon: Zap,
      color: 'bg-green-500',
    },
    {
      name: 'Contacts dans workflows',
      value: workflows.reduce((acc, w) => acc + w.totalEntered, 0).toLocaleString(),
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      name: 'Taux de complétion moyen',
      value: '75.8%',
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
  ]

  const triggerLabels: Record<string, string> = {
    CONTACT_ADDED: '👤 Contact ajouté',
    DATE_BASED: '📅 Date spécifique',
    EMAIL_OPENED: '📧 Email ouvert',
    EMAIL_CLICKED: '🖱️ Lien cliqué',
    CONTACT_TAGGED: '🏷️ Tag ajouté',
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workflows d'Automation</h1>
          <p className="text-gray-600 mt-2">
            Automatisez vos campagnes email avec des workflows intelligents
          </p>
        </div>
        <Link
          href="/dashboard/email-marketing/workflows/new"
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Nouveau workflow
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Rechercher un workflow..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Workflows List */}
      <div className="space-y-4">
        {workflows.map((workflow) => (
          <div
            key={workflow.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{workflow.name}</h3>
                    <span className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${
                      workflow.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {workflow.isActive ? (
                        <>
                          <Play className="w-3 h-3" />
                          Actif
                        </>
                      ) : (
                        <>
                          <Pause className="w-3 h-3" />
                          Inactif
                        </>
                      )}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{workflow.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                      {triggerLabels[workflow.trigger]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-100">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {workflow.totalEntered}
                  </div>
                  <div className="text-sm text-gray-600">Entrés</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {workflow.totalCompleted}
                  </div>
                  <div className="text-sm text-gray-600">Complétés</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {workflow.completionRate.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">Taux de complétion</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                <Link
                  href={`/dashboard/email-marketing/workflows/${workflow.id}`}
                  className="flex-1 text-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
                >
                  Voir le workflow
                </Link>
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
                  {workflow.isActive ? 'Mettre en pause' : 'Activer'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {workflows.length === 0 && (
        <div className="text-center py-16">
          <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun workflow</h3>
          <p className="text-gray-600 mb-6">
            Créez votre premier workflow pour automatiser vos campagnes
          </p>
          <Link
            href="/dashboard/email-marketing/workflows/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Créer un workflow
          </Link>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-8 bg-orange-50 border border-orange-200 rounded-xl p-6">
        <h3 className="font-bold text-orange-900 mb-2">⚡ Workflows d'automation</h3>
        <p className="text-orange-800 text-sm">
          Les workflows automatisent l'envoi d'emails selon des déclencheurs spécifiques.
          Configurez des séquences complexes pour nurturing, onboarding, réengagement et plus encore.
        </p>
      </div>
    </div>
  )
}
