import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { BarChart3, Users, Clock, Mail, TrendingUp, CheckCircle } from 'lucide-react'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  const stats = [
    { name: 'Tâches complétées', value: '24', icon: CheckCircle, color: 'bg-green-500' },
    { name: 'Projets actifs', value: '8', icon: BarChart3, color: 'bg-blue-500' },
    { name: 'Heures travaillées', value: '156', icon: Clock, color: 'bg-purple-500' },
    { name: 'Emails envoyés', value: '1.2k', icon: Mail, color: 'bg-pink-500' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Bienvenue, {session?.user?.name} 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Voici un aperçu de votre activité aujourd'hui
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Projets récents</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">Projet {i}</h3>
                  <p className="text-sm text-gray-600">En cours</p>
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Tâches prioritaires</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Tâche prioritaire {i}</h3>
                  <p className="text-sm text-gray-600">À faire aujourd'hui</p>
                </div>
                <span className="px-3 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded-full">
                  Urgent
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
