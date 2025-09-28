import config from '../config.json';

export const APP_ROUTES = {
  HOME: '',
  SCREEN_CAPTURE_ROUTE: 'screen',
  CAMERA_CAPTURE_ROUTE: 'camera',
  UPDATE_ROUTE: 'update',
  INTERNET_FAILURE_ROUTE: 'internet-failure',
  SIP_INFO_ROUTE: 'sip_info',
  DISABLE_SIRI_ROUTE: 'disable_siri',
  TEST_BLOCKED_ROUTE: 'blocked',
  ENABLE_SYSTEM_EVENTS_ROUTE: 'enable_system_events',
  ERROR_ROUTE: 'error',
};

export const QUERY_PARAMS = {
  FAILED_URL: 'failedUrl',
  RESTRICTED_APPS: 'restrictedApps',
  MESSAGE: 'message',
  IS_ERROR: 'isError',
};

export const WINDOW_EVENTS = {
  ONLINE: 'online',
  OFFLINE: 'offline',
};

export const URL_LOAD_FAILURE_ERRORS = {
  INTERNET_FAILURE: 'internet-failure',
  UNKNOWN: 'unknown',
};

export const ILLEGAL_KEY_COMBINATIONS = [
  'Super+Alt+Space',
  'Command+Space',
  'Option+Space',
  'Command+Control+F',
  'Command+W',
];

export const COMMAND_Q_KEY_COMBINATION = 'Command+Q';

export const API_ENDPOINTS = {
  BASE_URL: config.NEWTON_BASE_URL,
  ATHENA_RESTRICTED_APPS: '/api/v1/proctor_logs/athena_restricted_apps/',
  ENABLE_SIP_CHECK: `/api/v1/config/public_constant/n/NEWTON_ATHENA_ENABLE_SIP_CHECK`,
  USER_ME: '/api/v1/user/me/',
};

export const FETCH_APPS_WINDOWED = `osascript -e 'tell application "System Events" to get name of every process whose background only is false'`;

export const FETCH_APPS_BACKGROUND = `osascript -e 'tell application "System Events" to get name of every process whose background only is true'`;

export const FETCH_SIP_STATUS = `csrutil status`;

export const SIRI_ENABLED_STATUS = `defaults read com.apple.assistant.support "Assistant Enabled"`;

export const FETCH_APPS_LIST = `osascript -e 'tell application "System Events" to get name of every process'`;

export const allowedAppsList = [
  'Google Chrome',
  'Newton Athena',
  'Finder',
  'Heimdall',
  'Safari',
  'Firefox',
  'Microsoft Edge',
  'Opera',
  'Brave Browser',
  'Arc',
];

export const devAllowedAppsList = ['Electron', 'webstorm', 'Slack', 'Terminal'];

export const ENV = {
  PROD: 'production',
  DEV: 'development',
};

export const ONE_SECOND = 1000;

// Error messages
export const SYSTEM_EVENTS_APPLE_EVENTS_ERROR_MESSAGE =
  'Not authorised to send Apple events to System Events';

export const MISSING_VALUE_PLACEHOLDER = 'missing value';
