'use client'

import { useRef, useEffect } from 'react'
import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor'

interface EmailEditorComponentProps {
  onReady?: () => void
  onLoad?: () => void
  initialDesign?: any
  minHeight?: string
}

export default function EmailEditorComponent({
  onReady,
  onLoad,
  initialDesign,
  minHeight = '650px',
}: EmailEditorComponentProps) {
  const emailEditorRef = useRef<EditorRef>(null)

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
}

// Export helper function to get editor reference
export const useEmailEditor = () => {
  const emailEditorRef = useRef<EditorRef>(null)

  const exportHtml = (): Promise<{ html: string; design: any }> => {
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
  }

  const loadDesign = (design: any) => {
    const editor = emailEditorRef.current?.editor
    if (editor) {
      editor.loadDesign(design)
    }
  }

  const saveDesign = (): Promise<any> => {
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
  }

  return {
    emailEditorRef,
    exportHtml,
    loadDesign,
    saveDesign,
  }
}
