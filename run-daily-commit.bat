@echo off
echo Starting Daily Commit Automation...
cd /d "C:\Users\Rahul\OneDrive\Desktop\PROJECTS\todo"
node daily-commit.js
echo Daily commit completed at %date% %time%
echo.
echo Automation log saved to automation-log.txt
echo %date% %time% - Daily commit automation completed >> automation-log.txt
