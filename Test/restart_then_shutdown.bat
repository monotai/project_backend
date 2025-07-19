@echo off
:: Create a self-deleting auto shutdown script in Startup folder
set "SHUTDOWN_SCRIPT=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\auto_shutdown.bat"

(
echo @echo off
echo timeout /t 10 /nobreak ^> nul
echo shutdown /s /t 0
echo del "%%~f0"
) > "%SHUTDOWN_SCRIPT%"

:: Restart the computer
shutdown /r /t 5