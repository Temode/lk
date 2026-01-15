'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { EditorRef } from 'react-email-editor'
import {
  Save,
  ChevronLeft,
  Eye,
  Sparkles,
} from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamic import to avoid SSR issues
const EmailEditor = dynamic(() => import('@/components/email-marketing/EmailEditor'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[calc(100vh-200px)] bg-gray-50 border border-gray-200 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement de l'éditeur...</p>
      </div>
    </div>
  ),
})

export default function NewTemplatePage() {
  const router = useRouter()
  const emailEditorRef = useRef<EditorRef>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [editorReady, setEditorReady] = useState(false)

  const [templateData, setTemplateData] = useState({
    name: '',
    description: '',
    category: 'Newsletter',
  })

  const categories = [
    'Newsletter',
    'E-commerce',
    'Onboarding',
    'Événement',
    'Promotion',
    'Transactionnel',
    'Autre',
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTemplateData({
      ...templateData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSaveTemplate = async () => {
    if (!templateData.name) {
      alert('❌ Veuillez donner un nom à votre template')
      return
    }

    setIsSaving(true)
    try {
      const editor = emailEditorRef.current?.editor
      if (!editor) {
        throw new Error('Editor not ready')
      }

      // Export HTML and Design JSON
      editor.exportHtml((data) => {
        const { design, html } = data
        console.log('📧 Exported HTML:', html)
        console.log('🎨 Exported Design:', design)

        // TODO: Save to database via API
        const templateToSave = {
          ...templateData,
          htmlContent: html,
          jsonContent: JSON.stringify(design),
        }

        console.log('💾 Saving template:', templateToSave)

        // Simulate save
        setTimeout(() => {
          setIsSaving(false)
          alert('✅ Template sauvegardé avec succès !')
          router.push('/dashboard/email-marketing/templates')
        }, 1000)
      })
    } catch (error) {
      console.error('❌ Error saving:', error)
      setIsSaving(false)
      alert('❌ Erreur lors de la sauvegarde')
    }
  }

  const handlePreview = () => {
    const editor = emailEditorRef.current?.editor
    if (editor) {
      editor.exportHtml((data) => {
        const { html } = data
        // Open preview in new window
        const previewWindow = window.open('', '_blank')
        if (previewWindow) {
          previewWindow.document.write(html)
          previewWindow.document.close()
        }
      })
    }
  }

  const handleGenerateWithAI = async () => {
    // TODO: Implement AI generation
    alert('🤖 Génération IA - Fonctionnalité à venir !')
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Nouveau template</h1>
              <p className="text-sm text-gray-600">
                {templateData.name || 'Sans titre'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleGenerateWithAI}
              className="flex items-center gap-2 px-4 py-2 border border-purple-300 text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Générer avec IA
            </button>
            <button
              onClick={handlePreview}
              disabled={!editorReady}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50"
            >
              <Eye className="w-4 h-4" />
              Prévisualiser
            </button>
            <button
              onClick={handleSaveTemplate}
              disabled={isSaving || !editorReady || !templateData.name}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar with template info */}
        <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Informations du template</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du template *
              </label>
              <input
                type="text"
                name="name"
                value={templateData.name}
                onChange={handleInputChange}
                placeholder="Ex: Newsletter Hebdomadaire"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={templateData.description}
                onChange={handleInputChange}
                placeholder="Décrivez à quoi sert ce template..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie
              </label>
              <select
                name="category"
                value={templateData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3">💡 Conseils</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Utilisez des couleurs cohérentes avec votre marque</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Optimisez pour mobile et desktop</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Ajoutez des placeholders pour le contenu dynamique</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Incluez toujours un lien de désabonnement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 p-6 overflow-hidden">
          <EmailEditor
            ref={emailEditorRef}
            onReady={() => setEditorReady(true)}
            minHeight="calc(100vh - 150px)"
          />
        </div>
      </div>
    </div>
  )
}
