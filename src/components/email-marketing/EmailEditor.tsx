'use client'

import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor'

interface EmailEditorComponentProps {
  onReady?: () => void
  onLoad?: () => void
  initialDesign?: any
  minHeight?: string
}

export interface EmailEditorHandle {
  exportHtml: () => Promise<{ html: string; design: any }>
  saveDesign: () => Promise<any>
  loadDesign: (design: any) => void
  editor: EditorRef['editor'] | undefined
}

const EmailEditorComponent = forwardRef<EmailEditorHandle, EmailEditorComponentProps>(
  ({ onReady, onLoad, initialDesign, minHeight = '650px' }, ref) => {
  const emailEditorRef = useRef<EditorRef>(null)

  // Expose methods to parent via ref
  useImperativeHandle(ref, () => ({
    exportHtml: () => {
      return new Promise((resolve, reject) => {
        const editor = emailEditorRef.current?.editor
        if (!editor) {
          reject(new Error('Editor not ready'))
          return
        }
        editor.exportHtml((data) => {
          const { design, html } = data
          resolve({ html, design })
        })
      })
    },
    saveDesign: () => {
      return new Promise((resolve, reject) => {
        const editor = emailEditorRef.current?.editor
        if (!editor) {
          reject(new Error('Editor not ready'))
          return
        }
        editor.saveDesign((design) => {
          resolve(design)
        })
      })
    },
    loadDesign: (design: any) => {
      const editor = emailEditorRef.current?.editor
      if (editor) {
        editor.loadDesign(design)
      }
    },
    get editor() {
      return emailEditorRef.current?.editor
    }
  }))

  useEffect(() => {
    // Load design when editor is ready
    if (initialDesign && emailEditorRef.current) {
      emailEditorRef.current.editor?.loadDesign(initialDesign)
    }
  }, [initialDesign])

  const onEditorReady = () => {
    console.log('✅ Email Editor Ready')
    if (onReady) {
      onReady()
    }
  }

  const onEditorLoad = () => {
    console.log('✅ Email Editor Loaded')
    if (initialDesign && emailEditorRef.current) {
      emailEditorRef.current.editor?.loadDesign(initialDesign)
    }
    if (onLoad) {
      onLoad()
    }
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <EmailEditor
        ref={emailEditorRef}
        onReady={onEditorReady}
        onLoad={onEditorLoad}
        minHeight={minHeight}
        options={{
          appearance: {
            theme: 'modern_light',
            panels: {
              tools: {
                dock: 'left',
              },
            },
          },
          features: {
            preview: true,
            imageEditor: true,
            undoRedo: true,
            stockImages: {
              enabled: true,
            },
          },
          locale: 'fr-FR',
          displayMode: 'email',
          projectId: 1, // Free tier project ID
          tools: {
            // Customize available tools
            form: {
              enabled: true,
            },
            button: {
              enabled: true,
            },
            divider: {
              enabled: true,
            },
            heading: {
              enabled: true,
            },
            html: {
              enabled: true,
            },
            image: {
              enabled: true,
            },
            menu: {
              enabled: true,
            },
            social: {
              enabled: true,
            },
            text: {
              enabled: true,
            },
            video: {
              enabled: true,
            },
          },
          customJS: [
            // You can add custom JS here if needed
          ],
        }}
      />
    </div>
  )
})

EmailEditorComponent.displayName = 'EmailEditorComponent'

export default EmailEditorComponent
