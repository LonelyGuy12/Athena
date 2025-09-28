/* eslint import/prefer-default-export: off */
import net from 'net';
import log from 'electron-log/main';
import fs from 'fs';

const socketPath = `/tmp/heimdall.sock`;

export class SocketClient {
  private client!: net.Socket;

  private onDataReceived: ((data: string) => void) | undefined;

  private onEnd: (() => void) | undefined;

  constructor() {
    const id = setInterval(() => {
      if (fs.existsSync(socketPath)) {
        clearInterval(id);
        this.client = net.connect(socketPath, () => {
          log.info('connected to socket server');
        });
        this.client.on('data', (data) => {
          log.info('received data from heimdall', data.toString());
          const dataString = data.toString();
          this.onDataReceived?.(dataString);
        });
        this.client.on('end', () => {
          log.info('Disconnected from server');
          this.onEnd?.();
        });
      }
    }, 1000);
  }

  setOnDataReceived(callback: (data: string) => void) {
    this.onDataReceived = callback;
  }

  setOnEnd(callback: () => void) {
    this.onEnd = callback;
  }

  write(data: string) {
    if (!this.client) {
      setTimeout(() => this.write(data), 1000);
    } else {
      this.client.write(data);
    }
  }
}
