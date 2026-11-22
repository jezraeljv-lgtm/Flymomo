@echo off
chcp 65001 >nul
title FlyMomo 3.0 - Lanzador con Control Remoto DJI
color 0b

echo =========================================================================
echo                  FLYMOMO 3.0 - SIMULADOR DRON AGRÍCOLA
echo              Iniciador Automático para Control Remoto DJI USB
echo =========================================================================
echo.
echo [1/2] Verificando conexión USB Tipo-C del control DJI...
echo       (Asegúrate de tener el control encendido y con Depuración USB activa)
echo.
echo [2/2] Iniciando puente de telemetría y abriendo simulador 3D...
echo.

start "" "%~dp0DJI_RC_Bridge.exe"

exit
