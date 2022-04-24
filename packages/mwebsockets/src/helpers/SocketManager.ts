import { Socket } from 'socket.io';

export class SocketManager {
  private sockets: Socket[] = [];

  public addSocket(socket: Socket) {
    this.sockets.push(socket);
  }

  public removeSocket(socket: Socket) {
    this.sockets = this.sockets.filter(s => s.id !== socket.id);
  }

  public getSockets(): Socket[] {
    return this.sockets;
  }
}
