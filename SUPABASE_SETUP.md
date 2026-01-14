# 🚀 Guide de Configuration Supabase

Ce guide vous explique comment configurer Supabase pour votre application WorkHub.

## 📋 Étape 1: Créer un compte Supabase

1. Allez sur [https://supabase.com](https://supabase.com)
2. Cliquez sur **"Start your project"**
3. Connectez-vous avec GitHub (recommandé) ou Email

## 🆕 Étape 2: Créer un nouveau projet

1. Une fois connecté, cliquez sur **"New Project"**
2. Remplissez les informations :
   - **Name**: `workhub` (ou le nom de votre choix)
   - **Database Password**: Créez un mot de passe fort (GARDEZ-LE PRÉCIEUSEMENT !)
   - **Region**: Choisissez la région la plus proche de vous
   - **Pricing Plan**: Sélectionnez **"Free"** (gratuit)
3. Cliquez sur **"Create new project"**
4. Attendez 1-2 minutes que le projet soit créé

## 🔑 Étape 3: Récupérer vos identifiants de connexion

### Option A: URL de connexion directe (Recommandé)

1. Dans votre projet Supabase, allez dans **Settings** (⚙️ en bas à gauche)
2. Cliquez sur **Database**
3. Scrollez jusqu'à **"Connection string"**
4. Sélectionnez l'onglet **"URI"**
5. Copiez l'URL qui ressemble à :
   ```
   postgresql://postgres.[project-ref]:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
   ```
6. **IMPORTANT**: Remplacez `[YOUR-PASSWORD]` par le mot de passe que vous avez créé à l'étape 2

### Option B: Connection Pooler (Pour production)

1. Dans **Settings > Database**
2. Sous **"Connection Pooling"**, copiez l'URL avec **Transaction mode**
3. Cette URL ressemble à :
   ```
   postgresql://postgres.[project-ref]:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
   ```

## ⚙️ Étape 4: Configurer votre fichier .env

1. Ouvrez le fichier `.env` dans votre projet
2. Remplacez les lignes `DATABASE_URL` et `DIRECT_URL` avec vos URLs Supabase

### Exemple de configuration :

```env
# Database Supabase (PostgreSQL)
DATABASE_URL="postgresql://postgres.abcdefghijklmnop:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres.abcdefghijklmnop:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="workhub-secret-key-change-this-in-production-2025"

# Stripe (optionnel)
STRIPE_SECRET_KEY="sk_test_your_key_here"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_key_here"

# OpenAI (optionnel)
OPENAI_API_KEY="sk-your_openai_key_here"

# Resend (optionnel)
RESEND_API_KEY="re_your_resend_key_here"
EMAIL_FROM="noreply@workhub.com"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 🗄️ Étape 5: Créer les tables dans Supabase

Une fois que vous avez configuré votre `.env`, exécutez ces commandes :

```bash
# 1. Générer le client Prisma
npx prisma generate

# 2. Créer toutes les tables dans Supabase
npx prisma db push
```

Cette commande va automatiquement créer toutes les tables nécessaires dans votre base de données Supabase !

## ✅ Étape 6: Vérifier que tout fonctionne

1. Dans votre dashboard Supabase, allez dans **Table Editor** (📊 à gauche)
2. Vous devriez voir toutes les tables créées :
   - users
   - accounts
   - sessions
   - workspaces
   - projects
   - tasks
   - documents
   - contacts
   - campaigns
   - etc.

## 🔍 Étape 7: Gérer vos données

Vous pouvez maintenant :

- **Voir vos données** : Table Editor dans Supabase
- **Exécuter des requêtes SQL** : SQL Editor dans Supabase
- **Gérer les utilisateurs** : Authentication dans Supabase
- **Voir les logs** : Logs dans Supabase

## 🎉 C'est terminé !

Votre application est maintenant connectée à Supabase ! Vous pouvez :

```bash
# Lancer l'application
npm run dev
```

Puis ouvrez [http://localhost:3000](http://localhost:3000)

## 🆘 Problèmes courants

### ❌ Erreur "P1001: Can't reach database server"

**Solution** : Vérifiez que :
1. Votre mot de passe dans `.env` est correct
2. Vous avez bien remplacé `[YOUR-PASSWORD]`
3. L'URL est complète et sans espaces

### ❌ Erreur "Invalid connection string"

**Solution** :
1. Assurez-vous que l'URL commence par `postgresql://`
2. Vérifiez qu'il n'y a pas d'espaces dans l'URL
3. Le mot de passe doit être encodé (pas de caractères spéciaux non échappés)

### ❌ Erreur de timeout

**Solution** :
1. Vérifiez votre connexion internet
2. Supabase peut être en maintenance (vérifiez [status.supabase.com](https://status.supabase.com))
3. Essayez de redémarrer votre projet Supabase dans le dashboard

## 📚 Ressources utiles

- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Prisma + Supabase](https://www.prisma.io/docs/guides/database/supabase)
- [Tutoriels Supabase](https://supabase.com/docs/guides/getting-started)

## 💡 Conseils Pro

1. **Sauvegardez votre mot de passe** dans un gestionnaire de mots de passe
2. **Ne commitez JAMAIS** votre fichier `.env` sur GitHub
3. **Utilisez des variables d'environnement** sur Vercel/Netlify pour le déploiement
4. **Activez Row Level Security (RLS)** dans Supabase pour plus de sécurité
5. **Configurez les backups** dans les paramètres Supabase

---

Besoin d'aide ? Créez une issue sur GitHub ou consultez la documentation !
