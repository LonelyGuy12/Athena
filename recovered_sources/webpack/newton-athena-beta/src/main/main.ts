import path from 'path';
import SemVer from 'semver';
import {
  app,
  BrowserWindow,
  desktopCapturer,
  dialog,
  Event,
  globalShortcut,
  ipcMain,
  powerSaveBlocker,
  shell,
  systemPreferences,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log/main';
import * as Sentry from '@sentry/electron/main';
import { exec } from 'node:child_process';
import { download } from 'electron-dl';
import fs from 'fs';
import { debounce, resolveHtmlPath } from './util';
import {
  IPC_COMMUNICATION_SIGNALS,
  IPC_MAIN_RENDER_COMMUNICATION_SIGNALS,
} from '../constants/signals';
import generateUUID from '../utils/cryptoUtils';
import {
  API_ENDPOINTS,
  APP_ROUTES,
  COMMAND_Q_KEY_COMBINATION,
  FETCH_APPS_LIST,
  ILLEGAL_KEY_COMBINATIONS,
  ONE_SECOND,
  QUERY_PARAMS,
  SYSTEM_EVENTS_APPLE_EVENTS_ERROR_MESSAGE,
  URL_LOAD_FAILURE_ERRORS,
} from '../constants/common';
import getErrorByErrorCode from '../utils/urlFailureUtils';
import { clearClipboard } from '../utils/proctorUtils';
import {
  getAllRunningProcesses,
  getUserLaunchedProcesses,
  isSIPEnabled,
  isSiriEnabled,
  killUserLaunchedProcesses,
} from '../utils/cheatingUtils';
import { fetchUserDetails } from '../apiService/userInfo';
import { SocketClient } from './socket/socketClient';
import { constants } from './socket/constants';
import { clearTimeout } from 'node:timers';

Sentry.init({
  dsn: 'https://dc67273195900dbad6d6313b7e5d1efd@o296331.ingest.us.sentry.io/4507656724545536',
  environment: process.env.NODE_ENV,
  release: process.env.RELEASE_VERSION,
});
log.initialize();

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

log.transports.file.level = 'info';
autoUpdater.logger = log;
let allPermissionGranted: boolean = false;

// Currently there is no way to promise based communicate with a browser tab available in electron
// https://www.electronjs.org/docs/latest/tutorial/ipc#optional-returning-a-reply
const webBrowserCommunicationMessage = new Map<string, object>();

let testWindow: BrowserWindow | null = null;
let webCamWindow: BrowserWindow | null = null;
let screenShareWindow: BrowserWindow | null = null;
let authToken: string = '';
let openURLTimeout: NodeJS.Timeout | null = null;
let deeplinkURL: string | null = null;
let SocketClientSingleton: SocketClient | null = null;
const initTransportObj = {
  url: '',
  method: null,
  headers: null,
  data: null,
};
let dataUploadConfig = {
  screenShare: initTransportObj,
  webCam: initTransportObj,
};
let proctoredLogTransportDataForHeimdall = initTransportObj;
let usingHeimdall: Boolean = false;
let skipInitialChecks: Boolean = false;
let downloadUpdateTerminateTimerId:
  | string
  | number
  | NodeJS.Timeout
  | null
  | undefined = null;

const sendSignalForIllegalKeysCombination = (keyCombination: string) => {
  if (testWindow && !testWindow.isDestroyed()) {
    testWindow.webContents.send(
      IPC_COMMUNICATION_SIGNALS.ILLEGAL_KEYS_COMBINATION_DETECTED,
      keyCombination,
    );
  }
};

async function requestScreenCapturePermission() {
  try {
    const screen = await desktopCapturer.getSources({ types: ['screen'] });
    return screen?.length > 0;
  } catch (e) {
    log.error(e);
    throw e;
  }
}
async function requestWebCamPermission() {
  const initialPermissionStatus =
    systemPreferences.getMediaAccessStatus('camera');

  if (initialPermissionStatus !== 'granted') {
    log.info(
      'fn: requestWebCamPermission(), initial camera permission status',
      initialPermissionStatus,
    );
    Sentry.captureMessage(
      `fn: requestWebCamPermission(), initial camera permission status: ${initialPermissionStatus}`,
    );
  }

  const cameraPermissionGranted =
    await systemPreferences.askForMediaAccess('camera');
  if (!cameraPermissionGranted) {
    return false;
  }
  const cameraPermissionStatus =
    systemPreferences.getMediaAccessStatus('camera');

  const microPhonePermissionGranted =
    await systemPreferences.askForMediaAccess('microphone');
  if (!microPhonePermissionGranted) {
    // This is not a blocking error
    return true;
  }

  log.info(cameraPermissionStatus, 'Status after permission request');
  return cameraPermissionStatus;
}

async function getScreenStream() {
  try {
    return await desktopCapturer.getSources({ types: ['screen'] });
  } catch (e) {
    log.error(e);
    throw e;
  }
}

async function waitForMessageReply(messageID: string) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const intervalID = setInterval(() => {
      if (webBrowserCommunicationMessage.has(messageID)) {
        resolve(webBrowserCommunicationMessage.get(messageID));
        clearInterval(intervalID);
      }
      if (startTime - Date.now() > 2000) {
        clearInterval(intervalID);
        resolve(false);
      }
    }, 500);
  });
}

async function sendMessageToBrowser(
  browser: BrowserWindow,
  type: (typeof IPC_MAIN_RENDER_COMMUNICATION_SIGNALS)[keyof typeof IPC_MAIN_RENDER_COMMUNICATION_SIGNALS],
  data: any,
) {
  const messageID = generateUUID();
  browser.webContents.send(type, { messageID, data });
  await waitForMessageReply(messageID);
  const hasResponse = webBrowserCommunicationMessage.has(messageID);
  if (hasResponse) {
    const response = webBrowserCommunicationMessage.get(messageID);
    webBrowserCommunicationMessage.delete(messageID);
    return response;
  }
  return false;
}

function isAppInstalled(appName = 'Heimdall') {
  const locations = ['/Applications'];

  return locations.some((loc) => {
    const appPath = path.join(loc, `${appName}.app`);
    return fs.existsSync(appPath);
  });
}

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(log.error);
};

const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../assets');

const getAssetPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, ...paths);
};

const setKioskModeWithAlwaysOnTop = () => {
  if (testWindow && !testWindow.isDestroyed()) {
    testWindow.focus();
    testWindow.setKiosk(true);
    testWindow.setAlwaysOnTop(true, 'screen-saver');
  }
};

const resetKioskModeWithAlwaysOnTop = () => {
  if (testWindow && !testWindow.isDestroyed()) {
    testWindow.setKiosk(false);
    testWindow.setAlwaysOnTop(false);
  }
};

const getGenericBrowserWindow = () => {
  testWindow = new BrowserWindow({
    show: true,
    icon: getAssetPath('icon.png'),
    width: 1400,
    height: 800,
    webPreferences: {
      devTools: isDebug,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });
  return testWindow;
};

const createBlockedTestWindow = (appList: string[]) => {
  void getGenericBrowserWindow().loadURL(
    resolveHtmlPath(
      `${APP_ROUTES.TEST_BLOCKED_ROUTE}?${
        QUERY_PARAMS.RESTRICTED_APPS
      }=${appList.join(',')}`,
    ),
  );
};

const createSiriPermissionWindow = () => {
  void getGenericBrowserWindow().loadURL(
    resolveHtmlPath(APP_ROUTES.DISABLE_SIRI_ROUTE),
  );
};

const createSystemEventsPermissionWindow = () => {
  void getGenericBrowserWindow().loadURL(
    resolveHtmlPath(APP_ROUTES.ENABLE_SYSTEM_EVENTS_ROUTE),
  );
};

const createErrorBlockedWindow = (appList: string[]) => {
  if (testWindow && !testWindow.isDestroyed()) {
    testWindow.setKiosk(false);
    testWindow.removeAllListeners();
    testWindow.close();
  }
  void getGenericBrowserWindow().loadURL(
    resolveHtmlPath(
      `${APP_ROUTES.TEST_BLOCKED_ROUTE}?${
        QUERY_PARAMS.RESTRICTED_APPS
      }=${appList.join(',')}&${QUERY_PARAMS.IS_ERROR}=true`,
    ),
  );
};

const createGenericErrorWindow = () => {
  void getGenericBrowserWindow().loadURL(
    resolveHtmlPath(APP_ROUTES.ERROR_ROUTE),
  );
};

const createSIPScreenWindow = () => {
  void getGenericBrowserWindow().loadURL(
    resolveHtmlPath(APP_ROUTES.SIP_INFO_ROUTE),
  );
};

const createErrorUpdateAthenaWindow = () => {
  if (testWindow && !testWindow.isDestroyed()) {
    testWindow.setKiosk(false);
    testWindow.removeAllListeners();
    testWindow.close();
  }
  void getGenericBrowserWindow().loadURL(
    resolveHtmlPath(
      `${APP_ROUTES.UPDATE_ROUTE}?&${QUERY_PARAMS.IS_ERROR}=true`,
    ),
  );
};

const createTestWindow = async (rawTestURL: string) => {
  if (testWindow && !testWindow.isDestroyed()) {
    testWindow.close();
  }
  if (isDebug) {
    await installExtensions();
  }

  clearClipboard();
  // This should force a strict kiosk mode, but it won't work since we don't know beforehand if it's a proctored test or not
  // https://github.com/electron/electron/issues/8426
  // https://github.com/electron/electron/pull/10136
  const parsedUrl = new URL(rawTestURL);
  const params = new URLSearchParams(parsedUrl.search);
  const redirectURL = params.get('redirectURL') || '';
  usingHeimdall = params.get('openHeimdall') === 'true' || false;
  log.info('usingHeimdall', usingHeimdall);
  decodeURIComponent(redirectURL);
  testWindow = new BrowserWindow({
    show: true,
    icon: getAssetPath('icon.png'),
    width: 1400,
    height: 800,
    webPreferences: {
      devTools: isDebug,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  // we will remove this once heimdall is adopted fully
  screenShareWindow = new BrowserWindow({
    show: false,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      webSecurity: false,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  // we will remove this once heimdall is adopted fully
  webCamWindow = new BrowserWindow({
    show: false,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      webSecurity: false,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  testWindow.on('enter-full-screen', () => {
    if (testWindow && !testWindow.isDestroyed()) {
      testWindow.webContents.send(
        IPC_COMMUNICATION_SIGNALS.PAGE_FULLSCREEN_CHANGED,
        true,
      );
    }
  });

  testWindow.on('leave-full-screen', () => {
    resetKioskModeWithAlwaysOnTop();
    if (testWindow && !testWindow.isDestroyed()) {
      testWindow.webContents.send(
        IPC_COMMUNICATION_SIGNALS.PAGE_FULLSCREEN_CHANGED,
        false,
      );
    }
  });

  testWindow.webContents.on('will-navigate', (event) => {
    const newURL = new URL(event.url);
    const testURL = new URL(rawTestURL);
    if (newURL.host !== testURL.host) {
      event.preventDefault();
    }
  });

  testWindow.on('focus', () => {
    if (allPermissionGranted) {
      setKioskModeWithAlwaysOnTop();
    }
    if (testWindow && !testWindow.isDestroyed()) {
      testWindow.webContents.send(
        IPC_COMMUNICATION_SIGNALS.PAGE_FOCUS_CHANGED,
        true,
      );
    }
  });

  testWindow.on('blur', () => {
    if (allPermissionGranted) {
      resetKioskModeWithAlwaysOnTop();
    }
    if (testWindow && !testWindow.isDestroyed()) {
      testWindow.webContents.send(
        IPC_COMMUNICATION_SIGNALS.PAGE_FOCUS_CHANGED,
        false,
      );
    }
  });

  testWindow.on('hide', () => {
    if (testWindow && !testWindow.isDestroyed()) {
      testWindow.webContents.send(
        IPC_COMMUNICATION_SIGNALS.PAGE_VISIBILITY_CHANGED,
        false,
      );
    }
  });

  testWindow.on('show', () => {
    if (testWindow && !testWindow.isDestroyed()) {
      testWindow.webContents.send(
        IPC_COMMUNICATION_SIGNALS.PAGE_VISIBILITY_CHANGED,
        true,
      );
    }
  });

  webCamWindow.on('closed', () => {
    try {
      if (testWindow && !testWindow.isDestroyed()) {
        testWindow.webContents.send(
          IPC_COMMUNICATION_SIGNALS.WEB_CAM_PERMISSION_STATUS_CHANGED,
          false,
        );
      }
      webCamWindow = null;
    } catch (err) {
      log.error(err);
    }
  });

  screenShareWindow?.on('closed', () => {
    try {
      if (testWindow && !testWindow.isDestroyed()) {
        testWindow.webContents.send(
          IPC_COMMUNICATION_SIGNALS.SCREEN_CAPTURE_PERMISSION_STATUS_CHANGED,
          false,
        );
      }
      screenShareWindow = null;
    } catch (err) {
      log.error(err);
    }
  });

  testWindow.webContents.setWindowOpenHandler(() => {
    return { action: 'deny' };
  });

  testWindow.webContents.on('before-input-event', (_event, input) => {
    if ((input.control || input.meta) && input.key === 'q') {
      sendSignalForIllegalKeysCombination(COMMAND_Q_KEY_COMBINATION);
    }
  });

  testWindow.webContents.on('did-fail-load', (_e, ec, ed, url) => {
    const fallbackURL = `${APP_ROUTES.INTERNET_FAILURE_ROUTE}?${QUERY_PARAMS.FAILED_URL}=${url}`;

    log.error(
      `Failed to load URL: ${url} with error code: ${ec} and error description: ${ed}`,
    );

    const error = getErrorByErrorCode(ec);

    if (error.type === URL_LOAD_FAILURE_ERRORS.INTERNET_FAILURE) {
      if (testWindow) {
        log.info(`Redirecting to URL: ${resolveHtmlPath(fallbackURL)}`);
        testWindow.loadURL(resolveHtmlPath(fallbackURL)).catch(log.error);
      }
    }
  });

  const endTest = () => {
    if (!testWindow || testWindow.isDestroyed()) return;
    testWindow.close();
    if (webCamWindow && !webCamWindow.isDestroyed()) {
      webCamWindow.close();
    }
    if (screenShareWindow && !screenShareWindow.isDestroyed()) {
      screenShareWindow.close();
    }
  };

  // This is a hack to check if close request is coming from the browser tab or from the main window
  let mainWindowCloseRequest = false;
  testWindow.on('close', async (e) => {
    if (isDebug) {
      return;
    }
    if (!testWindow || testWindow.isDestroyed()) return;
    const isOnUpdatePage = testWindow?.webContents
      .getURL()
      .includes('#/update');

    const isOnEndTestPage = testWindow.webContents
      .getURL()
      .includes('test-end');

    if (isOnUpdatePage || isOnEndTestPage || mainWindowCloseRequest) {
      mainWindowCloseRequest = false;
      endTest();
    } else if (!mainWindowCloseRequest) {
      e.preventDefault();
      const choice = await dialog.showMessageBox(testWindow, {
        type: 'question',
        buttons: ['Yes', 'No'],
        title: 'Confirm your actions',
        message: 'Do you really want to close the application?',
      });
      if (choice.response === 0) {
        mainWindowCloseRequest = true;
        endTest();
      }
    }
  });
  testWindow.on('closed', () => {
    testWindow = null;
    mainWindowCloseRequest = false;
    clearClipboard();
  });

  void screenShareWindow.loadURL(resolveHtmlPath('screen'));
  void webCamWindow.loadURL(resolveHtmlPath('camera'));
  void testWindow.loadURL(
    resolveHtmlPath(`update/?redirectURL=${encodeURIComponent(rawTestURL)}`),
  );

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
};

const initStepsBeforeCreatingWindowFromURL = async (url: string) => {
  log.info('Received URL:', url);
  try {
    if (webCamWindow && !webCamWindow.isDestroyed()) {
      webCamWindow.removeAllListeners();
      webCamWindow.close();
    }
    if (screenShareWindow && !screenShareWindow.isDestroyed()) {
      screenShareWindow.removeAllListeners();
      screenShareWindow.close();
    }
    if (testWindow && !testWindow.isDestroyed()) {
      testWindow.setKiosk(false);
      testWindow.removeAllListeners();
      testWindow.close();
    }
  } catch (err) {
    log.error(err);
  }

  const testURL = new URL(url);
  let rawTestURL: string;
  if (isDebug) {
    rawTestURL = `http://${testURL.host}${testURL.pathname}${testURL.search}`;
  } else {
    rawTestURL = `https://${testURL.host}${testURL.pathname}${testURL.search}`;
  }
  const parsedUrl = new URL(rawTestURL);
  const params = new URLSearchParams(parsedUrl.search);

  authToken = params.get('authToken') || '';
  skipInitialChecks = params.get('skipInitialChecks') === 'true' || false;

  const userDetails = await fetchUserDetails(authToken);
  Sentry.setUser(userDetails);

  try {
    if (skipInitialChecks) {
      log.info('Skipping initial checks as update page');
      await createTestWindow(rawTestURL);
      return;
    }
    try {
      if (!(await isSIPEnabled())) {
        createSIPScreenWindow();
        return;
      }
    } catch (err) {
      Sentry.captureException(err);
      log.error(err);
    }
    try {
      if (await isSiriEnabled()) {
        createSiriPermissionWindow();
        return;
      }
    } catch (err) {
      Sentry.captureException(err);
      log.error(err);
    }
    try {
      const restrictedApps = await getUserLaunchedProcesses();
      if (restrictedApps && restrictedApps.length > 0) {
        createBlockedTestWindow(restrictedApps);
      } else {
        await createTestWindow(rawTestURL);
      }
    } catch (e) {
      if (e instanceof Error) {
        if (e.message.includes(SYSTEM_EVENTS_APPLE_EVENTS_ERROR_MESSAGE)) {
          createSystemEventsPermissionWindow();
        } else {
          createGenericErrorWindow();
        }
      }
      Sentry.captureException(e);
      log.error(e);
    }
  } catch (e) {
    createGenericErrorWindow();
    Sentry.captureException(e);
    log.error(e);
  }
};

const connectHeimdall = () => {
  SocketClientSingleton = new SocketClient();
  setTimeout(() => {
    SocketClientSingleton?.write(
      JSON.stringify({
        type: constants.SET_HEIMDALL_ON_QUIT_HANDLER,
      }),
    );
  }, 0);
  setTimeout(() => {
    SocketClientSingleton?.write(
      JSON.stringify({
        type: constants.TRANSPORT_OBJECT,
        data: {
          name: constants.HEIMDALL_ON_QUIT_HANDLER_DATA,
          value: proctoredLogTransportDataForHeimdall,
        },
      }),
    );
  }, 2 * ONE_SECOND);
  SocketClientSingleton.setOnDataReceived((data) => {
    switch (data) {
      case constants.HEIMDALL_ACTIVE:
        if (testWindow && !testWindow.isDestroyed()) {
          testWindow.webContents.send(
            IPC_COMMUNICATION_SIGNALS.ON_HEIMDALL_STATUS_CHANGE,
            true,
          );
        }
        break;
      case constants.HEIMDALL_INACTIVE:
        if (testWindow && !testWindow.isDestroyed()) {
          testWindow.webContents.send(
            IPC_COMMUNICATION_SIGNALS.ON_HEIMDALL_STATUS_CHANGE,
            false,
          );
        }
        break;
      default:
        log.error('Unknown message type', data);
    }
  });
  SocketClientSingleton.setOnEnd(() => {
    if (testWindow && !testWindow.isDestroyed()) {
      testWindow.webContents.send(
        IPC_COMMUNICATION_SIGNALS.ON_HEIMDALL_STATUS_CHANGE,
        false,
      );
    }
  });
};

const handleOpenURL = async (event: Event, url: string) => {
  event.preventDefault();

  const splitDataURL = url.split('&');
  const hasOpenHeimdall = splitDataURL[splitDataURL.length - 1];

  if (hasOpenHeimdall.startsWith('launched_by_heimdall')) {
    splitDataURL.pop();
    connectHeimdall();
    deeplinkURL = splitDataURL.join('&');
  } else {
    deeplinkURL = url;
  }

  const userDataPath = app.getPath('userData');
  log.info('deeplinkURL:', deeplinkURL);

  const filePath = path.join(userDataPath, 'shared-data.json');
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  fs.writeFileSync(
    filePath,
    JSON.stringify({ deeplinkURL, time: Date.now() }),
    'utf-8',
  );

  if (openURLTimeout) {
    clearTimeout(openURLTimeout);
    openURLTimeout = null;
  }
  if (!app.isReady()) {
    log.info(`App is not ready, delaying URL handling ${url}`);
    openURLTimeout = setTimeout(() => handleOpenURL(event, url), 500);
    return;
  }
  void initStepsBeforeCreatingWindowFromURL(url);
};

const debouncedHandleDeepLink = debounce(handleOpenURL, 1000);

const renderHomePage = () => {
  testWindow = new BrowserWindow({
    show: true,
    icon: getAssetPath('icon.png'),
    width: 1400,
    height: 800,
    webPreferences: {
      devTools: isDebug,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });
  void testWindow.loadURL(resolveHtmlPath('/'));
  testWindow.on('closed', () => {
    testWindow = null;
  });
};

ipcMain.handle(
  IPC_COMMUNICATION_SIGNALS.GET_RUNNING_RESTRICTED_APPLICATIONS,
  async () => {
    try {
      return getUserLaunchedProcesses();
    } catch (e) {
      log.error(e);
      Sentry.captureException(e);
      return [];
    }
  },
);

ipcMain.handle(
  IPC_MAIN_RENDER_COMMUNICATION_SIGNALS.CHECK_FOR_UPDATES,
  async () => {
    try {
      const res = await autoUpdater.checkForUpdates();
      log.info(res);
      if (res) {
        if (SemVer.gt(res.updateInfo.version, app.getVersion())) {
          downloadUpdateTerminateTimerId = setTimeout(() => {
            createErrorUpdateAthenaWindow();
          }, 20_000);
          return true;
        }
      }
    } catch (e) {
      log.error(e);
      Sentry.captureException(e);
    }
    return false;
  },
);

ipcMain.handle(IPC_COMMUNICATION_SIGNALS.GET_APP_VERSION, async () => {
  return app.getVersion();
});

ipcMain.handle(
  IPC_COMMUNICATION_SIGNALS.DOWNLOAD_HEIMDALL,
  async (event, dmgUrl: string) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) {
      return { success: false, error: 'No window found' };
    }

    try {
      const downloadedItem = await download(win, dmgUrl, {
        directory: app.getPath('downloads'),
        saveAs: false,
        openFolderWhenDone: false,
      });

      const downloadedPath = downloadedItem.getSavePath();

      const openResult = await shell.openPath(downloadedPath);

      if (openResult) {
        log.error('Error opening DMG', openResult);
        return { success: false, error: openResult };
      }

      return { success: true, path: downloadedPath };
    } catch (error: any) {
      log.error('Download error', error);
      return { success: false, error: error.message };
    }
  },
);

ipcMain.handle(IPC_COMMUNICATION_SIGNALS.CHECK_HEIMDALL_INSTALLED, async () => {
  return isAppInstalled('Heimdall');
});

ipcMain.handle(IPC_COMMUNICATION_SIGNALS.STOP_PROCTORING, async () => {
  if (testWindow && !testWindow.isDestroyed()) {
    testWindow.setKiosk(false);
    testWindow.removeAllListeners();
    testWindow.close();
  }

  if (webCamWindow && !webCamWindow.isDestroyed()) {
    webCamWindow.removeAllListeners();
    webCamWindow.close();
  }

  if (screenShareWindow && !screenShareWindow.isDestroyed()) {
    screenShareWindow.removeAllListeners();
    screenShareWindow.close();
  }

  SocketClientSingleton?.write(
    JSON.stringify({
      type: constants.STOP_HEIMDALL,
    }),
  );

  app.quit();
  return true;
});

ipcMain.handle(IPC_COMMUNICATION_SIGNALS.START_FULL_SCREEN, async () => {
  if (testWindow && !testWindow.isDestroyed()) {
    testWindow.setFullScreen(true);
    return true;
  }
  return false;
});

ipcMain.handle(IPC_COMMUNICATION_SIGNALS.STOP_FULL_SCREEN, async () => {
  if (testWindow && !testWindow.isDestroyed()) {
    testWindow.setFullScreen(false);
    return true;
  }
  return false;
});

ipcMain.handle(IPC_COMMUNICATION_SIGNALS.GET_FULL_SCREEN_STATE, async () => {
  if (testWindow && !testWindow.isDestroyed()) {
    return testWindow.isFullScreen();
  }
  return false;
});

ipcMain.handle(IPC_COMMUNICATION_SIGNALS.START_WAKE_LOCK, async () => {
  if (testWindow && !testWindow.isDestroyed()) {
    return powerSaveBlocker.start('prevent-display-sleep');
  }
  return false;
});

ipcMain.handle(
  IPC_COMMUNICATION_SIGNALS.STOP_WAKE_LOCK,
  async (_event, id: number) => {
    if (testWindow && id) {
      powerSaveBlocker.stop(id);
      return true;
    }
    return false;
  },
);

ipcMain.handle(
  IPC_COMMUNICATION_SIGNALS.GET_WAKE_LOCK_STATE,
  async (_event, id: number) => {
    if (testWindow && id) {
      return powerSaveBlocker.isStarted(id);
    }
    return false;
  },
);

ipcMain.handle(IPC_COMMUNICATION_SIGNALS.ENABLE_KIOSK_MODE, async () => {
  if (testWindow && !testWindow.isDestroyed() && !isDebug) {
    testWindow.setKiosk(true);
    return true;
  }
  return false;
});

ipcMain.handle(IPC_COMMUNICATION_SIGNALS.DISABLE_KIOSK_MODE, async () => {
  if (testWindow && !testWindow.isDestroyed()) {
    setTimeout(() => {
      if (testWindow) {
        testWindow.setKiosk(false);
      }
    }, 100);
    return true;
  }
  return false;
});

ipcMain.handle(IPC_COMMUNICATION_SIGNALS.GET_KIOSK_MODE_STATE, async () => {
  if (testWindow && !testWindow.isDestroyed()) {
    return testWindow.isKiosk();
  }
  return false;
});

ipcMain.handle(
  IPC_COMMUNICATION_SIGNALS.GOT_ALL_PERMISSIONS,
  async (_event, flag: boolean) => {
    if (testWindow && !testWindow.isDestroyed()) {
      if (flag) {
        allPermissionGranted = true;
        setKioskModeWithAlwaysOnTop();
      } else {
        allPermissionGranted = false;
        resetKioskModeWithAlwaysOnTop();
      }
      return true;
    }
    return false;
  },
);

ipcMain.handle(
  IPC_COMMUNICATION_SIGNALS.LIST_RUNNING_APPLICATIONS,
  async () => {
    try {
      return getAllRunningProcesses();
    } catch (err) {
      log.error(err);
      Sentry.captureException(err);
      return [];
    }
  },
);

ipcMain.handle(IPC_COMMUNICATION_SIGNALS.GET_USER_INFO, async () => {
  try {
    return fetchUserDetails(authToken);
  } catch (err) {
    log.error(err);
    Sentry.captureException(err);
    return {};
  }
});

ipcMain.on(
  IPC_MAIN_RENDER_COMMUNICATION_SIGNALS.SCREEN_SHARE_PERMISSION_STATUS_CHANGED,
  (_event, permission) => {
    if (testWindow) {
      testWindow.webContents.send(
        IPC_COMMUNICATION_SIGNALS.SCREEN_CAPTURE_PERMISSION_STATUS_CHANGED,
        permission,
      );
    }
  },
);

ipcMain.handle(
  IPC_COMMUNICATION_SIGNALS.SEND_EXAM_MAPPING_DETAILS,
  async (_event, examData: { endTimeStamp: number }) => {
    SocketClientSingleton?.write(
      JSON.stringify({
        type: constants.ACTIVE_TIMESTAMP,
        data: examData?.endTimeStamp,
      }),
    );
    return true;
  },
);

ipcMain.on(
  IPC_MAIN_RENDER_COMMUNICATION_SIGNALS.SEND_MESSAGE_TO_MAIN,
  (_event, message) => {
    webBrowserCommunicationMessage.set(message.messageID, message.data);
  },
);

ipcMain.handle(IPC_COMMUNICATION_SIGNALS.OPEN_HEIMDALL, () => {
  return new Promise((resolve, reject) => {
    exec(
      (process.env.DEBUG_HEIMDALL || 'false') === 'true'
        ? 'cd ../heimdall && PORT=4343 npm start'
        : 'open /Applications/Heimdall.app',
      (error: any) => {
        if (error) {
          log.error('something went wrong while launching Heimdall', error);
          Sentry.captureException(error);
          reject(error);
          return;
        }
        resolve(true);
      },
    );
  });
});

ipcMain.on(IPC_COMMUNICATION_SIGNALS.DATA_UPLOAD_CONFIG, (_event, data) => {
  dataUploadConfig = data;
  setTimeout(() => {
    SocketClientSingleton?.write(
      JSON.stringify({
        type: constants.TRANSPORT_OBJECT,
        data: {
          name: constants.SCREEN_RECORD_VIDEO,
          value: dataUploadConfig.screenShare,
        },
      }),
    );
  }, 4 * ONE_SECOND);
  setTimeout(() => {
    SocketClientSingleton?.write(
      JSON.stringify({
        type: constants.TRANSPORT_OBJECT,
        data: {
          name: constants.WEBCAM_VIDEO,
          value: dataUploadConfig.webCam,
        },
      }),
    );
  }, 6 * ONE_SECOND);
});

ipcMain.on(
  IPC_COMMUNICATION_SIGNALS.SEND_PROCTORED_LOG_TRANSPARENT_DATA_FOR_HEIMDALL,
  (_event, data) => {
    proctoredLogTransportDataForHeimdall = {
      url: `${API_ENDPOINTS.BASE_URL}${data?.requestURL}`,
      method: data?.apiOptions?.method,
      data: data?.apiOptions?.data,
      headers: data?.apiOptions?.headers,
    };
  },
);

ipcMain.handle(IPC_COMMUNICATION_SIGNALS.OPEN_SHUTDOWN_SETTINGS, async () => {
  const cmd = `osascript -e 'do shell script "shutdown -r now" with administrator privileges'`;

  log.info('Restarting mac', cmd);
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      log.info('Failed to restart Mac', error);
      Sentry.captureException(error);
      return;
    }
    log.info(stdout || stderr);
  });
});

ipcMain.handle(
  IPC_COMMUNICATION_SIGNALS.KILLALL_RESTRICTED_APPLICATIONS_RELAUNCH_APP,
  async () => {
    try {
      await killUserLaunchedProcesses(createErrorBlockedWindow);
      if (deeplinkURL !== null) {
        await initStepsBeforeCreatingWindowFromURL(deeplinkURL);
      }
    } catch (err) {
      if (testWindow && !testWindow.isDestroyed()) {
        testWindow.setKiosk(false);
        testWindow.removeAllListeners();
        testWindow.close();
      }
      createGenericErrorWindow();
      log.error('something went wrong', err);
      Sentry.captureException(err);
    }
  },
);

ipcMain.handle(IPC_COMMUNICATION_SIGNALS.CHECK_SIRI_ENABLED, async () => {
  try {
    return isSiriEnabled();
  } catch (err) {
    log.error(err);
    Sentry.captureException(err);
    return false;
  }
});

ipcMain.handle(IPC_COMMUNICATION_SIGNALS.RELAUNCH_APP, async () => {
  try {
    if (deeplinkURL !== null) {
      await initStepsBeforeCreatingWindowFromURL(deeplinkURL);
    } else {
      renderHomePage();
    }
    return true;
  } catch (err) {
    log.error('Failed to relaunch app', err);
    Sentry.captureException(err);
    return false;
  }
});

ipcMain.on(IPC_COMMUNICATION_SIGNALS.OPEN_SIRI_SETTINGS, () => {
  // Try to deep link to Siri settings with multiple fallbacks for different macOS versions
  const cmd =
    'open "x-apple.systempreferences:com.apple.Siri-Settings.extension" || ' +
    'open "x-apple.systempreferences:com.apple.preference.siri" || ' +
    'open -b com.apple.SystemSettings || ' +
    'open -b com.apple.systempreferences';
  exec(cmd, (error, stdout) => {
    if (error) {
      log.error('Failed to open Siri settings', error);
      Sentry.captureException(error);
      return;
    }
    log.info(stdout);
  });
});

ipcMain.on(IPC_COMMUNICATION_SIGNALS.OPEN_SYSTEM_EVENTS_SETTINGS, () => {
  // Open Privacy & Security → Automation pane if possible; fall back to Security pane/System Settings
  const cmd =
    'open "x-apple.systempreferences:com.apple.preference.security?Privacy_Automation" || ' +
    'open "x-apple.systempreferences:com.apple.preference.security" || ' +
    'open -b com.apple.SystemSettings || ' +
    'open -b com.apple.systempreferences';
  exec(cmd, (error, stdout) => {
    if (error) {
      log.error('Failed to open System Events/Automation settings', error);
      Sentry.captureException(error);
      return;
    }
    log.info(stdout);
  });
});

ipcMain.handle(
  IPC_COMMUNICATION_SIGNALS.CHECK_SYSTEM_EVENTS_ENABLED,
  async () => {
    // Attempt a benign AppleScript call to System Events. If not authorized, macOS returns the known error
    return new Promise((resolve) => {
      exec(FETCH_APPS_LIST, (error) => {
        if (error) {
          const msg = (error as any)?.message || '';
          if (msg.includes(SYSTEM_EVENTS_APPLE_EVENTS_ERROR_MESSAGE)) {
            resolve(false);
            return;
          }
          // If another error occurs, conservatively assume not enabled
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  },
);

ipcMain.handle(IPC_COMMUNICATION_SIGNALS.QUIT_APP, () => app.quit());
// -----------------------------------------------------------------------------//
/* not required in heimdall flow */
ipcMain.handle(
  IPC_COMMUNICATION_SIGNALS.CHECK_SCREEN_SHARE_RECORDING_STARTED,
  async (_event, id) => {
    if (screenShareWindow) {
      return sendMessageToBrowser(
        screenShareWindow,
        IPC_MAIN_RENDER_COMMUNICATION_SIGNALS.CHECK_SCREEN_SHARE_RECORDING_STARTED,
        { id },
      );
    }
    return false;
  },
);

ipcMain.handle(
  IPC_COMMUNICATION_SIGNALS.CHECK_WEB_CAM_RECORDING_STARTED,
  async (_event, id) => {
    if (webCamWindow) {
      return sendMessageToBrowser(
        webCamWindow,
        IPC_MAIN_RENDER_COMMUNICATION_SIGNALS.CHECK_WEB_CAM_RECORDING_STARTED,
        { id },
      );
    }
    return false;
  },
);

ipcMain.on(
  IPC_MAIN_RENDER_COMMUNICATION_SIGNALS.WEB_CAM_PERMISSION_STATUS_CHANGED,
  async (_event, id) => {
    if (testWindow) {
      testWindow.webContents.send(
        IPC_COMMUNICATION_SIGNALS.WEB_CAM_PERMISSION_STATUS_CHANGED,
        id,
      );
    }
  },
);

ipcMain.handle(
  IPC_COMMUNICATION_SIGNALS.START_WEB_CAM_SNAPSHOT,
  async (_event, snapshotConfig) => {
    if (webCamWindow) {
      return sendMessageToBrowser(
        webCamWindow,
        IPC_MAIN_RENDER_COMMUNICATION_SIGNALS.START_WEB_CAM_SNAPSHOT,
        snapshotConfig,
      );
    }
    return false;
  },
);

ipcMain.handle(IPC_COMMUNICATION_SIGNALS.START_WEB_CAM_RECORDING, async () => {
  if (webCamWindow && !webCamWindow.isDestroyed()) {
    return sendMessageToBrowser(
      webCamWindow,
      IPC_MAIN_RENDER_COMMUNICATION_SIGNALS.START_WEB_CAM_RECORDING,
      {},
    );
  }
  return false;
});

ipcMain.handle(
  IPC_COMMUNICATION_SIGNALS.STOP_SCREEN_SHARE_SNAPSHOT,
  async (_event, snapshotConfig) =>
    screenShareWindow &&
    sendMessageToBrowser(
      screenShareWindow,
      IPC_MAIN_RENDER_COMMUNICATION_SIGNALS.STOP_SCREEN_SHARE_SNAPSHOT,
      snapshotConfig,
    ),
);

ipcMain.handle(
  IPC_COMMUNICATION_SIGNALS.CAPTURE_AND_SEND_SCREEN_SHARE_SNAPSHOT,
  async (_event, snapshotConfig) =>
    screenShareWindow &&
    !screenShareWindow.isDestroyed() &&
    sendMessageToBrowser(
      screenShareWindow,
      IPC_MAIN_RENDER_COMMUNICATION_SIGNALS.CAPTURE_AND_SEND_SCREEN_SHARE_SNAPSHOT,
      snapshotConfig,
    ),
);

ipcMain.handle(
  IPC_COMMUNICATION_SIGNALS.CAPTURE_AND_SEND_WEB_CAM_SNAPSHOT,
  async (_event, snapshotConfig) =>
    webCamWindow &&
    !webCamWindow.isDestroyed() &&
    sendMessageToBrowser(
      webCamWindow,
      IPC_MAIN_RENDER_COMMUNICATION_SIGNALS.CAPTURE_AND_SEND_WEB_CAM_SNAPSHOT,
      snapshotConfig,
    ),
);

ipcMain.handle(
  IPC_COMMUNICATION_SIGNALS.REQUEST_WEB_CAM_CAPTURE_PERMISSION,
  async () => {
    return requestWebCamPermission();
  },
);

ipcMain.handle(IPC_COMMUNICATION_SIGNALS.RESET_ENVIRONMENT, async () => {
  if (webCamWindow && !webCamWindow.isDestroyed()) {
    webCamWindow.close();
    webCamWindow = null;
  }
  if (screenShareWindow && !screenShareWindow.isDestroyed()) {
    screenShareWindow.close();
    screenShareWindow = null;
  }
  if (testWindow && !testWindow.isDestroyed()) {
    testWindow.setKiosk(false);
  }
  return true;
});

ipcMain.handle(IPC_COMMUNICATION_SIGNALS.GET_WEB_CAM_STREAM, async () => {
  if (webCamWindow) {
    if (!webCamWindow) {
      return { error: 'Webcam window not available' };
    }
    return sendMessageToBrowser(
      webCamWindow,
      IPC_MAIN_RENDER_COMMUNICATION_SIGNALS.GET_WEB_CAM_STREAM,
      {},
    );
  }
  return false;
});

ipcMain.handle(IPC_COMMUNICATION_SIGNALS.GET_SCREEN_STREAM, async () => {
  return getScreenStream();
});

ipcMain.handle(
  IPC_COMMUNICATION_SIGNALS.START_SCREEN_SHARE_RECORDING,
  async (_event, streamId) => {
    return (
      screenShareWindow &&
      sendMessageToBrowser(
        screenShareWindow,
        IPC_MAIN_RENDER_COMMUNICATION_SIGNALS.START_SCREEN_SHARE_RECORDING,
        streamId,
      )
    );
  },
);

ipcMain.handle(
  IPC_COMMUNICATION_SIGNALS.START_SCREEN_SHARE_SNAPSHOT,
  async (_event, snapshotConfig) =>
    screenShareWindow &&
    sendMessageToBrowser(
      screenShareWindow,
      IPC_MAIN_RENDER_COMMUNICATION_SIGNALS.START_SCREEN_SHARE_SNAPSHOT,
      snapshotConfig,
    ),
);

ipcMain.handle(
  IPC_COMMUNICATION_SIGNALS.REQUEST_SCREEN_CAPTURE_PERMISSION,
  () => {
    return requestScreenCapturePermission();
  },
);
// -----------------------------------------------------------------------------//

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient(
      process.env.APPLICATION_DEEP_LINK!,
      process.execPath,
      [path.resolve(process.argv[1])],
    );
  }
} else {
  app.setAsDefaultProtocolClient(process.env.APPLICATION_DEEP_LINK!);
}

autoUpdater.on('download-progress', (progress) => {
  log.info('Download progress', progress);
  if (testWindow && !testWindow.isDestroyed()) {
    testWindow.webContents.send(
      IPC_MAIN_RENDER_COMMUNICATION_SIGNALS.UPDATE_DOWNLOADING_PROGRESS,
      progress.percent,
    );
  }
});

autoUpdater.on('update-downloaded', (info) => {
  log.info('Update downloaded', info);
  if (downloadUpdateTerminateTimerId) {
    clearTimeout(downloadUpdateTerminateTimerId);
  }
  autoUpdater.quitAndInstall();
});

autoUpdater.on('error', (error) => {
  log.error('Error in auto updater', error);
  if (testWindow && !testWindow.isDestroyed()) {
    testWindow.webContents.send(
      IPC_MAIN_RENDER_COMMUNICATION_SIGNALS.UPDATE_ERROR_FAILED,
      error.message,
    );
  }
});

app.on('will-finish-launching', () => {
  log.info('App will finish launching');
  app.on('open-url', debouncedHandleDeepLink);
});

// There is multiple lister for open-url event, so we need to debounce it. The Reason for two listeners is that if not done this way, the app failed to open when the user hit a deep link on the first launch
app.on('open-url', debouncedHandleDeepLink);

app
  .whenReady()
  .then(() => {
    ILLEGAL_KEY_COMBINATIONS.forEach((keyCombination) => {
      globalShortcut.register(keyCombination, () => {
        sendSignalForIllegalKeysCombination(keyCombination);
      });
    });
    app.on('activate', () => {
      log.info('App activated Done');
      if (!app.isInApplicationsFolder() && !isDebug) {
        app.moveToApplicationsFolder();
      }
      if (testWindow === null) renderHomePage();
    });
    return true;
  })
  .catch(log.error);
