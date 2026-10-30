@echo off
set "PATH=C:\Users\virtu\AppData\Local\OpenAI\Codex\runtimes\cua_node\fb8898c05a62885e\bin;%PATH%"
echo =========================================================================
echo   TECHWRITE AI - Instant Public Sharing Link
echo =========================================================================
echo.

echo [1/2] Checking local server...
start /b py code/post1/app.py >nul 2>&1

echo [2/2] Generating secure public URL...
echo.
echo -------------------------------------------------------------------------
echo   1. Copy the public URL that appears below (e.g. https://xxxx.loca.lt)
echo   2. On first visit, localtunnel asks for your IP password:
curl.exe -s https://loca.lt/mytunnelpassword
echo.
echo   3. Enter the IP number above and click 'Click to Submit'!
echo -------------------------------------------------------------------------
echo.

npx localtunnel --port 5000
