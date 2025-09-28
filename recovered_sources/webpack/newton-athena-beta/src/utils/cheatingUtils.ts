import { exec } from 'child_process';
import { ObjectEncodingOptions } from 'node:fs';
import { ExecOptions } from 'node:child_process';
import log from 'electron-log';
import * as Sentry from '@sentry/electron/main';
import getRestrictedApps from '../apiService/restricted-apps';
import {
  allowedAppsList as allowedAppsListConstant,
  devAllowedAppsList,
  FETCH_APPS_BACKGROUND,
  FETCH_APPS_LIST,
  FETCH_APPS_WINDOWED,
  FETCH_SIP_STATUS,
  MISSING_VALUE_PLACEHOLDER,
  SIRI_ENABLED_STATUS,
} from '../constants/common';
import getEnableSipCheck from '../apiService/enable-sip-check';

// exec options
const execOptions: ObjectEncodingOptions & ExecOptions = {
  encoding: 'utf8',
};

// report SIP status
export function isSIPEnabled(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    exec(FETCH_SIP_STATUS, execOptions, async (error, stdout) => {
      if (error) {
        reject(error);
        return;
      }
      log.info('SIP status: ', stdout.trim());
      const systemDetectedSIPValue =
        stdout.trim().split(':')[1].trim() === 'enabled.';
      log.info('system detected SIP value : ', systemDetectedSIPValue);
      const enableSIPCheck = await getEnableSipCheck();
      log.info('enable SIP check value from BE: ', enableSIPCheck);
      resolve(enableSIPCheck ? true : systemDetectedSIPValue);
    });
  });
}

// get user launched GUI processes
export async function getUserLaunchedProcesses(): Promise<string[]> {
  try {
    const windowedAppsList: string[] = await new Promise((resolve, reject) => {
      exec(FETCH_APPS_WINDOWED, execOptions, (error, stdout) => {
        if (error) {
          reject(error);
          return;
        }
        const processList = stdout.trim().split(', ');
        if (processList[0] === MISSING_VALUE_PLACEHOLDER) {
          processList.pop();
          Sentry.captureMessage(stdout.trim(), 'info');
        }
        resolve(processList);
      });
    });

    const backgroundAppsList: string[] = await new Promise(
      (resolve, reject) => {
        exec(FETCH_APPS_BACKGROUND, execOptions, (error, stdout) => {
          if (error) {
            reject(error);
            return;
          }
          const processList = stdout.trim().split(', ');
          if (processList[0] === MISSING_VALUE_PLACEHOLDER) {
            processList.pop();
            Sentry.captureMessage(stdout.trim(), 'info');
          }
          resolve(processList);
        });
      },
    );
    const restrictedAppList = await getRestrictedApps();

    const backgroundRestrictedAppList = backgroundAppsList.filter(
      (app: string) => restrictedAppList.includes(app),
    );

    const processList = [...windowedAppsList, ...backgroundRestrictedAppList];

    const allowedAppsList = [...allowedAppsListConstant];

    if (process.env.NODE_ENV === 'development') {
      allowedAppsList.push(...devAllowedAppsList);
    }

    return processList.filter((process) => !allowedAppsList.includes(process));
  } catch (e) {
    log.error('Error getting user launched processes:', e);
    throw new Error(e as string);
  }
}

// kill user launched GUI processes
export function killUserLaunchedProcesses(
  createErrorBlockedWindow: (appList: string[]) => void,
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    (async function __IIFE() {
      try {
        const attempts = 5; // repeat 3-5 times; choosing 5 for robustness
        const delayMs = 300; // small delay between attempts
        const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

        for (let i = 0; i < attempts; i += 1) {
          const processList = await getUserLaunchedProcesses();
          if (processList.length === 0) {
            resolve(true);
            return;
          }

          // Kill current snapshot of processes and await completion (ignore individual kill errors)
          await Promise.all(
            processList.map(
              (process) =>
                new Promise<void>((res) => {
                  exec(`pkill -15 ${process}`, execOptions, () => res());
                }),
            ),
          );

          if (i < attempts - 1) {
            await sleep(delayMs);
          }
        }

        // Final check after all attempts
        const remaining = await getUserLaunchedProcesses();
        if (remaining.length === 0) {
          resolve(true);
        } else {
          reject(
            new Error(
              `Failed to kill all restricted processes after multiple attempts: ${remaining.join(
                ', ',
              )}`,
            ),
          );
          createErrorBlockedWindow(remaining);
        }
      } catch (e) {
        reject(e);
      }
    })();
  });
}

// get all running processes
export function getAllRunningProcesses(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    exec(FETCH_APPS_LIST, execOptions, (error, stdout) => {
      if (error) {
        reject(error);
        return;
      }
      const processList = stdout.trim().split(', ');
      if (processList[0] === MISSING_VALUE_PLACEHOLDER) {
        processList.pop();
        Sentry.captureMessage(stdout.trim(), 'info');
      }
      resolve(processList);
    });
  });
}

// siri enabled or not
export function isSiriEnabled(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    exec(SIRI_ENABLED_STATUS, execOptions, (error, stdout) => {
      if (error) {
        reject(error);
      }
      resolve(stdout.trim() === '1');
    });
  });
}
