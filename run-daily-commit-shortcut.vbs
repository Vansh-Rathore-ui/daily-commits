Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\Users\Rahul\OneDrive\Desktop\PROJECTS\todo"
WshShell.Run "run-daily-commit.bat", 1, True
