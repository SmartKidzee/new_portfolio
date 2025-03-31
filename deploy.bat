@echo off
echo Vite React Vercel Deployment

REM Check if this is a production deployment
if "%1"=="prod" (
    echo Running production deployment...
    powershell -ExecutionPolicy Bypass -File .\deploy.ps1 prod
) else (
    echo Running preview deployment...
    powershell -ExecutionPolicy Bypass -File .\deploy.ps1
)

pause 