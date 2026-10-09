@echo off
setlocal
cd /d "%~dp0"
set "legendrium_node=node"
where node >nul 2>nul
if errorlevel 1 set "legendrium_node=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if not "%legendrium_node%"=="node" if not exist "%legendrium_node%" (
  echo Node.js was not found. Install Node.js LTS, reopen your terminal, and try again.
  exit /b 1
)
if not exist "node_modules\vite\bin\vite.js" (
  echo Project dependencies are missing. Run npm install in this folder first.
  exit /b 1
)
echo Building Legendrium...
"%legendrium_node%" "node_modules\vite\bin\vite.js" build
if errorlevel 1 exit /b 1
if /i "%~1"=="--build" exit /b 0
echo Open http://127.0.0.1:3000/heroes.html
echo Press Ctrl+C to stop the server.
"%legendrium_node%" "server.js"
exit /b %errorlevel%
