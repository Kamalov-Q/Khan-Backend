import { AssignmentStatus } from "src/common/enums/assignment-status.enum";

export class AssignmentResponseDto {
    id: string;
    weddingId: string;
    teamMemberId: string;
    paymentAmount: number;
    assignmentStatus: AssignmentStatus;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}