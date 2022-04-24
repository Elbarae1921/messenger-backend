import { Socket } from 'socket.io';
import { Event } from './Event';

export class ChatMessageEvent implements Event {
  readonly event = 'chat message';

  constructor(readonly socket: Socket) {
    socket.on(this.event, this.caller);
  }

  private readonly caller = (...args) => {
    this.callback(args[0]);
  };

  public callback(msg: string) {
    console.log('message: ' + msg);
  }
}
