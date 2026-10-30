@echo off
setlocal
echo =========================================================================
echo   TECHWRITE AI - CAPSTONE 62 Developer Publication & REST API
echo =========================================================================
echo.

set "PATH=C:\Users\virtu\AppData\Local\OpenAI\Codex\runtimes\cua_node\fb8898c05a62885e\bin;%PATH%"

echo [1/4] Running All Automated Python Tests (44 Tests)...
py -m pytest code/post1/test_app.py automation/test_reminder_workflow.py -q
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Flask & Automation pytest suite failed.
    exit /b %ERRORLEVEL%
)

py code/articles_code/article1_functions.py
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%

py code/articles_code/article2_mistakes.py
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%

py code/articles_code/article3_unittest.py
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%

echo [SUCCESS] 44/44 Tests Passed! (100%% Verified)
echo.

echo [2/4] Building Production Web Bundle...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Build failed.
    exit /b %ERRORLEVEL%
)

echo.
echo [3/4] Launching TECHWRITE AI in default web browser...
start http://127.0.0.1:5000

echo.
echo [4/4] Starting Server on http://127.0.0.1:5000 ...
echo Press Ctrl+C to terminate the local server.
py code/post1/app.py
