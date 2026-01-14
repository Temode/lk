'use client'

import { useState } from 'react'
import { Sparkles, Send } from 'lucide-react'

export default function AIPage() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  const templates = [
    { name: 'Article de blog', prompt: 'Écris un article de blog sur...' },
    { name: 'Email marketing', prompt: 'Crée un email marketing pour...' },
    { name: 'Post réseaux sociaux', prompt: 'Génère un post pour...' },
    { name: 'Description produit', prompt: 'Écris une description pour...' },
  ]

  const handleGenerate = async () => {
    setLoading(true)
    // Simulation de génération IA
    setTimeout(() => {
      setResult('Contenu généré par l\'IA basé sur votre prompt...\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Sparkles className="w-8 h-8 text-purple-600 mr-3" />
          Générateur de contenu IA
        </h1>
        <p className="text-gray-600 mt-2">Créez du contenu automatiquement avec l'intelligence artificielle</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Templates Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Templates</h2>
            <div className="space-y-2">
              {templates.map((template) => (
                <button
                  key={template.name}
                  onClick={() => setPrompt(template.prompt)}
                  className="w-full text-left px-4 py-3 rounded-lg border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition"
                >
                  <div className="font-semibold text-gray-900 mb-1">{template.name}</div>
                  <div className="text-sm text-gray-600">{template.prompt}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Input */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Décrivez ce que vous voulez créer</h2>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Exemple: Écris un article de blog sur les avantages du travail à distance..."
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
            <button
              onClick={handleGenerate}
              disabled={!prompt || loading}
              className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center disabled:opacity-50"
            >
              {loading ? (
                'Génération en cours...'
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Générer avec l'IA
                </>
              )}
            </button>
          </div>

          {/* Result */}
          {result && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900">Résultat</h2>
                <button className="text-purple-600 font-semibold hover:text-purple-700">
                  Copier
                </button>
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{result}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
