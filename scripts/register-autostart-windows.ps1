# PowerShell script to register the application for autostart on Windows

$applicationPath = "C:\Path\To\Your\Application\shop-guard-floating-ledger.exe"  # Change this to the actual path of your application
$taskName = "ShopGuardFloatingLedger"

# Check if the task already exists
$existingTask = Get-ScheduledTask | Where-Object { $_.TaskName -eq $taskName }

if ($existingTask) {
    Write-Host "Task '$taskName' already exists. Updating the task..."
    # Update the existing task to point to the new application path
    $action = New-ScheduledTaskAction -Execute $applicationPath
    $trigger = New-ScheduledTaskTrigger -AtStartup
    $settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

    # Register the updated task
    Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -User "SYSTEM" -Force
} else {
    Write-Host "Creating new task '$taskName' for autostart..."
    # Create a new scheduled task
    $action = New-ScheduledTaskAction -Execute $applicationPath
    $trigger = New-ScheduledTaskTrigger -AtStartup
    $settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

    # Register the new task
    Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -User "SYSTEM"
}

Write-Host "Autostart registration completed."