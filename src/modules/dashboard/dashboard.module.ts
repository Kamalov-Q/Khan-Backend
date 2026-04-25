import { Module } from "@nestjs/common";
import { WeddingsModule } from "../weddings/weddings.module";
import { WeddingAssigmentsModule } from "../wedding-assignments/wedding-assignments.module";
import { MembersModule } from "../members/members.module";
import { DashboardController } from "./dashboard.controller";
import { DashboardService } from "./dashboard.service";

@Module({
    imports: [WeddingsModule, WeddingAssigmentsModule, MembersModule],
    controllers: [DashboardController],
    providers: [DashboardService]
})
export class DashboardModule { }