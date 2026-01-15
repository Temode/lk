'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  Save,
  Send,
  Eye,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  FileText,
} from 'lucide-react'
import dynamic from 'next/dynamic'
import { EmailEditorHandle } from '@/components/email-marketing/EmailEditor'

// Dynamic import to avoid SSR issues with EmailEditor
const EmailEditor = dynamic(() => import('@/components/email-marketing/EmailEditor'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[650px] bg-gray-50 border border-gray-200 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement de l'éditeur...</p>
      </div>
    </div>
  ),
})

export default function NewCampaignPage() {
  const router = useRouter()
  const emailEditorRef = useRef<EmailEditorHandle>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSaving, setIsSaving] = useState(false)
  const [editorReady, setEditorReady] = useState(false)

  const [campaignData, setCampaignData] = useState({
    name: '',
    subject: '',
    preheader: '',
    fromName: '',
    fromEmail: '',
    replyTo: '',
  })

  const steps = [
    { id: 1, name: 'Informations', icon: FileText },
    { id: 2, name: 'Design', icon: Sparkles },
    { id: 3, name: 'Destinataires', icon: Send },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCampaignData({
      ...campaignData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSaveDraft = async () => {
    setIsSaving(true)
    try {
      if (!emailEditorRef.current) {
        throw new Error('Editor not ready')
      }

      // Export HTML and Design JSON
      const { html, design } = await emailEditorRef.current.exportHtml()

      console.log('📧 Exported HTML:', html)
      console.log('🎨 Exported Design:', design)

      // TODO: Save to database via API
      const campaignToSave = {
        ...campaignData,
        htmlContent: html,
        jsonContent: JSON.stringify(design),
        status: 'DRAFT',
      }

      console.log('💾 Saving campaign:', campaignToSave)

      // Simulate save
      setTimeout(() => {
        setIsSaving(false)
        alert('✅ Brouillon sauvegardé avec succès !')
      }, 1000)
    } catch (error) {
      console.error('❌ Error saving:', error)
      setIsSaving(false)
      alert('❌ Erreur lors de la sauvegarde')
    }
  }

  const handlePreview = async () => {
    try {
      if (!emailEditorRef.current) {
        alert('❌ Éditeur pas encore prêt')
        return
      }

      const { html } = await emailEditorRef.current.exportHtml()

      // Open preview in new window
      const previewWindow = window.open('', '_blank')
      if (previewWindow) {
        previewWindow.document.write(html)
        previewWindow.document.close()
      }
    } catch (error) {
      console.error('❌ Error previewing:', error)
      alert('❌ Erreur lors de la prévisualisation')
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
              <h1 className="text-2xl font-bold text-gray-900">Nouvelle campagne</h1>
              <p className="text-sm text-gray-600">
                {campaignData.name || 'Sans titre'}
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
              onClick={handleSaveDraft}
              disabled={isSaving || !editorReady}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors">
              <Send className="w-4 h-4" />
              Continuer
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-4 mt-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  currentStep === step.id
                    ? 'bg-blue-100 text-blue-700'
                    : currentStep > step.id
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                <step.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{step.name}</span>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className="w-5 h-5 text-gray-400 mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {currentStep === 1 && (
          <div className="h-full p-6 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Informations de la campagne
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom de la campagne *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={campaignData.name}
                      onChange={handleInputChange}
                      placeholder="Ex: Newsletter Janvier 2026"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Visible uniquement par vous
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Objet de l'email *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={campaignData.subject}
                      onChange={handleInputChange}
                      placeholder="Ex: 🎉 Découvrez nos nouveautés"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Ce texte apparaîtra dans la boîte de réception
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Texte d'aperçu (Preheader)
                    </label>
                    <input
                      type="text"
                      name="preheader"
                      value={campaignData.preheader}
                      onChange={handleInputChange}
                      placeholder="Ex: Ne manquez pas nos offres exclusives"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Texte affiché après l'objet dans certains clients emails
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom de l'expéditeur *
                      </label>
                      <input
                        type="text"
                        name="fromName"
                        value={campaignData.fromName}
                        onChange={handleInputChange}
                        placeholder="Ex: WorkHub"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email de l'expéditeur *
                      </label>
                      <input
                        type="email"
                        name="fromEmail"
                        value={campaignData.fromEmail}
                        onChange={handleInputChange}
                        placeholder="contact@workhub.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email de réponse
                    </label>
                    <input
                      type="email"
                      name="replyTo"
                      value={campaignData.replyTo}
                      onChange={handleInputChange}
                      placeholder="reply@workhub.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Si différent de l'email d'expéditeur
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setCurrentStep(2)}
                    disabled={!campaignData.name || !campaignData.subject || !campaignData.fromName || !campaignData.fromEmail}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Suivant : Design
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="h-full p-6">
            <div className="h-full">
              <EmailEditor
                ref={emailEditorRef}
                onReady={() => setEditorReady(true)}
                minHeight="calc(100vh - 250px)"
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="h-full p-6 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Sélectionner les destinataires
                </h2>
                <p className="text-gray-600">
                  Fonctionnalité à venir : Sélection des listes et segments
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
