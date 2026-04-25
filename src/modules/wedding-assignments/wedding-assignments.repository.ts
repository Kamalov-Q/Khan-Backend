import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { WeddingAssignment } from "./entities/wedding-assignment.entity";

@Injectable()
export class WeddingAssignmentsRepository extends Repository<WeddingAssignment> {
    constructor(private dataSource: DataSource) {
        super(WeddingAssignment, dataSource.createEntityManager());
    }

    async findAssignmentsByWedding(weddingId: string) {
        return this.find({
            where: { weddingId },
            relations: ['teamMember'],
        });
    }

    async findAssignmentsByTeamMember(teamMemberId: string) {
        return this.find({
            where: { teamMemberId },
            relations: ['wedding'],
            order: { createdAt: 'DESC' }
        });
    }

    async findAssignment(weddingId: string, teamMemberId: string) {
        return this.findOne({
            where: { weddingId, teamMemberId },
            relations: ['wedding', 'teamMember'],
        });
    }

    async findByIdWithRelations(id: string) {
        return this.findOne({
            where: { id },
            relations: ['wedding', 'teamMember']
        });
    }


}