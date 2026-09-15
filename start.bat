@echo off
setlocal
cd /d "%~dp0"

echo ===================================================
echo   Starting Argus-Mono Control System
echo   SinglePass3D Continuous Drone Photogrammetry
echo ===================================================

REM Check Python availability
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not found in PATH. Please install Python 3.10+ and add to PATH.
    pause
    exit /b 1
)

REM Check Node.js availability
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not found in PATH. Please install Node.js 18+ and add to PATH.
    pause
    exit /b 1
)

echo [1/2] Launching Argus Backend API Server on http://localhost:8080 ...
start "Argus Backend (Port 8080)" cmd /k "python backend\scripts\serve_viewer.py --port 8080 --no-browser"

timeout /t 2 /nobreak >nul

echo [2/2] Launching Frontend Interface on http://localhost:5173 ...
cd /d "%~dp0frontend"
start "Argus Frontend (Vite)" cmd /k "npm run dev"

echo.
echo ===================================================
echo   Argus-Mono is up and running!
echo   - Backend API: http://localhost:8080
echo   - Frontend UI: http://localhost:5173
echo ===================================================
echo.
pause
