
            Set WshShell = CreateObject("WScript.Shell")
            WshShell.Run "excel.exe "downloads/BCS_DevelopmentComponents.xml"", 1, False
            WScript.Sleep 2000
            WshShell.SendKeys "{ENTER}"
            