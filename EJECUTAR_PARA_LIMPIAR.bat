@echo off
REM Script de limpieza rápido para Metro
REM Ejecuta este archivo directamente (doble clic)

echo.
echo ╔═══════════════════════════════════════╗
echo ║  Limpiador de Metro                   ║
echo ║  Solucionador de Errores SHA-1        ║
echo ╚═══════════════════════════════════════╝
echo.

cd /d "c:\Users\Julian\Desarrollo\rent-a-moto-app\RentAMotoApp"

echo [PASO 1] Deteniendo Metro (si está corriendo)...
timeout /t 2

echo.
echo [PASO 2] Limpiando caché de npm...
call npm cache clean --force 2>nul
echo ✓ Caché limpiado

echo.
echo [PASO 3] Buscando y eliminando carpeta .metro...
if exist ".metro" (
    rmdir /s /q ".metro" 2>nul
    echo ✓ Carpeta .metro eliminada
)

echo.
echo [PASO 4] Buscando y eliminando caché de watchman...
where watchman >nul 2>&1
if %ERRORLEVEL% equ 0 (
    call watchman watch-del-all 2>nul
    echo ✓ Watchman limpiado
) else (
    echo ℹ Watchman no instalado (OK)
)

echo.
echo ═══════════════════════════════════════════════════
echo ✓ LIMPIEZA COMPLETADA
echo ═══════════════════════════════════════════════════
echo.
echo PRÓXIMOS PASOS:
echo.
echo 1. Abre una terminal en CMD (no PowerShell)
echo.
echo 2. Ejecuta:
echo    npm start -- --reset-cache
echo.
echo 3. Espera a que muestre "Compiled successfully"
echo    (puede tardar 1-2 minutos)
echo.
echo 4. En OTRA terminal, ejecuta:
echo    npm run android
echo.
echo 5. La app debería abrirse en el emulador
echo.
echo ═══════════════════════════════════════════════════
echo.
pause
