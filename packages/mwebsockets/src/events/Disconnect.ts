import { Socket } from 'socket.io';
import { SocketManager } from '../helpers/SocketManager';
import { Event } from './Event';

export class DisconnectEvent implements Event {
  readonly event = 'disconnect';

  constructor(readonly socket: Socket, private readonly socketManager: SocketManager) {
    socket.on(this.event, this.caller);
  }

  private readonly caller = () => {
    this.callback();
  };

  public callback() {
    console.log('user disconnected');
    this.socketManager.removeSocket(this.socket);
  }
}
