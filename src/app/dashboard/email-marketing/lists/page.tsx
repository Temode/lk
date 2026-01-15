import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import {
  Plus,
  Search,
  Users,
  TrendingUp,
  Filter as FilterIcon,
  MoreVertical,
  Upload,
  Download,
} from 'lucide-react'

export default async function ListsPage() {
  const session = await getServerSession(authOptions)

  // Mock lists data
  const lists = [
    {
      id: '1',
      name: 'Tous les abonnés',
      description: 'Liste principale de tous les contacts',
      type: 'STATIC',
      contactCount: 2847,
      subscribedCount: 2791,
      unsubscribedCount: 56,
      growthRate: '+12%',
      lastUpdated: '2026-01-15T10:00:00',
    },
    {
      id: '2',
      name: 'Clients actifs',
      description: 'Clients ayant acheté dans les 30 derniers jours',
      type: 'DYNAMIC',
      contactCount: 456,
      subscribedCount: 456,
      unsubscribedCount: 0,
      growthRate: '+8%',
      lastUpdated: '2026-01-15T08:30:00',
    },
    {
      id: '3',
      name: 'Nouveaux inscrits',
      description: 'Inscrits des 7 derniers jours',
      type: 'DYNAMIC',
      contactCount: 124,
      subscribedCount: 124,
      unsubscribedCount: 0,
      growthRate: '+45%',
      lastUpdated: '2026-01-15T12:00:00',
    },
    {
      id: '4',
      name: 'Segment test A/B',
      description: 'Liste de test pour campagnes A/B',
      type: 'STATIC',
      contactCount: 200,
      subscribedCount: 198,
      unsubscribedCount: 2,
      growthRate: '0%',
      lastUpdated: '2026-01-10T14:00:00',
    },
    {
      id: '5',
      name: 'Leads inactifs',
      description: 'Pas d\'interaction depuis 60 jours',
      type: 'DYNAMIC',
      contactCount: 387,
      subscribedCount: 387,
      unsubscribedCount: 0,
      growthRate: '-5%',
      lastUpdated: '2026-01-15T09:00:00',
    },
  ]

  const stats = [
    {
      name: 'Total contacts',
      value: '4,014',
      change: '+124 ce mois',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      name: 'Taux d\'abonnés',
      value: '98.2%',
      change: '+0.5%',
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      name: 'Listes actives',
      value: lists.length.toString(),
      change: '+2 ce mois',
      icon: FilterIcon,
      color: 'bg-purple-500',
    },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Listes & Contacts</h1>
          <p className="text-gray-600 mt-2">
            Gérez vos listes de contacts et créez des segments intelligents
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors">
            <Upload className="w-5 h-5" />
            Importer
          </button>
          <Link
            href="/dashboard/email-marketing/lists/new"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Nouvelle liste
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-green-600 font-medium">
                {stat.change}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher une liste..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Lists */}
      <div className="space-y-4">
        {lists.map((list) => (
          <div
            key={list.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{list.name}</h3>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      list.type === 'DYNAMIC'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {list.type === 'DYNAMIC' ? '⚡ Dynamique' : '📋 Statique'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{list.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {list.contactCount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Contacts</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {list.subscribedCount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Abonnés</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">
                        {list.unsubscribedCount}
                      </div>
                      <div className="text-sm text-gray-600">Désabonnés</div>
                    </div>
                    <div>
                      <div className={`text-2xl font-bold ${
                        list.growthRate.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {list.growthRate}
                      </div>
                      <div className="text-sm text-gray-600">Croissance</div>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-gray-500">
                    Dernière mise à jour : {new Date(list.lastUpdated).toLocaleString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                <Link
                  href={`/dashboard/email-marketing/lists/${list.id}`}
                  className="flex-1 text-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
                >
                  Voir les contacts
                </Link>
                <Link
                  href={`/dashboard/email-marketing/campaigns/new?list=${list.id}`}
                  className="flex-1 text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                >
                  Créer une campagne
                </Link>
                <button className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="mt-8 bg-purple-50 border border-purple-200 rounded-xl p-6">
        <h3 className="font-bold text-purple-900 mb-2">⚡ Listes dynamiques</h3>
        <p className="text-purple-800 text-sm">
          Les listes dynamiques se mettent à jour automatiquement en fonction de vos critères.
          Parfait pour cibler des segments spécifiques comme les clients actifs ou les nouveaux inscrits.
        </p>
      </div>
    </div>
  )
}
