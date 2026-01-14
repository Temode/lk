import Link from 'next/link'
import { ArrowRight, Zap, Users, BarChart, Rocket, Clock, Mail } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              WorkHub
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/features" className="text-gray-600 hover:text-gray-900">
              Fonctionnalités
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
              Tarifs
            </Link>
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              Connexion
            </Link>
            <Link
              href="/register"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
            >
              Commencer gratuitement
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-6">
            <Rocket className="w-4 h-4" />
            <span className="text-sm font-semibold">Nouvelle plateforme tout-en-un</span>
          </div>
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Tout ce dont vous avez besoin
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              en une seule plateforme
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Gestion de projets, CRM, email marketing, automatisation et IA.
            WorkHub centralise tous vos outils pour booster votre productivité.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/register"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition flex items-center"
            >
              Commencer gratuitement
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/demo"
              className="bg-white text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-gray-300 hover:border-gray-400 transition"
            >
              Voir la démo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Toutes les fonctionnalités dont vous avez besoin
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16">
            Une plateforme complète pour gérer votre entreprise
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Tableaux Kanban</h3>
              <p className="text-gray-600">
                Visualisez et gérez vos projets avec des tableaux Kanban intuitifs
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Gestion d'équipe</h3>
              <p className="text-gray-600">
                Collaborez efficacement avec votre équipe en temps réel
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Suivi du temps</h3>
              <p className="text-gray-600">
                Suivez le temps passé sur chaque tâche et projet
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Marketing</h3>
              <p className="text-gray-600">
                Créez et envoyez des campagnes email professionnelles
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">IA Générative</h3>
              <p className="text-gray-600">
                Générez du contenu automatiquement avec l'intelligence artificielle
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Analytics</h3>
              <p className="text-gray-600">
                Analysez vos performances avec des rapports détaillés
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Prêt à transformer votre façon de travailler ?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Rejoignez des milliers d'équipes qui utilisent WorkHub
            </p>
            <Link
              href="/register"
              className="inline-flex items-center bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
            >
              Commencer gratuitement
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">WorkHub</span>
          </div>
          <p className="text-gray-400">
            © 2025 WorkHub. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  )
}
