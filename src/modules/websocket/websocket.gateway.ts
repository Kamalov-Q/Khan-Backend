import { Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'
import { UsersService } from "../users/users.service";
import { WebsocketService } from "./websocket.service";

@WebSocketGateway({
    cors: { origin: '*' },
    namespace: 'socket.io'
})
@Injectable()
export class WeddingGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private logger = new Logger('WeddingGateway');

    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
        private websocketService: WebsocketService
    ) {
        this.websocketService.setServer(this.server);
    }

    async handleConnection(client: Socket) {
        try {
            const token = client.handshake.auth.token;

            if (!token) {
                client.disconnect();
                return;
            }

            const payload = this.jwtService.verify(token);
            const user = await this.usersService.findById(payload.sub);

            if (!user || !user.isActive) {
                client.disconnect();
                return;
            }

            // JOin user room
            client.join(`user:${user?.id}`);

            // Admin users join admin room
            if (user.role === 'ADMIN') {
                client.join('admin');
            }

            this.logger.log(`Client ${client?.id} connected - User: ${user?.id}`);
            client.emit('connected', { userId: user.id, role: user.role });
        } catch (error) {
            this.logger.error(`Connection error: ${error.message}`);
            client.disconnect();
        }
    }

    async handleDisconnect(client: Socket) {
        this.logger.log(`Client ${client?.id} disconnected`);
    }

    @SubscribeMessage('subscribe:wedding')
    subscribeToWedding(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { weddingId: string }
    ) {
        client.join(`wedding:${data?.weddingId}`);
        this.logger.log(`Client ${client?.id} subscribed to wedding ${data?.weddingId}`);
    }

    @SubscribeMessage('unsubscribe:wedding')
    unsubscribeFromWedding(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { weddingId: string }
    ) {
        client.leave(`wedding:${data?.weddingId}`);
        this.logger.log(`Client ${client?.id} unsubscribed from wedding ${data?.weddingId}`);
    }

    @SubscribeMessage('ping')
    handlePing(@ConnectedSocket() client: Socket): void {
        client.emit('pong');
    }
}