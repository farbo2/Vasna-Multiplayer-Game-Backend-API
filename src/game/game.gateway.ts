import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  afterInit(server: any): void {
    console.log('Server initialized');
  }
  handleConnection(client: any): void {
    const { sockets } = this.server.sockets;
    console.log(`Client Id: ${client.id}  connected`);
    console.log(`Online Users: ${sockets.size}`);
    client.emit('pong', { client: client.id });
  }
  handleDisconnect(client: any): void {
    console.log('Client disconnected');
  }
  @SubscribeMessage('ping')
  pingHandler(client: any, data: any) {
    console.log(`${client.id} Said: ${data} `);
    client.emit('pong', { client: client.id });
  }
  @SubscribeMessage('state')
  handleState(client: any, data: any): void {
    client.broadcast.emit('state', data);
  }
}
