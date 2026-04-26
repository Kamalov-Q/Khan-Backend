import { Injectable } from "@nestjs/common";
import { Server } from 'socket.io'

@Injectable()
export class WebsocketService {
    private server: Server;

    setServer(server: Server) {
        this.server = server;
    }

    emitToAdmin(event: string, data: any) {
        this.server.to('admin').emit(event, data);
    }

    emitToTeamMember(userId: string, event: string, data: any) {
        this.server.to(`user:${userId}`).emit(event, data);
    }

    emitToWedding(weddingId: string, event: string, data: any) {
        this.server.to(`wedding:${weddingId}`).emit(event, data);
    }

    notifyAssignmentUpdate(teamMemberId: string, event: string, data: any) {
        this.server.to(`user:${teamMemberId}`).emit(event, data);
    }

    broadcastWeddingUpdate(event: string, data: any, assignedTeamMemberIds?: string[]) {
        this.server.to('admin').emit(event, data);

        if (assignedTeamMemberIds) {
            for (const memberId of assignedTeamMemberIds) {
                this.server.to(`user:${memberId}`).emit(event, data);
            }
        }

    }


}