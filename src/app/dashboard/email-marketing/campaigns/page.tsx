import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import {
  Plus,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  MousePointerClick,
  MoreVertical,
  Search,
  Filter
} from 'lucide-react'

export default async function CampaignsPage() {
  const session = await getServerSession(authOptions)

  // Mock data - À remplacer par de vraies données de la DB
  const campaigns = [
    {
      id: '1',
      name: 'Newsletter Septembre 2026',
      subject: '🎉 Découvrez nos nouveautés de septembre',
      status: 'sent',
      type: 'REGULAR',
      listName: 'Tous les abonnés',
      totalSent: 2500,
      opened: 625,
      clicked: 120,
      openRate: 25.0,
      clickRate: 4.8,
      sentAt: '2026-01-13T10:00:00',
    },
    {
      id: '2',
      name: 'Promotion Rentrée',
      subject: '📚 -30% sur tous les produits !',
      status: 'sending',
      type: 'REGULAR',
      listName: 'Clients actifs',
      totalSent: 1200,
      opened: 280,
      clicked: 45,
      openRate: 23.3,
      clickRate: 3.75,
      sentAt: null,
    },
    {
      id: '3',
      name: 'Bienvenue Nouveaux Clients',
      subject: '👋 Bienvenue chez WorkHub !',
      status: 'scheduled',
      type: 'AUTOMATED',
      listName: 'Nouveaux inscrits',
      totalSent: 0,
      opened: 0,
      clicked: 0,
      openRate: 0,
      clickRate: 0,
      scheduledAt: '2026-01-15T14:00:00',
    },
    {
      id: '4',
      name: 'A/B Test - Subject Lines',
      subject: 'Test de sujets multiples',
      status: 'draft',
      type: 'AB_TEST',
      listName: 'Segment test',
      totalSent: 0,
      opened: 0,
      clicked: 0,
      openRate: 0,
      clickRate: 0,
      sentAt: null,
    },
  ]

  const statusConfig = {
    sent: {
      label: 'Envoyée',
      icon: CheckCircle,
      className: 'bg-green-100 text-green-700 border-green-200',
    },
    sending: {
      label: 'En cours',
      icon: Send,
      className: 'bg-blue-100 text-blue-700 border-blue-200',
    },
    scheduled: {
      label: 'Planifiée',
      icon: Clock,
      className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    },
    draft: {
      label: 'Brouillon',
      icon: XCircle,
      className: 'bg-gray-100 text-gray-700 border-gray-200',
    },
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campagnes Email</h1>
          <p className="text-gray-600 mt-2">
            Gérez et suivez toutes vos campagnes d'email marketing
          </p>
        </div>
        <Link
          href="/dashboard/email-marketing/campaigns/new"
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Nouvelle campagne
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher une campagne..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter className="w-5 h-5" />
          Filtres
        </button>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 gap-6">
        {campaigns.map((campaign) => {
          const StatusIcon = statusConfig[campaign.status as keyof typeof statusConfig].icon
          return (
            <div
              key={campaign.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{campaign.name}</h3>
                      <span className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full border ${statusConfig[campaign.status as keyof typeof statusConfig].className}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {statusConfig[campaign.status as keyof typeof statusConfig].label}
                      </span>
                      {campaign.type === 'AB_TEST' && (
                        <span className="px-2 py-1 text-xs font-semibold bg-purple-100 text-purple-700 rounded-full">
                          A/B Test
                        </span>
                      )}
                      {campaign.type === 'AUTOMATED' && (
                        <span className="px-2 py-1 text-xs font-semibold bg-orange-100 text-orange-700 rounded-full">
                          Automatisée
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-1">
                      <span className="font-medium">Sujet:</span> {campaign.subject}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Liste:</span> {campaign.listName}
                    </p>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Stats */}
                {campaign.status !== 'draft' && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{campaign.totalSent.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Envoyés</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Eye className="w-4 h-4 text-green-600" />
                        <div className="text-2xl font-bold text-gray-900">{campaign.openRate.toFixed(1)}%</div>
                      </div>
                      <div className="text-sm text-gray-600">{campaign.opened} ouvertures</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <MousePointerClick className="w-4 h-4 text-blue-600" />
                        <div className="text-2xl font-bold text-gray-900">{campaign.clickRate.toFixed(1)}%</div>
                      </div>
                      <div className="text-sm text-gray-600">{campaign.clicked} clics</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-900">
                        {campaign.status === 'scheduled'
                          ? `Planifié: ${new Date(campaign.scheduledAt!).toLocaleString('fr-FR', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}`
                          : campaign.status === 'sending'
                          ? 'En cours d\'envoi'
                          : `Envoyé: ${new Date(campaign.sentAt!).toLocaleString('fr-FR', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}`}
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                  <Link
                    href={`/dashboard/email-marketing/campaigns/${campaign.id}`}
                    className="flex-1 text-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
                  >
                    Voir les détails
                  </Link>
                  {campaign.status === 'draft' && (
                    <Link
                      href={`/dashboard/email-marketing/campaigns/${campaign.id}/edit`}
                      className="flex-1 text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                    >
                      Continuer l'édition
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State (si aucune campagne) */}
      {campaigns.length === 0 && (
        <div className="text-center py-16">
          <Send className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Aucune campagne</h3>
          <p className="text-gray-600 mb-6">
            Commencez par créer votre première campagne email
          </p>
          <Link
            href="/dashboard/email-marketing/campaigns/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Créer une campagne
          </Link>
        </div>
      )}
    </div>
  )
}
