import { URL } from 'url';
import path from 'path';

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(
      `http://localhost:${port}${htmlFileName ? `/#/${htmlFileName}` : '/'}`,
    );

    return url.href;
  }
  return `file://${path.resolve(
    __dirname,
    `../renderer/index.html/#/${htmlFileName}`,
  )}`;
}

// should execute the function in the start of the event loop
export function debounce(func: any, timeout = 300) {
  let timer: any;
  let executed = false;
  return (...args: any) => {
    clearTimeout(timer);
    if (!executed) {
      func(...args);
      executed = true;
    }
    timer = setTimeout(() => {
      executed = false;
    }, timeout);
  };
}
