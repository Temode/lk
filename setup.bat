@echo off
echo ========================================
echo Installation de WorkHub SaaS
echo ========================================
echo.

echo [1/4] Nettoyage...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
if exist prisma\dev.db del prisma\dev.db

echo.
echo [2/4] Installation des dependances...
call npm install --legacy-peer-deps

echo.
echo [3/4] Generation du client Prisma...
call npx prisma generate

echo.
echo [4/4] Creation de la base de donnees...
call npx prisma db push

echo.
echo ========================================
echo Installation terminee avec succes!
echo ========================================
echo.
echo Pour lancer l'application:
echo   npm run dev
echo.
echo Puis ouvrez: http://localhost:3000
echo.
pause
