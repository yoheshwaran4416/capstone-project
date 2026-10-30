# TECHWRITE AI — Instant Public Sharing Link (PowerShell)
Write-Host "=========================================================================" -ForegroundColor Cyan
Write-Host "  TECHWRITE AI — Instant Public Sharing Link" -ForegroundColor White
Write-Host "=========================================================================`n" -ForegroundColor Cyan

$env:PATH = "C:\Users\virtu\AppData\Local\OpenAI\Codex\runtimes\cua_node\fb8898c05a62885e\bin;" + $env:PATH

$ip = (curl.exe -s https://loca.lt/mytunnelpassword).Trim()

Write-Host "Starting public tunnel..." -ForegroundColor Yellow
Write-Host "-------------------------------------------------------------------------" -ForegroundColor Gray
Write-Host "  Copy the public https://xxxx.loca.lt URL that appears below." -ForegroundColor White
Write-Host "  Tunnel Password (if prompted once on first visit): " -NoNewline -ForegroundColor White
Write-Host "$ip" -ForegroundColor Green
Write-Host "-------------------------------------------------------------------------`n" -ForegroundColor Gray

npx localtunnel --port 5000
