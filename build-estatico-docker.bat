@echo off
echo ========================================================
echo   Gerando Build via Docker
echo ========================================================

docker build -t roteiro-estudo-app .
docker run --rm -v "%cd%:/app" -v /app/node_modules roteiro-estudo-app npm run build

echo.
pause
