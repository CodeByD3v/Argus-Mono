@echo off
cd /d "%~dp0"
echo Starting Traffic Operations Control Room...
set ELECTRON_RUN_AS_NODE=
call npx electron .
if %errorlevel% neq 0 (
  echo Starting Standalone Window Fallback...
  start msedge --app="http://localhost:5173" --window-size=1536,960
)
