import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wedding } from "./entities/wedding.entity";
import { WeddingsController } from "./weddings.controller";
import { WeddingsService } from "./weddings.service";
import { WeddingRepository } from "./wedding.repository";
import { WeddingFinanceService } from "./wedding-finance.service";

@Module({
    imports: [TypeOrmModule.forFeature([Wedding])],
    controllers: [WeddingsController],
    providers: [WeddingsService, WeddingRepository, WeddingFinanceService],
    exports: [WeddingsService, WeddingRepository, WeddingFinanceService]
})
export class WeddingsModule { }