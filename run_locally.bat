@echo off
set "PATH=C:\Users\virtu\AppData\Local\OpenAI\Codex\runtimes\cua_node\fb8898c05a62885e\bin;%PATH%"
echo =========================================================================
echo   CAPSTONE 62 — TECHWRITE AI Developer Publication & REST API
echo   Starting Local Development Server & Test Suite...
echo =========================================================================
echo.

echo [1/3] Running All Automated Tests (pytest & unittest)...
py -m pytest code/post1/test_app.py automation/test_reminder_workflow.py -v
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Test suite failed!
    pause
    exit /b %ERRORLEVEL%
)

py code/articles_code/article1_functions.py
py code/articles_code/article2_mistakes.py
py code/articles_code/article3_unittest.py

echo.
echo [2/3] Launching Web Portal in default browser...
start http://127.0.0.1:5000

echo.
echo [3/3] Starting Application Server on http://127.0.0.1:5000 ...
echo Press Ctrl+C in this terminal to stop the server anytime.
echo.
py code/post1/app.py
pause
