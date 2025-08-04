# Auto-commit script for daily updates
param(
    # [string]$Message = "Daily auto-commit: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
)

# Check if we're in a git repository
if (!(Test-Path ".git")) {
    Write-Host "Error: Not in a git repository" -ForegroundColor Red
    exit 1
}

# Add all changes
Write-Host "Adding all changes..." -ForegroundColor Green
git add .

# Check if there are changes to commit
$status = git status --porcelain
if ($status) {
    # Write-Host "Committing changes..." -ForegroundColor Green
    git commit -m $Message
    
    # Push to remote (optional)
    # Write-Host "Pushing to remote..." -ForegroundColor Green
    git push origin master
    
    Write-Host "Auto-commit completed successfully " -ForegroundColor Green
} else {
    Write-Host "No changes to commit." -ForegroundColor Yellow
}
