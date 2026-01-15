import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import {
  Mail,
  Send,
  Users,
  BarChart3,
  Zap,
  FileText,
  Plus,
  TrendingUp,
  MousePointerClick,
  Eye
} from 'lucide-react'

export default async function EmailMarketingPage() {
  const session = await getServerSession(authOptions)

  const stats = [
    {
      name: 'Campagnes actives',
      value: '12',
      change: '+2 ce mois',
      icon: Send,
      color: 'bg-blue-500',
      trend: 'up'
    },
    {
      name: 'Taux d\'ouverture',
      value: '24.5%',
      change: '+3.2%',
      icon: Eye,
      color: 'bg-green-500',
      trend: 'up'
    },
    {
      name: 'Taux de clic',
      value: '4.8%',
      change: '+0.8%',
      icon: MousePointerClick,
      color: 'bg-purple-500',
      trend: 'up'
    },
    {
      name: 'Contacts',
      value: '2,847',
      change: '+124 ce mois',
      icon: Users,
      color: 'bg-pink-500',
      trend: 'up'
    },
  ]

  const quickActions = [
    {
      title: 'Nouvelle campagne',
      description: 'Créer une campagne email',
      icon: Mail,
      href: '/dashboard/email-marketing/campaigns/new',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      title: 'Nouveau template',
      description: 'Designer un template email',
      icon: FileText,
      href: '/dashboard/email-marketing/templates/new',
      color: 'bg-purple-500 hover:bg-purple-600',
    },
    {
      title: 'Nouvelle liste',
      description: 'Créer une liste de contacts',
      icon: Users,
      href: '/dashboard/email-marketing/lists/new',
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      title: 'Nouveau workflow',
      description: 'Automatiser vos emails',
      icon: Zap,
      href: '/dashboard/email-marketing/workflows/new',
      color: 'bg-orange-500 hover:bg-orange-600',
    },
  ]

  const recentCampaigns = [
    {
      name: 'Newsletter Septembre 2026',
      status: 'sent',
      sent: '2,500',
      opened: '625',
      clicked: '120',
      date: '2 jours',
    },
    {
      name: 'Promotion Rentrée',
      status: 'sending',
      sent: '1,200',
      opened: '280',
      clicked: '45',
      date: 'En cours',
    },
    {
      name: 'Bienvenue Nouveaux Clients',
      status: 'scheduled',
      sent: '-',
      opened: '-',
      clicked: '-',
      date: 'Dans 2h',
    },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Email Marketing</h1>
        <p className="text-gray-600 mt-2">
          Gérez vos campagnes, templates, listes et automatisations
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="flex items-center text-sm text-green-600 font-medium">
                <TrendingUp className="w-4 h-4 mr-1" />
                {stat.change}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className={`${action.color} text-white rounded-xl p-6 transition-all hover:scale-105 shadow-sm`}
            >
              <action.icon className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-lg mb-1">{action.title}</h3>
              <p className="text-sm text-white/90">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Campaigns & Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Campaigns */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Campagnes récentes</h2>
            <Link
              href="/dashboard/email-marketing/campaigns"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Voir tout →
            </Link>
          </div>
          <div className="space-y-4">
            {recentCampaigns.map((campaign, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      campaign.status === 'sent'
                        ? 'bg-green-100 text-green-700'
                        : campaign.status === 'sending'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {campaign.status === 'sent' ? 'Envoyée' : campaign.status === 'sending' ? 'En cours' : 'Planifiée'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>📨 {campaign.sent}</span>
                    <span>👁️ {campaign.opened}</span>
                    <span>🖱️ {campaign.clicked}</span>
                    <span className="text-gray-400">• {campaign.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Modules</h2>
          <nav className="space-y-2">
            <Link
              href="/dashboard/email-marketing/campaigns"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors group"
            >
              <Send className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Campagnes</span>
            </Link>
            <Link
              href="/dashboard/email-marketing/templates"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-600 transition-colors group"
            >
              <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Templates</span>
            </Link>
            <Link
              href="/dashboard/email-marketing/lists"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 text-gray-700 hover:text-green-600 transition-colors group"
            >
              <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Listes & Contacts</span>
            </Link>
            <Link
              href="/dashboard/email-marketing/workflows"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-colors group"
            >
              <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Workflows</span>
            </Link>
            <Link
              href="/dashboard/email-marketing/analytics"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-pink-50 text-gray-700 hover:text-pink-600 transition-colors group"
            >
              <BarChart3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Analytics</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}
