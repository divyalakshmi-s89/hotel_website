@echo off
echo ==========================================
echo   🍛 Jeya Hotel - Setup & Start
echo ==========================================
echo.

echo [1/3] Installing Backend dependencies...
cd backend
call npm install
if errorlevel 1 (echo ERROR: Backend install failed & pause & exit)

echo.
echo [2/3] Installing Frontend dependencies...
cd ..\frontend
call npm install
if errorlevel 1 (echo ERROR: Frontend install failed & pause & exit)

echo.
echo [3/3] Checking .env files...
cd ..\backend
if not exist .env (
  copy .env.example .env
  echo   ⚠️  backend\.env created from example - PLEASE EDIT IT!
)
cd ..\frontend
if not exist .env (
  copy .env.example .env
  echo   ⚠️  frontend\.env created from example
)

echo.
echo ==========================================
echo   ✅ Setup Complete!
echo ==========================================
echo.
echo NEXT STEPS:
echo   1. Edit backend\.env with your MongoDB URI and Twilio keys
echo   2. Run start-backend.bat in one terminal
echo   3. Run start-frontend.bat in another terminal
echo.
pause
