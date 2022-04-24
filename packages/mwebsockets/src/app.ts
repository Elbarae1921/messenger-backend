import { Server, Socket } from 'socket.io';
import { ChatMessageEvent } from './events/ChatMessage';
import { DisconnectEvent } from './events/Disconnect';
import { SocketManager } from './helpers/SocketManager';

export class App {
  private io: Server;
  private socketManager: SocketManager;
  private readonly events = [DisconnectEvent, ChatMessageEvent];

  constructor() {
    this.socketManager = new SocketManager();
    this.io = new Server({ cors: { origin: '*' } });

    this.io.on('connection', socket => {
      this.socketManager.addSocket(socket);
      console.log('a user connected');
      this.applyEvents(socket);
    });
  }

  public start(port: number) {
    this.io.listen(port);
  }

  private applyEvents(socket: Socket) {
    for (const event of this.events) {
      new event(socket, this.socketManager);
    }
  }
}
