---
name: Uninstall Docker
---

### Force

```sh
'C:\Program Files\Docker\Docker\resources\MobyLinux.ps1' -Destroy
$service = Get-WmiObject -Class Win32_Service -Filter "Name='com.docker.service'"
$service.StopService()
$service.Delete()
Start-Sleep -s 5
Remove-Item -Recurse -Force "~/AppData/Local/Docker"
Remove-Item -Recurse -Force "~/AppData/Roaming/Docker"
takeown.exe /F "C:\ProgramData\Docker" /R /A /D Y
icacls "C:\ProgramData\Docker" /T /C /grant Administrators:F
Remove-Item -Recurse -Force "C:\ProgramData\Docker"
Remove-Item -Recurse -Force "C:\Program Files\Docker"
Remove-Item -Recurse -Force "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Docker"
Remove-Item -Force "C:\Users\Public\Desktop\Docker for Windows.lnk"
Get-ChildItem hklm:\software\microsoft\windows\currentversion\uninstall | ForEach-Object {Get-ItemProperty $_.PSPath} | Where-Object { $_.DisplayName -eq "Docker" } | Remove-Item -Recurse -Force
Get-ChildItem hklm:\software\classes\installer\products | ForEach-Object {Get-ItemProperty $_.pspath} | Where-Object { $_.ProductName -eq "Docker" } | Remove-Item -Recurse -Force
Get-Item 'HKLM:\software\Docker Inc.' | Remove-Item -Recurse -Force
Get-ItemProperty -path HKCU:\software\microsoft\windows\currentversion\Run -name "Docker for Windows" | Remove-Item -Recurse -Force
`
```