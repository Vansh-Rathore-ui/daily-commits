@echo off
echo Setting up automatic commit task...

REM Create a scheduled task that runs daily at 6 PM
schtasks /create /tn "TodoAutoCommit" /tr "powershell.exe -File \"%~dp0auto-commit.ps1\"" /sc daily /st 18:00 /f

if %errorlevel% equ 0 (
    echo Task created successfully!
    echo The auto-commit will run daily at 6:00 PM
    echo To modify the schedule, use: schtasks /change /tn "TodoAutoCommit" /st [TIME]
    echo To delete the task, use: schtasks /delete /tn "TodoAutoCommit" /f
) else (
    echo Failed to create scheduled task. Please run as administrator.
)

pause
