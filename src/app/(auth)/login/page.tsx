'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Zap } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    console.log('🔐 Tentative de connexion avec:', email)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      console.log('📊 Résultat signIn:', result)

      if (result?.error) {
        console.error('❌ Erreur de connexion:', result.error)
        setError('Email ou mot de passe incorrect')
        setLoading(false)
        return
      }

      if (result?.ok) {
        console.log('✅ Connexion réussie ! Redirection vers /dashboard...')
        // Attendre un peu pour que la session soit créée
        await new Promise(resolve => setTimeout(resolve, 500))
        router.push('/dashboard')
        router.refresh()
      }
    } catch (error) {
      console.error('❌ Exception lors de la connexion:', error)
      setError('Une erreur est survenue')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <Zap className="w-7 h-7 text-white" />
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            WorkHub
          </span>
        </div>

        <h1 className="text-2xl font-bold text-center mb-8">
          Connexion
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Pas encore de compte ?{' '}
          <Link href="/register" className="text-purple-600 font-semibold hover:text-purple-700">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  )
}
