import { Module } from "@nestjs/common";
import { WeddingsModule } from "../weddings/weddings.module";
import { WeddingAssigmentsModule } from "../wedding-assignments/wedding-assignments.module";
import { CalendarController } from "./calendar.controller";
import { CalendarService } from "./calendar.service";


@Module({
    imports: [WeddingsModule, WeddingAssigmentsModule],
    controllers: [CalendarController],
    providers: [CalendarService]
})
export class CalendarModule { }