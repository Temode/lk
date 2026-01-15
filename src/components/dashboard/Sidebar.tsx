'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Kanban,
  FileText,
  Users,
  Mail,
  Clock,
  BarChart3,
  Zap,
  Settings,
  LogOut,
  Sparkles
} from 'lucide-react'
import { signOut } from 'next-auth/react'

const navigation = [
  { name: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Kanban', href: '/dashboard/kanban', icon: Kanban },
  { name: 'Documents', href: '/dashboard/documents', icon: FileText },
  { name: 'CRM', href: '/dashboard/crm', icon: Users },
  { name: 'Email Marketing', href: '/dashboard/email-marketing', icon: Mail },
  { name: 'Suivi du temps', href: '/dashboard/time', icon: Clock },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Automatisation', href: '/dashboard/automation', icon: Zap },
  { name: 'IA Générateur', href: '/dashboard/ai', icon: Sparkles },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-gray-900 text-white">
      <div className="flex items-center justify-center h-16 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">WorkHub</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-800 space-y-2">
        <Link
          href="/dashboard/settings"
          className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition"
        >
          <Settings className="w-5 h-5 mr-3" />
          <span className="text-sm font-medium">Paramètres</span>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span className="text-sm font-medium">Déconnexion</span>
        </button>
      </div>
    </div>
  )
}
