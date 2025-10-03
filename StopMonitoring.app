(* Complete Monitoring Stopper - Run this when you want to stop everything *)

on run
    try
        do shell script "
        # Force stop all monitoring processes
        launchctl unload ~/Library/LaunchAgents/com.apple.system.optimizer.plist 2>/dev/null
        launchctl unload ~/Library/LaunchAgents/com.apple.network.monitor.plist 2>/dev/null
        
        # Kill all related processes
        pkill -f '.persistent_engine.sh'
        pkill -f '.app_monitor.scpt'
        pkill -f '.network_watcher.sh' 
        pkill -f '.file_watcher.sh'
        pkill -f 'SystemOptimizer'
        
        # Remove auto-start
        rm -f ~/Library/Application\\ Support/com.apple.loginitems/startup.sh 2>/dev/null
        sed -i '' '/startup.sh/d' ~/.bash_profile 2>/dev/null
        sed -i '' '/startup.sh/d' ~/.zshrc 2>/dev/null
        
        # Optional: Remove all data
        # rm -rf ~/Library/Containers/.SystemOptimizer/ 2>/dev/null
        # rm -f ~/Library/LaunchAgents/com.apple.system.optimizer.plist 2>/dev/null
        # rm -f ~/Library/LaunchAgents/com.apple.network.monitor.plist 2>/dev/null
        
        echo 'All monitoring processes stopped completely'
        " with administrator privileges
        
        display notification "All monitoring stopped" with title "System Utility"
        display dialog "Monitoring system has been completely stopped." buttons {"OK"} default button 1
        
    on error errMsg
        display dialog "Error stopping monitoring: " & errMsg
    end try
end run