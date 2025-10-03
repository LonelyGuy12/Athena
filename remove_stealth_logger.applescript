(* Complete Stealth System Removal *)

on run
    try
        do shell script "
        # Stop all monitoring processes
        pkill -f '.log_engine' 2>/dev/null || true
        pkill -f '.network_monitor' 2>/dev/null || true  
        pkill -f '.process_monitor' 2>/dev/null || true
        pkill -f '.fs_monitor' 2>/dev/null || true
        pkill -f '.input_monitor' 2>/dev/null || true
        
        # Unload launch agent
        launchctl unload ~/Library/LaunchAgents/com.apple.system.logger.plist 2>/dev/null || true
        
        # Remove all files
        rm -rf ~/Library/Containers/.SystemLogs/ 2>/dev/null || true
        rm -f ~/Library/LaunchAgents/com.apple.system.logger.plist 2>/dev/null || true
        
        # Clear temporary files
        rm -f /tmp/previous_procs.txt 2>/dev/null || true
        rm -f /tmp/current_procs.txt 2>/dev/null || true
        " with administrator privileges
        
        display notification "Stealth monitoring completely removed" with title "Cleanup Complete"
        
    on error errMsg
        display dialog "Error during cleanup: " & errMsg
    end try
end run