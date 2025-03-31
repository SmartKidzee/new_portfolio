# Vite React Vercel Deployment Script

# Check if Vercel CLI is installed
$vercelInstalled = $null
try {
    $vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
} catch {
    # Command not found
}

if (-not $vercelInstalled) {
    Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

# Build the project first to ensure it works
Write-Host "Building project..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Fix the errors before deploying." -ForegroundColor Red
    exit 1
}

# Deploy based on argument
if ($args.Count -gt 0 -and $args[0] -eq "prod") {
    Write-Host "Deploying to production..." -ForegroundColor Green
    vercel --prod
} else {
    Write-Host "Deploying to preview environment..." -ForegroundColor Blue
    vercel
}

Write-Host "Deployment complete!" -ForegroundColor Green 