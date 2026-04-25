import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WeddingAssignment } from "./entities/wedding-assignment.entity";
import { WeddingsModule } from "../weddings/weddings.module";
import { WeddingAssignmentsController } from "./wedding-assignments.controller";
import { WeddingAssignmentsService } from "./wedding-assignments.service";
import { WeddingAssignmentsRepository } from "./wedding-assignments.repository";

@Module({
    imports: [TypeOrmModule.forFeature([WeddingAssignment]), WeddingsModule],
    controllers: [WeddingAssignmentsController],
    providers: [WeddingAssignmentsService, WeddingAssignmentsRepository],
    exports: [WeddingAssignmentsService, WeddingAssignmentsRepository]
})
export class WeddingAssigmentsModule { }