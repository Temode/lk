'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'

interface Task {
  id: string
  title: string
  description: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
}

interface Column {
  id: string
  name: string
  tasks: Task[]
}

export default function KanbanPage() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: '1',
      name: 'À faire',
      tasks: [
        { id: '1', title: 'Design de la page d\'accueil', description: 'Créer le mockup', priority: 'HIGH' },
        { id: '2', title: 'Intégrer l\'API', description: 'Connexion backend', priority: 'MEDIUM' },
      ]
    },
    {
      id: '2',
      name: 'En cours',
      tasks: [
        { id: '3', title: 'Développement du dashboard', description: 'Interface utilisateur', priority: 'URGENT' },
      ]
    },
    {
      id: '3',
      name: 'Terminé',
      tasks: [
        { id: '4', title: 'Setup du projet', description: 'Configuration initiale', priority: 'LOW' },
      ]
    }
  ])

  const priorityColors = {
    LOW: 'bg-gray-100 text-gray-600',
    MEDIUM: 'bg-blue-100 text-blue-600',
    HIGH: 'bg-orange-100 text-orange-600',
    URGENT: 'bg-red-100 text-red-600',
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau Kanban</h1>
          <p className="text-gray-600 mt-2">Gérez vos tâches visuellement</p>
        </div>
        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Nouvelle tâche
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column.id} className="bg-gray-100 rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-900">{column.name}</h2>
              <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded">
                {column.tasks.length}
              </span>
            </div>

            <div className="space-y-3">
              {column.tasks.map((task) => (
                <div key={task.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition">
                  <h3 className="font-semibold text-gray-900 mb-2">{task.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-2 text-gray-600 hover:bg-white hover:text-gray-900 rounded-lg transition flex items-center justify-center">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une tâche
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
