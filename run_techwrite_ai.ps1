# TECHWRITE AI — Local Execution & Dashboard Launcher (PowerShell)
Write-Host "=========================================================================" -ForegroundColor Cyan
Write-Host "  TECHWRITE AI — CAPSTONE 62 Developer Publication & REST API" -ForegroundColor White
Write-Host "  Starting Local Test Suite & Web Publication..." -ForegroundColor Cyan
Write-Host "=========================================================================`n" -ForegroundColor Cyan

$env:PATH = "C:\Users\virtu\AppData\Local\OpenAI\Codex\runtimes\cua_node\fb8898c05a62885e\bin;" + $env:PATH

Write-Host "[1/4] Running Automated Tests (44 Tests across pytest & unittest)..." -ForegroundColor Yellow
py -m pytest code/post1/test_app.py automation/test_reminder_workflow.py -v
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n[ERROR] Pytest suite failed with code $LASTEXITCODE" -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "Running Article 1, 2, and 3 unittest verification suites..." -ForegroundColor Yellow
py code/articles_code/article1_functions.py
py code/articles_code/article2_mistakes.py
py code/articles_code/article3_unittest.py

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n[ERROR] Article unittest suites failed." -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "`n[2/4] Verifying Frontend Production Build..." -ForegroundColor Yellow
npm run build

Write-Host "`n[3/4] Opening TECHWRITE AI in default browser..." -ForegroundColor Yellow
Start-Process "http://127.0.0.1:5000"

Write-Host "`n[4/4] Starting Flask Backend & Static Server on http://127.0.0.1:5000 ..." -ForegroundColor Green
Write-Host "Press Ctrl+C to terminate the local server.`n" -ForegroundColor Gray
py code/post1/app.py
