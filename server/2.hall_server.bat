set MAIN_JS=%~dp0\hall_server\app.js
set CONFIG=%~dp0\configs_win.js
call node.exe %MAIN_JS% %CONFIG%
pause