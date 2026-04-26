import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiQuery } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { CalendarService } from "./calendar.service";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/common/enums/user-role.enum";
import { createResponse } from "src/common/utils/response.util";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { User } from "../users/entities/user.entity";
import { WeddingResponseDto } from "../weddings/dto/wedding-response.dto";
import { AssignmentResponseDto } from "../wedding-assignments/dto/assignment-response.dto";


@ApiTags('Calendar')
@Controller('calendar')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class CalendarController {
    constructor(private readonly calendarService: CalendarService) { }

    @Get('admin/range')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Get calendar view for a date range (Admin only)' })
    @ApiQuery({ name: 'startDate', example: '2026-06-01' })
    @ApiQuery({ name: 'endDate', example: '2026-06-30' })
    @ApiResponse({ status: 200, description: 'Weddings retrieved successfully', type: [WeddingResponseDto] })
    async getAdminCalendarRange(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string
    ) {
        const weddings = await this.calendarService.getAdminCalendarRange(startDate, endDate);
        return createResponse(weddings);
    }

    @Get('admin/day')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Get calendar view for a specific day (Admin only)' })
    @ApiQuery({ name: 'date', example: '2026-06-15' })
    @ApiResponse({ status: 200, description: 'Weddings retrieved successfully', type: [WeddingResponseDto] })
    async getAdminDayView(@Query('date') date: string) {
        const weddings = await this.calendarService.getAdminDayView(date);
        return createResponse(weddings);
    }

    @Get('admin/month')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Get calendar view for a specific month (Admin only)' })
    @ApiQuery({ name: 'year', example: 2026 })
    @ApiQuery({ name: 'month', example: 6 })
    @ApiResponse({ status: 200, description: 'Weddings retrieved successfully', type: [WeddingResponseDto] })
    async getAdminMonthView(
        @Query('year') year: number,
        @Query('month') month: number
    ) {
        const weddings = await this.calendarService.getAdminMonthView(year, month);
        return createResponse(weddings);
    }

    @Get('me/range')
    @Roles(UserRole.ADMIN, UserRole.MEMBER)
    @ApiOperation({ summary: 'Get current user calendar assignments for a date range' })
    @ApiQuery({ name: 'startDate', example: '2026-06-01' })
    @ApiQuery({ name: 'endDate', example: '2026-06-30' })
    @ApiResponse({ status: 200, description: 'Assignments retrieved successfully', type: [AssignmentResponseDto] })
    async getTeamMemberCalendarRange(
        @CurrentUser() user: User,
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string
    ) {
        const assignments = await this.calendarService.getTeamMemberCalendar(user.id, startDate, endDate);
        return createResponse(assignments);
    }

    @Get('me/:weddingId')
    @Roles(UserRole.ADMIN, UserRole.MEMBER)
    @ApiOperation({ summary: 'Get specific event details for the current user' })
    @ApiResponse({ status: 200, description: 'Event retrieved successfully' })
    async getTeamMemberEvent(
        @CurrentUser() user: User,
        @Param('weddingId') weddingId: string
    ) {
        const event = await this.calendarService.getTeamMemberEvent(user.id, weddingId);
        return createResponse(event);
    }
}