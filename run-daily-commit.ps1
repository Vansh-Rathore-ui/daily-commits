# Daily Commit Automation Script
# Run this daily to maintain GitHub activity with AVII pattern

$scriptPath = "C:\Users\Rahul\OneDrive\Desktop\PROJECTS\todo"
$logFile = "$scriptPath\automation-log.txt"

# Change to project directory
Set-Location -Path $scriptPath

# Log start time
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
"[$timestamp] Starting daily commit automation..." | Out-File -FilePath $logFile -Append

try {
    # Run the daily commit script
    $output = node daily-commit.js 2>&1
    
    # Log success
    "[$timestamp] Daily commit completed successfully" | Out-File -FilePath $logFile -Append
    $output | Out-File -FilePath $logFile -Append
    
    Write-Host "✅ Daily commit automation completed successfully!" -ForegroundColor Green
    Write-Host "📊 Check your GitHub profile for updated activity" -ForegroundColor Cyan
    
} catch {
    # Log error
    "[$timestamp] ERROR: $($_.Exception.Message)" | Out-File -FilePath $logFile -Append
    Write-Host "❌ Error during daily commit: $($_.Exception.Message)" -ForegroundColor Red
}

"[$timestamp] Automation finished" | Out-File -FilePath $logFile -Append
"" | Out-File -FilePath $logFile -Append
