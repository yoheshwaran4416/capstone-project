# CAPSTONE 62 — Local Execution & Dashboard Launcher (PowerShell)
Write-Host "=========================================================================" -ForegroundColor Cyan
Write-Host "  CAPSTONE 62 — Technical Blog Writing Series for Developers" -ForegroundColor White
Write-Host "  Starting Local Test Suite & Web Portal..." -ForegroundColor Cyan
Write-Host "=========================================================================`n" -ForegroundColor Cyan

Write-Host "[1/3] Running All Automated Tests (pytest)..." -ForegroundColor Yellow
py -m pytest code/post1/test_app.py automation/test_reminder_workflow.py -v

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n[ERROR] Tests failed with code $LASTEXITCODE" -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "`n[2/3] Opening Interactive Portal in default browser..." -ForegroundColor Yellow
Start-Process "http://127.0.0.1:5000"

Write-Host "`n[3/3] Starting Flask Application on http://127.0.0.1:5000 ..." -ForegroundColor Green
Write-Host "Press Ctrl+C to terminate the local server.`n" -ForegroundColor Gray
py code/post1/app.py
