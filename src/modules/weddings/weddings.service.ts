import { BadRequestException, Injectable } from "@nestjs/common";
import { WeddingRepository } from "./wedding.repository";
import { WeddingFinanceService } from "./wedding-finance.service";
import { CreateWeddingDto } from "./dto/create-wedding.dto";
import { Wedding } from "./entities/wedding.entity";
import Decimal from "decimal.js";


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

}