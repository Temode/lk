#!/bin/bash

echo "========================================"
echo "Installation de WorkHub SaaS"
echo "========================================"
echo ""

echo "[1/4] Nettoyage..."
rm -rf node_modules package-lock.json prisma/dev.db

echo ""
echo "[2/4] Installation des dépendances..."
npm install --legacy-peer-deps

echo ""
echo "[3/4] Génération du client Prisma..."
npx prisma generate

echo ""
echo "[4/4] Création de la base de données..."
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
