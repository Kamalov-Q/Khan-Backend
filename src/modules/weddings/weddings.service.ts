import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { WeddingRepository } from "./wedding.repository";
import { WeddingFinanceService } from "./wedding-finance.service";
import { CreateWeddingDto } from "./dto/create-wedding.dto";
import { Wedding } from "./entities/wedding.entity";
import Decimal from "decimal.js";
import { UpdateWeddingDto } from "./dto/update-wedding.dto";
import { WeddingStatus } from "src/common/enums/wedding-status.enum";


@Injectable()
export class WeddingsService {
    constructor(
        private readonly weddingsRepository: WeddingRepository,
        private readonly weddingFinanceService: WeddingFinanceService
    ) { }

    async createWedding(createWeddingDto: CreateWeddingDto,
        createdById: string,
    ): Promise<Wedding> {
        if (new Decimal(createWeddingDto.totalPrice).lessThan(0)) {
            throw new BadRequestException('Total price cannot be negative');
        }

        const wedding = this.weddingsRepository.create({
            ...createWeddingDto,
            totalPrice: new Decimal(createWeddingDto.totalPrice).toString(),
            createdById,
        });

        return this.weddingsRepository.save(wedding);
    }

    async findWeddingById(id: string): Promise<Wedding> {
        const wedding = await this.weddingsRepository.findWeddingWithAssignments(id);

        if (!wedding) {
            throw new NotFoundException('Wedding not found');
        }

        return wedding;
    }

    async getWeddingsByDateRange(startDate: string, endDate: string): Promise<Wedding[]> {
        return this.weddingsRepository.findWeddingsByDateRange(startDate, endDate);
    }

    async getWeddingByMonth(year: number, month: number): Promise<Wedding[]> {
        return this.weddingsRepository.findWeddingsByMonth(year, month);
    }

    async getWeddingsForDay(date: string): Promise<Wedding[]> {
        return this.weddingsRepository.findWeddingsByDateRange(date, date);
    }

    async getAllWeddings(page: number = 1, limit: number = 10) {
        return this.weddingsRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            relations: ['assignments'],
            order: {
                eventDate: 'DESC',
            }
        })
    }

    async updateWedding(id: string, dto: UpdateWeddingDto): Promise<Wedding> {
        const wedding = await this.findWeddingById(id);

        if (
            dto.totalPrice && new Decimal(dto.totalPrice).lessThan(0)
        ) {
            throw new BadRequestException('Total price cannot be negative');
        }

        Object.assign(wedding, dto);
        const saved = await this.weddingsRepository.save(wedding);

        await this.weddingFinanceService.recalculateFinancials(id);

        return this.findWeddingById(id);
    }

    async deleteWedding(id: string): Promise<void> {
        const wedding = await this.findWeddingById(id);
        wedding.status = WeddingStatus.CANCELLED;
        await this.weddingsRepository.save(wedding);
    }

    async getTodayWeddings(): Promise<Wedding[]> {
        return this.weddingsRepository.findTodayWeddings();
    }

    async getUpcomingWeddings(days: number = 30): Promise<Wedding[]> {
        return this.weddingsRepository.findUpcomingWeddings(days);
    }

    async getWeddingsByStatus(status: WeddingStatus): Promise<Wedding[]> {
        return this.weddingsRepository.findWeddingByStatus(status);
    }


}