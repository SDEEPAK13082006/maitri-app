# MAITRI Application - Start All Services (PowerShell)
# Run: powershell -ExecutionPolicy Bypass -File start-all.ps1

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "MAITRI - Starting All Services" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Check if MongoDB is running
$mongoRunning = Get-Process mongod -ErrorAction SilentlyContinue
if (-not $mongoRunning) {
    Write-Host "⚠️  WARNING: MongoDB is not running!" -ForegroundColor Yellow
    Write-Host "Please start MongoDB first or configure MongoDB Atlas" -ForegroundColor Yellow
    Write-Host ""
}

$maitriPath = Split-Path -Parent $MyInvocation.MyCommand.Path

# Start Backend Server (Terminal 1)
Write-Host "Starting Backend Server (Port 5000)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit -Command `"cd '$maitriPath\server'; npm run dev`""

# Wait 3 seconds
Start-Sleep -Seconds 3

# Start AI Service (Terminal 2)
Write-Host "Starting AI Service (Python) (Port 5001)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit -Command `"cd '$maitriPath\ai-service'; python app.py`""

# Wait 3 seconds
Start-Sleep -Seconds 3

# Start Frontend (Terminal 3)
Write-Host "Starting Frontend Client (Port 5173)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit -Command `"cd '$maitriPath\client'; npm run dev`""

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "All services starting..." -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Frontend:    http://localhost:5173" -ForegroundColor Cyan
Write-Host "Backend:     http://localhost:5000" -ForegroundColor Cyan
Write-Host "AI Service:  http://localhost:5001" -ForegroundColor Cyan
Write-Host ""
Write-Host "After all services start, visit:" -ForegroundColor Cyan
Write-Host "http://localhost:5173" -ForegroundColor Yellow
Write-Host ""
