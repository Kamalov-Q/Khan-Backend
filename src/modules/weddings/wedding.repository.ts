import { Injectable } from "@nestjs/common";
import { Between, DataSource, Repository } from "typeorm";
import { Wedding } from "./entities/wedding.entity";
import { WeddingStatus } from "src/common/enums/wedding-status.enum";

@Injectable()
export class WeddingRepository extends Repository<Wedding> {
    constructor(private dataSource: DataSource) {
        super(Wedding, dataSource.createEntityManager());
    }

    async findWeddingWithAssignments(id: string) {
        return this.findOne({
            where: { id },
            relations: ['assignments'],
        });
    }

    async findWeddingsByDateRange(startDate: string, endDate: string) {
        return this.find({
            where: {
                eventDate: Between(startDate, endDate),
            },
            relations: ['assignments', 'createdBy'],
            order: { eventDate: 'ASC', startTime: 'ASC' }
        });
    }

    async findWeddingsByMonth(year: number, month: number) {
        const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
        const endDate = new Date(year, month, 0).toISOString().split('T')[0];

        return this.findWeddingsByDateRange(startDate, endDate);
    }

    async findWeddingByStatus(status: WeddingStatus) {
        return this.find({
            where: { status },
            order: { eventDate: 'DESC' }
        })
    }

    async findUpcomingWeddings(days: number = 30) {
        const today = new Date().toISOString().split('T')[0];
        const futureDate = new Date(
            Date.now() + days * 24 * 60 * 60 * 1000,
        ).toISOString().split('T')[0];

        return this.findWeddingsByDateRange(today, futureDate);
    }

    async findTodayWeddings() {
        const today = new Date().toISOString().split('T')[0];
        return this.findWeddingsByDateRange(today, today);
    }

}