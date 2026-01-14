@echo off
echo ========================================
echo Installation de WorkHub SaaS
echo ========================================
echo.
echo IMPORTANT: Avez-vous configure Supabase ?
echo Si non, consultez SUPABASE_SETUP.md
echo.
pause

echo [1/5] Nettoyage...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

echo.
echo [2/5] Installation des dependances...
call npm install --legacy-peer-deps

echo.
echo [3/5] Generation du client Prisma...
call npx prisma generate

echo.
echo [4/5] Verification du fichier .env...
if not exist .env (
    echo ERREUR: Le fichier .env n'existe pas!
    echo Copiez .env.example vers .env et configurez vos identifiants Supabase
    pause
    exit /b 1
)

echo.
echo [5/5] Creation des tables dans Supabase...
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
