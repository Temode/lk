#!/bin/bash

echo "========================================"
echo "Installation de WorkHub SaaS"
echo "========================================"
echo ""
echo "IMPORTANT: Avez-vous configuré Supabase ?"
echo "Si non, consultez SUPABASE_SETUP.md"
echo ""
read -p "Appuyez sur Entrée pour continuer..."

echo "[1/5] Nettoyage..."
rm -rf node_modules package-lock.json

echo ""
echo "[2/5] Installation des dépendances..."
npm install --legacy-peer-deps

echo ""
echo "[3/5] Génération du client Prisma..."
npx prisma generate

echo ""
echo "[4/5] Vérification du fichier .env..."
if [ ! -f .env ]; then
    echo "ERREUR: Le fichier .env n'existe pas!"
    echo "Copiez .env.example vers .env et configurez vos identifiants Supabase"
    exit 1
fi

echo ""
echo "[5/5] Création des tables dans Supabase..."
npx prisma db push

echo ""
echo "========================================"
echo "Installation terminée avec succès!"
echo "========================================"
echo ""
echo "Pour lancer l'application:"
echo "  npm run dev"
echo ""
echo "Puis ouvrez: http://localhost:3000"
echo ""
