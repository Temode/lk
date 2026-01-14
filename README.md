# 🚀 WorkHub - Plateforme SaaS Tout-en-Un

WorkHub est une plateforme SaaS complète qui combine gestion de projets, CRM, email marketing, automatisation et intelligence artificielle en une seule solution puissante.

## ✨ Fonctionnalités

### 📊 Gestion de Projets
- **Tableaux Kanban** - Visualisez et gérez vos tâches avec des tableaux drag-and-drop
- **Gestion d'équipes** - Collaborez efficacement avec votre équipe
- **Suivi du temps** - Suivez le temps passé sur chaque projet et tâche

### 📝 Documents Collaboratifs
- **Éditeur en temps réel** - Créez et modifiez des documents collaborativement
- **Templates** - Bibliothèque de templates prêts à l'emploi
- **Gestion de versions** - Historique complet des modifications

### 👥 CRM
- **Gestion de contacts** - Centralisez tous vos contacts
- **Pipeline de ventes** - Suivez vos opportunités commerciales
- **Historique des interactions** - Gardez trace de toutes les communications

### 📧 Email Marketing
- **Campagnes email** - Créez et envoyez des emails professionnels
- **Automatisation** - Automatisez vos campagnes marketing
- **Analytics** - Analysez les performances de vos campagnes

### 🤖 Intelligence Artificielle
- **Générateur de contenu** - Créez du contenu automatiquement avec l'IA
- **Templates IA** - Articles, emails, posts sociaux et plus
- **Optimisation** - Améliorez votre contenu avec l'IA

### ⚡ Automatisation
- **Workflows** - Créez des processus automatisés
- **Déclencheurs** - Configurez des actions basées sur des événements
- **Intégrations** - Connectez vos outils préférés

### 📈 Analytics
- **Tableaux de bord** - Visualisez vos métriques clés
- **Rapports détaillés** - Analyses approfondies de vos données
- **Graphiques interactifs** - Explorez vos données visuellement

## 🛠️ Stack Technique

- **Frontend:** Next.js 14 (App Router), React, TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Next.js API Routes
- **Base de données:** PostgreSQL (Supabase) avec Prisma ORM
- **Authentification:** NextAuth.js
- **Paiements:** Stripe
- **IA:** OpenAI API
- **Email:** Resend
- **Temps réel:** Socket.io

## 🚀 Installation

### Prérequis

- Node.js 18+
- npm ou yarn
- Un compte Supabase (gratuit) - [Créer un compte](https://supabase.com)

### 📋 Étape 1: Configurer Supabase

**IMPORTANT** : Avant d'installer, vous devez configurer Supabase !

👉 **[Suivez le guide de configuration Supabase](./SUPABASE_SETUP.md)** 👈

Le guide vous expliquera comment :
1. Créer un compte Supabase gratuit
2. Créer un nouveau projet
3. Récupérer vos identifiants de connexion
4. Configurer votre fichier `.env`

### 📦 Étape 2: Installer le projet

1. **Cloner le repository**
```bash
git clone https://github.com/Temode/lk.git
cd lk
```

2. **Installer les dépendances**
```bash
npm install --legacy-peer-deps
```

3. **Configurer les variables d'environnement**

Copiez `.env.example` vers `.env` et remplissez vos identifiants Supabase :

```env
DATABASE_URL="postgresql://postgres.[votre-ref]:[votre-password]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres.[votre-ref]:[votre-password]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
```

4. **Générer le client Prisma**
```bash
npx prisma generate
```

5. **Créer les tables dans Supabase**
```bash
npx prisma db push
```

6. **Lancer le serveur de développement**
```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🔐 Configuration additionnelle (Optionnel)

Vous pouvez ajouter vos clés API pour utiliser toutes les fonctionnalités :

- **Stripe** : Pour les paiements
- **OpenAI** : Pour le générateur de contenu IA
- **Resend** : Pour l'envoi d'emails

## 📁 Structure du Projet

```
workhub/
├── prisma/              # Schéma Prisma et migrations
├── public/              # Fichiers statiques
├── src/
│   ├── app/            # Pages Next.js (App Router)
│   │   ├── (auth)/    # Pages d'authentification
│   │   ├── api/       # API Routes
│   │   └── dashboard/ # Interface principale
│   ├── components/     # Composants React réutilisables
│   └── lib/           # Utilitaires et configurations
├── .env.example        # Template des variables d'environnement
├── next.config.js      # Configuration Next.js
├── tailwind.config.ts  # Configuration Tailwind
└── tsconfig.json       # Configuration TypeScript
```

## 🔐 Authentification

L'application utilise NextAuth.js pour l'authentification :

- **Inscription** : `/register`
- **Connexion** : `/login`
- **Dashboard** : `/dashboard` (protégé)

## 💳 Plans d'Abonnement

- **Free** : Fonctionnalités de base
- **Pro** : Toutes les fonctionnalités + IA
- **Enterprise** : Solution sur mesure + support prioritaire

## 🎨 Pages Principales

- `/` - Page d'accueil
- `/login` - Connexion
- `/register` - Inscription
- `/dashboard` - Tableau de bord principal
- `/dashboard/kanban` - Gestion des tâches
- `/dashboard/documents` - Documents collaboratifs
- `/dashboard/crm` - Gestion des contacts
- `/dashboard/email` - Email marketing
- `/dashboard/time` - Suivi du temps
- `/dashboard/analytics` - Analytics
- `/dashboard/automation` - Automatisation
- `/dashboard/ai` - Générateur IA

## 🌐 Déploiement

### Vercel (Recommandé)

1. Push votre code sur GitHub
2. Importez le projet dans Vercel
3. Configurez les variables d'environnement
4. Déployez !

### Autres plateformes

L'application peut être déployée sur n'importe quelle plateforme supportant Next.js :
- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

MIT License - Voir le fichier LICENSE pour plus de détails

## 📧 Contact

Pour toute question ou suggestion, contactez-nous à contact@workhub.com

---

Fait avec ❤️ par l'équipe WorkHub
