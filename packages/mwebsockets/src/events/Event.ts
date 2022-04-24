import { Socket } from 'socket.io';

export abstract class Event {
  abstract readonly socket: Socket;
  abstract readonly event: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract callback(...args: any[]): void;
}
