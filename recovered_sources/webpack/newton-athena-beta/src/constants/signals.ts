export const IPC_COMMUNICATION_SIGNALS = {
  REQUEST_SCREEN_CAPTURE_PERMISSION: 'request-screen-capture-permission',
  REQUEST_WEB_CAM_CAPTURE_PERMISSION: 'request-webcam-capture-permission',
  REQUEST_FULL_SCREEN_PERMISSION: 'request-full-screen-permission',
  GET_WEB_CAM_STREAM: 'get-webcam-stream',
  GET_AUDIO_STREAM: 'get-audio-stream',
  GET_SCREEN_STREAM: 'get-screen-stream',
  START_WEB_CAM_RECORDING: 'start-webcam-recording',
  STOP_WEB_CAM_RECORDING: 'stop-webcam-recording',
  START_SCREEN_SHARE_RECORDING: 'start-screen-share-recording',
  STOP_SCREEN_SHARE_RECORDING: 'stop-screen-share-recording',
  START_WEB_CAM_SNAPSHOT: 'start-webcam-snapshot',
  STOP_WEB_CAM_SNAPSHOT: 'stop-webcam-snapshot',
  START_SCREEN_SHARE_SNAPSHOT: 'start-screen-share-snapshot',
  STOP_SCREEN_SHARE_SNAPSHOT: 'stop-screen-share-snapshot',
  BROWSER_WINDOWS_MESSAGE: 'browser-windows-message',
  START_FULL_SCREEN: 'start-full-screen',
  STOP_FULL_SCREEN: 'stop-full-screen',
  START_WAKE_LOCK: 'start-wake-lock',
  STOP_WAKE_LOCK: 'stop-wake-lock',
  ENABLE_KIOSK_MODE: 'enable-kiosk-mode',
  DISABLE_KIOSK_MODE: 'disable-kiosk-mode',
  GET_KIOSK_MODE_STATE: 'get-kiosk-mode-state',
  RESET_ENVIRONMENT: 'reset-environment',
  GET_APP_VERSION: 'get-app-version',
  CAPTURE_AND_SEND_SCREEN_SHARE_SNAPSHOT:
    'capture-and-send-screen-share-snapshot',
  FORCE_FOCUS: 'force-focus',
  CAPTURE_AND_SEND_WEB_CAM_SNAPSHOT: 'capture-and-send-web-cam-snapshot',
  GET_RUNNING_RESTRICTED_APPLICATIONS: 'get-running-restricted-applications',
  KILLALL_RESTRICTED_APPLICATIONS_RELAUNCH_APP:
    'killall-restricted-applications_relaunch_app',
  LIST_RUNNING_APPLICATIONS: 'list-running-applications',
  GET_USER_INFO: 'get-user-info',
  DOWNLOAD_HEIMDALL: 'download-heimdall',
  SEND_PROCTORED_LOG_TRANSPARENT_DATA_FOR_HEIMDALL:
    'send-proctored-log-transparent-data-for-heimdall',
  GOT_ALL_PERMISSIONS: 'got-all-permissions-given',

  // Status Change events
  WEB_CAM_PERMISSION_STATUS_CHANGED: 'webcam-recording-status-changed',
  SCREEN_CAPTURE_PERMISSION_STATUS_CHANGED:
    'screen-capture-recording-status-changed',
  PAGE_FOCUS_CHANGED: 'page-focus-changed',
  PAGE_VISIBILITY_CHANGED: 'page-visibility-changed',
  PAGE_FULLSCREEN_CHANGED: 'page-fullscreen-changed',
  WAKE_LOCK_CHANGED: 'wake-lock-changed',
  KIOSK_MODE_CHANGED: 'kiosk-mode-changed',

  // States events
  GET_FULL_SCREEN_STATE: 'get-full-screen-state',
  GET_WAKE_LOCK_STATE: 'get-wake-lock-state',
  CHECK_SCREEN_SHARE_RECORDING_STARTED: 'check-screen-share-recording-started',
  CHECK_WEB_CAM_RECORDING_STARTED: 'check-webcam-recording-started',
  CHECK_HEIMDALL_INSTALLED: 'check-heimdall-installed',

  STOP_PROCTORING: 'stop-proctoring',

  ILLEGAL_KEYS_COMBINATION_DETECTED: 'illegal-keys-combination-detected',
  ON_HEIMDALL_STATUS_CHANGE: 'on-heimdall-status-changed',
  OPEN_HEIMDALL: 'open-heimdall',
  DATA_UPLOAD_CONFIG: 'data-upload-config',
  SEND_EXAM_MAPPING_DETAILS: 'send-exam-mapping-details',
  OPEN_SIRI_SETTINGS: 'open-siri-settings',
  CHECK_SIRI_ENABLED: 'check-siri-enabled',
  RELAUNCH_APP: 'relaunch-app',
  OPEN_SYSTEM_EVENTS_SETTINGS: 'open-system-events-settings',
  CHECK_SYSTEM_EVENTS_ENABLED: 'check-system-events-enabled',
  OPEN_SHUTDOWN_SETTINGS: 'open-shutdown-settings',
  QUIT_APP: 'quit-app',
};

export const IPC_MAIN_RENDER_COMMUNICATION_SIGNALS = {
  START_SCREEN_SHARE_RECORDING: 'start-screen-share-recording',
  STOP_SCREEN_SHARE_RECORDING: 'stop-screen-share-recording',
  START_SCREEN_SHARE_SNAPSHOT: 'start-screen-share-snapshot',
  STOP_SCREEN_SHARE_SNAPSHOT: 'stop-screen-share-snapshot',
  START_WEB_CAM_RECORDING: 'start-webcam-recording',
  STOP_WEB_CAM_RECORDING: 'stop-webcam-recording',
  START_WEB_CAM_SNAPSHOT: 'start-webcam-snapshot',
  STOP_WEB_CAM_SNAPSHOT: 'stop-webcam-snapshot',
  GET_WEB_CAM_STREAM: 'get-webcam-stream',
  SEND_MESSAGE_TO_MAIN: 'send-message-to-main',
  CAPTURE_AND_SEND_SCREEN_SHARE_SNAPSHOT:
    'capture-and-send-screen-share-snapshot',
  CAPTURE_AND_SEND_WEB_CAM_SNAPSHOT: 'capture-and-send-web-cam-snapshot',

  // stats events
  CHECK_SCREEN_SHARE_RECORDING_STARTED: 'check-screen-share-recording-started',
  CHECK_WEB_CAM_RECORDING_STARTED: 'check-webcam-recording-started',

  // Status Change events
  SCREEN_SHARE_PERMISSION_STATUS_CHANGED:
    'screen-share-permission-status-changed',
  WEB_CAM_PERMISSION_STATUS_CHANGED: 'webcam-permission-status-changed',

  // update events
  CHECK_FOR_UPDATES: 'check-for-updates',
  UPDATE_DOWNLOADING_PROGRESS: 'update-downloading-progress',
  UPDATE_ERROR_FAILED: 'update-error-failed',
};
