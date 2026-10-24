@echo off
echo ========================================================
echo   Iniciando Projeto Roteiros de Estudo no Docker
echo ========================================================
echo Construindo imagem Docker...
docker build -t roteiro-estudo-app .

echo.
echo Iniciando servidor Next.js na porta 3000...
echo http://localhost:3000
echo Pressione Ctrl+C na janela para parar o servidor.
echo.

docker run --rm -it -p 3000:3000 -v "%cd%:/app" -v /app/node_modules roteiro-estudo-app
pause
