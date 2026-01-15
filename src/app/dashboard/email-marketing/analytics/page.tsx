import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import {
  TrendingUp,
  TrendingDown,
  Mail,
  Eye,
  MousePointerClick,
  UserX,
  BarChart3,
  Calendar,
} from 'lucide-react'

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions)

  // Mock analytics data
  const overallStats = [
    {
      name: 'Emails envoyés',
      value: '12,456',
      change: '+18%',
      trend: 'up',
      icon: Mail,
      color: 'bg-blue-500',
    },
    {
      name: 'Taux d\'ouverture',
      value: '24.5%',
      change: '+3.2%',
      trend: 'up',
      icon: Eye,
      color: 'bg-green-500',
    },
    {
      name: 'Taux de clic',
      value: '4.8%',
      change: '+0.8%',
      trend: 'up',
      icon: MousePointerClick,
      color: 'bg-purple-500',
    },
    {
      name: 'Taux de désabonnement',
      value: '0.3%',
      change: '-0.1%',
      trend: 'down',
      icon: UserX,
      color: 'bg-pink-500',
    },
  ]

  const topCampaigns = [
    {
      name: 'Newsletter Septembre 2026',
      sent: 2500,
      opened: 625,
      clicked: 120,
      openRate: 25.0,
      clickRate: 4.8,
      revenue: 2450,
    },
    {
      name: 'Promotion Rentrée',
      sent: 1200,
      opened: 312,
      clicked: 87,
      openRate: 26.0,
      clickRate: 7.25,
      revenue: 4120,
    },
    {
      name: 'Flash Sale Weekend',
      sent: 3500,
      opened: 1050,
      clicked: 245,
      openRate: 30.0,
      clickRate: 7.0,
      revenue: 8750,
    },
  ]

  const engagementByDay = [
    { day: 'Lun', sent: 1200, opened: 288, clicked: 58 },
    { day: 'Mar', sent: 1500, opened: 375, clicked: 75 },
    { day: 'Mer', sent: 1800, opened: 468, clicked: 90 },
    { day: 'Jeu', sent: 2200, opened: 550, clicked: 110 },
    { day: 'Ven', sent: 1600, opened: 400, clicked: 80 },
    { day: 'Sam', sent: 800, opened: 184, clicked: 32 },
    { day: 'Dim', sent: 600, opened: 138, clicked: 24 },
  ]

  const deviceStats = [
    { device: 'Mobile', percentage: 62, count: 7720 },
    { device: 'Desktop', percentage: 32, count: 3986 },
    { device: 'Tablet', percentage: 6, count: 747 },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Email Marketing</h1>
        <p className="text-gray-600 mt-2">
          Suivez les performances de vos campagnes en temps réel
        </p>
      </div>

      {/* Period Selector */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
            30 derniers jours
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium">
            7 jours
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium">
            Aujourd'hui
          </button>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors">
          <Calendar className="w-4 h-4" />
          Période personnalisée
        </button>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {overallStats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className={`flex items-center text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                {stat.change}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Engagement by Day */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Engagement par jour</h2>
          <div className="space-y-4">
            {engagementByDay.map((day) => (
              <div key={day.day}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 w-12">{day.day}</span>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                      <div
                        className="bg-blue-500 h-full flex items-center justify-end pr-2"
                        style={{ width: `${(day.sent / 2200) * 100}%` }}
                      >
                        <span className="text-xs text-white font-medium">{day.sent}</span>
                      </div>
                    </div>
                    <div className="w-20 text-right">
                      <span className="text-xs text-gray-600">
                        {((day.opened / day.sent) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Envoyés</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">% Ouverture</span>
              </div>
            </div>
          </div>
        </div>

        {/* Device Stats */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Par appareil</h2>
          <div className="space-y-6">
            {deviceStats.map((device) => (
              <div key={device.device}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{device.device}</span>
                  <span className="text-sm text-gray-600">{device.count.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      device.device === 'Mobile'
                        ? 'bg-blue-500'
                        : device.device === 'Desktop'
                        ? 'bg-purple-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${device.percentage}%` }}
                  ></div>
                </div>
                <div className="text-right mt-1">
                  <span className="text-xs text-gray-600">{device.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Campaigns */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Campagnes les plus performantes</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Voir tout →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Campagne</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Envoyés</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Ouverture</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Clics</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Taux ouverture</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Taux clic</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Revenus</th>
              </tr>
            </thead>
            <tbody>
              {topCampaigns.map((campaign, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">{campaign.name}</div>
                  </td>
                  <td className="py-4 px-4 text-right text-gray-700">
                    {campaign.sent.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right text-gray-700">
                    {campaign.opened.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right text-gray-700">
                    {campaign.clicked.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {campaign.openRate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {campaign.clickRate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right font-semibold text-gray-900">
                    {campaign.revenue.toLocaleString()}€
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <div className="bg-green-500 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-green-900 mb-1">📈 Excellente performance</h3>
              <p className="text-green-800 text-sm">
                Vos taux d'engagement sont 18% supérieurs à la moyenne du secteur.
                Continuez sur cette lancée !
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-blue-900 mb-1">💡 Conseil</h3>
              <p className="text-blue-800 text-sm">
                Les emails envoyés le jeudi génèrent 15% plus d'ouvertures.
                Planifiez vos campagnes en conséquence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
