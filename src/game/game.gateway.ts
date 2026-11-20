import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { Server, Socket } from 'socket.io';

interface SocketUser {
  id: number;
  role?: string;
}

type AuthenticatedSocket = Socket & { data: { user?: SocketUser } };

@WebSocketGateway({
  cors: {
    origin: (process.env.CORS_ORIGINS || '').split(',').map((value) => value.trim()).filter(Boolean),
  },
  maxHttpBufferSize: 16 * 1024,
})
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private readonly logger = new Logger(GameGateway.name);

  constructor(private readonly jwtService: JwtService) {}

  afterInit(): void {
    this.logger.log('Game socket gateway initialized');
  }

  async handleConnection(client: AuthenticatedSocket): Promise<void> {
    const token = this.extractToken(client);
    if (!token) {
      client.disconnect(true);
      return;
    }

    try {
      const payload = await this.jwtService.verifyAsync<Record<string, unknown>>(token);
      const rawId = payload.sub ?? payload.userId ?? payload.id;
      const id = typeof rawId === 'number' ? rawId : Number(rawId);
      if (!Number.isSafeInteger(id) || id <= 0) throw new Error('Invalid user identity');
      client.data.user = { id, role: typeof payload.role === 'string' ? payload.role : undefined };
      this.logger.log(`Authenticated socket ${client.id} for user ${id}`);
      client.emit('connected', { userId: id });
    } catch {
      client.disconnect(true);
    }
  }

  handleDisconnect(client: AuthenticatedSocket): void {
    this.logger.debug(`Socket disconnected: ${client.id}`);
  }

  @SubscribeMessage('ping')
  pingHandler(client: AuthenticatedSocket): void {
    if (!client.data.user) return;
    client.emit('pong', { client: client.id, userId: client.data.user.id });
  }

  @SubscribeMessage('state')
  handleState(client: AuthenticatedSocket, data: unknown): void {
    if (!client.data.user || !data || typeof data !== 'object' || Array.isArray(data)) return;
    const serialized = JSON.stringify(data);
    if (serialized.length > 12 * 1024) return;

    client.broadcast.emit('state', {
      userId: client.data.user.id,
      state: data,
    });
  }

  private extractToken(client: Socket): string | null {
    const authToken = client.handshake.auth?.token;
    if (typeof authToken === 'string' && authToken.trim()) return authToken.trim();
    const authorization = client.handshake.headers.authorization;
    if (typeof authorization === 'string' && authorization.startsWith('Bearer ')) {
      return authorization.slice(7).trim() || null;
    }
    return null;
  }
}
