@echo off
echo ========================================================
echo   Starting SpendWise - Student Expense Tracker...
echo ========================================================
echo.

IF NOT EXIST "node_modules\" (
    echo [1/2] Installing dependencies for the first time...
    call npm install
    echo.
)

echo [2/2] Launching SpendWise local web server...
call npm run dev

pause
