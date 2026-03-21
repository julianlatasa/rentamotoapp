@echo off
REM Script para limpiar el proyecto y resolver errores de Metro
REM ==========================================================

echo.
echo ========================================
echo  Solucionador de Errores Metro
echo ========================================
echo.

cd /d "c:\Users\Julian\Desarrollo\rent-a-moto-app\RentAMotoApp"

echo [1/5] Limpiando caché de npm...
call node node_modules/.bin/npm cache clean --force
if %ERRORLEVEL% neq 0 echo Aviso: npm cache clean no disponible directamente

echo.
echo [2/5] Eliminando carpeta node_modules...
rmdir /s /q node_modules
if exist node_modules (
    echo Aviso: No se pudo eliminar completamente node_modules
)

echo.
echo [3/5] Eliminando package-lock.json...
if exist package-lock.json (
    del package-lock.json
    echo Eliminado package-lock.json
)

echo.
echo [4/5] Limpiando caché de watchman (si está instalado)...
where watchman >nul 2>&1
if %ERRORLEVEL% equ 0 (
    watchman watch-del-all
    echo Watchman limpiado
) else (
    echo Watchman no está instalado (OK)
)

echo.
echo [5/5] Reinstalando dependencias...
call node -e "console.log('Node disponible')"
echo Instala nuevamente con: npm install

echo.
echo ========================================
echo  Limpiar completado!
echo ========================================
echo.
echo Próximos pasos:
echo 1. Ejecuta: npm install
echo 2. Luego: npm start -- --reset-cache
echo 3. O si usas Android: npm run android
echo.
pause
