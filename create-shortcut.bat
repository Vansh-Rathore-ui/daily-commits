@echo off
echo Creating desktop shortcut for Daily GitHub Commits...

powershell -Command "& {$WshShell = New-Object -ComObject WScript.Shell; $DesktopPath = [Environment]::GetFolderPath('Desktop'); $ShortcutPath = Join-Path $DesktopPath 'Daily GitHub Commits.lnk'; $Shortcut = $WshShell.CreateShortcut($ShortcutPath); $Shortcut.TargetPath = 'C:\Users\Rahul\OneDrive\Desktop\PROJECTS\todo\run-daily-commit.bat'; $Shortcut.WorkingDirectory = 'C:\Users\Rahul\OneDrive\Desktop\PROJECTS\todo'; $Shortcut.Description = 'Run daily GitHub commits with AVII pattern'; $Shortcut.IconLocation = 'C:\Windows\System32\shell32.dll,174'; $Shortcut.Save()}"

echo.
echo ✅ Desktop shortcut created successfully!
echo 📍 Look for "Daily GitHub Commits" icon on your desktop
echo 🎯 Double-click it to run your daily commits!
echo.
pause
