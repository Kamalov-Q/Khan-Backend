import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { WeddingAssignmentsRepository } from "./wedding-assignments.repository";
import { WeddingFinanceService } from "../weddings/wedding-finance.service";
import { WeddingRepository } from "../weddings/wedding.repository";
import { AssignTeamMembersDto } from "./dto/assign-team-members.dto";
import { WeddingAssignment } from "./entities/wedding-assignment.entity";
import Decimal from "decimal.js";
import { UpdateWeddingAssignmentDto } from "./dto/update-assignment.dto";

@Injectable()
export class WeddingAssignmentsService {
    constructor(
        private assignmentRepository: WeddingAssignmentsRepository,
        private weddingFinanceService: WeddingFinanceService,
        private weddingsRepository: WeddingRepository
    ) { }

    async assignTeamMembers(weddingId: string, assignTeamMembersDto: AssignTeamMembersDto): Promise<WeddingAssignment[]> {
        const wedding = await this.weddingsRepository.findOne({
            where: { id: weddingId }
        });

        if (!wedding) {
            throw new NotFoundException('Wedding not found!');
        }

        const assignments: WeddingAssignment[] = [];

        for (const assignmentDto of assignTeamMembersDto.assignments) {
            if (new Decimal(assignmentDto.paymentAmount).lessThan(0)) {
                throw new BadRequestException('Payment amount cannot be negative!');
            }

            const existing = await this.assignmentRepository.findAssignment(weddingId, assignmentDto.teamMemberId);

            if (existing) {
                throw new ConflictException(`Team member already assigned to this wedding!`);
            }

            const assignment = this.assignmentRepository.create({
                weddingId,
                teamMemberId: assignmentDto.teamMemberId,
                paymentAmount: new Decimal(assignmentDto.paymentAmount).toString(),
                notes: assignmentDto.notes
            });

            const saved = await this.assignmentRepository.save(assignment);
            assignments.push(saved);
        }

        await this.weddingFinanceService.recalculateFinancials(weddingId);

        return assignments;

    }

    async findAssigmentById(id: string): Promise<WeddingAssignment> {
        const assignment = await this.assignmentRepository.findByIdWithRelations(id);

        if (!assignment) {
            throw new NotFoundException('Assignment not found!');
        }

        return assignment;
    }

    async findAssignmentsByWedding(weddingId: string): Promise<WeddingAssignment[]> {
        return this.assignmentRepository.findAssignmentsByWedding(weddingId);
    }

    async findAssignmentsByTeamMember(teamMemberId: string): Promise<WeddingAssignment[]> {
        return this.assignmentRepository.findAssignmentsByTeamMember(teamMemberId);
    }

    async updateAssignment(id: string, dto: UpdateWeddingAssignmentDto): Promise<WeddingAssignment> {
        const assignment = await this.findAssigmentById(id);

        if (
            dto.paymentAmount && new Decimal(dto.paymentAmount).lessThan(0)
        ) {
            throw new BadRequestException('Payment amount cannot be negative!');
        }

        if (dto.paymentAmount) {
            assignment.paymentAmount = new Decimal(dto.paymentAmount).toString();
        }

        Object.assign(assignment, dto);

        const updated = await this.assignmentRepository.save(assignment);

        await this.weddingFinanceService.recalculateFinancials(assignment.weddingId);

        return updated;
    }

    async removeAssignment(id: string): Promise<void> {
        const assignment = await this.findAssigmentById(id);
        const weddingId = assignment.weddingId;

        await this.assignmentRepository.remove(assignment);
        await this.weddingFinanceService.recalculateFinancials(weddingId);
    }

    async getAssignmentsByWeddingWithDetails(weddingId: string) {
        return this.assignmentRepository.findAssignmentsByWedding(weddingId);
    }


}