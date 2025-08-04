# Script to create desktop shortcut for daily commit automation

$WshShell = New-Object -ComObject WScript.Shell
$DesktopPath = [Environment]::GetFolderPath("Desktop")
$ShortcutPath = "$DesktopPath\Daily GitHub Commits.lnk"

$Shortcut = $WshShell.CreateShortcut($ShortcutPath)
$Shortcut.TargetPath = "C:\Users\Rahul\OneDrive\Desktop\PROJECTS\todo\run-daily-commit.bat"
$Shortcut.WorkingDirectory = "C:\Users\Rahul\OneDrive\Desktop\PROJECTS\todo"
$Shortcut.Description = "Run daily GitHub commits with AVII pattern"
$Shortcut.IconLocation = "C:\Windows\System32\shell32.dll,174"  # Git/code icon
$Shortcut.Save()

Write-Host "✅ Desktop shortcut created successfully!" -ForegroundColor Green
Write-Host "📍 Shortcut location: $ShortcutPath" -ForegroundColor Cyan
Write-Host "🎯 Double-click 'Daily GitHub Commits' on your desktop to run!" -ForegroundColor Yellow
