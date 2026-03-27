@echo off
REM MAITRI Application - Start All Services
REM Run this batch file to start all three services in separate terminals

echo.
echo ====================================
echo MAITRI - Starting All Services
echo ====================================
echo.

REM Check if MongoDB is running
echo Checking MongoDB...
tasklist | find /i "mongod" >nul
if errorlevel 1 (
    echo WARNING: MongoDB is not running!
    echo Please start MongoDB first or configure MongoDB Atlas
    echo.
)

REM Start Backend Server (Terminal 1)
echo Starting Backend Server (Port 5000)...
start cmd /k "cd %CD%\server && npm run dev"

REM Wait 3 seconds
timeout /t 3 /nobreak

REM Start AI Service (Terminal 2)
echo Starting AI Service (Python) (Port 5001)...
start cmd /k "cd %CD%\ai-service && python app.py"

REM Wait 3 seconds
timeout /t 3 /nobreak

REM Start Frontend (Terminal 3)
echo Starting Frontend Client (Port 5173)...
start cmd /k "cd %CD%\client && npm run dev"

echo.
echo ====================================
echo All services starting...
echo ====================================
echo.
echo Frontend:   http://localhost:5173
echo Backend:   http://localhost:5000
echo AI Service: http://localhost:5001
echo.
echo After all services start, visit:
echo http://localhost:5173
echo.
pause
