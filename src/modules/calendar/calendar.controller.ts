import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { CalendarService } from "./calendar.service";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/common/enums/user-role.enum";
import { createResponse } from "src/common/utils/response.util";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { User } from "../users/entities/user.entity";


@ApiTags('Calendar')
@Controller('calendar')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class CalendarController {
    constructor(private readonly calendarService: CalendarService) { }

    @Get('admin/range')
    @Roles(UserRole.ADMIN)
    async getAdminCalendarRange(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string
    ) {
        const weddings = await this.calendarService.getAdminCalendarRange(startDate, endDate);
        return createResponse(weddings);
    }

    @Get('admin/day')
    @Roles(UserRole.ADMIN)
    async getAdminDayView(@Query('date') date: string) {
        const weddings = await this.calendarService.getAdminDayView(date);
        return createResponse(weddings);
    }

    @Get('admin/month')
    @Roles(UserRole.ADMIN)
    async getAdminMonthView(
        @Query('year') year: number,
        @Query('month') month: number
    ) {
        const weddings = await this.calendarService.getAdminMonthView(year, month);
        return createResponse(weddings);
    }

    @Get('me/range')
    @Roles(UserRole.ADMIN)
    async getTeamMemberCalendarRange(
        @CurrentUser() user: User,
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string
    ) {
        const assignments = await this.calendarService.getTeamMemberCalendar(user.id, startDate, endDate);
        return createResponse(assignments);
    }

    @Get('me/:weddingId')
    @Roles(UserRole.ADMIN)
    async getTeamMemberEvent(
        @CurrentUser() user: User,
        @Param('weddingId') weddingId: string
    ) {
        const event = await this.calendarService.getTeamMemberEvent(user.id, weddingId);
        return createResponse(event);
    }


}