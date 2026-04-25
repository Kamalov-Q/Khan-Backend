import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { DashboardService } from "./dashboard.service";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/common/enums/user-role.enum";
import { createResponse } from "src/common/utils/response.util";

@ApiTags('Dashboard')
@Controller('dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    @Get('summary')
    @Roles(UserRole.ADMIN)
    async getSummary() {
        const summary = await this.dashboardService.getSummary();
        return createResponse(summary);
    }

    @Get('team-members')
    @Roles(UserRole.ADMIN)
    async getTeamMembersStats() {
        const stats = await this.dashboardService.getTeamMembersStats();
        return createResponse(stats);
    }

    @Get('team-members/:id')
    @Roles(UserRole.ADMIN)
    async getTeamMemberStats(@Param('id') id: string) {
        const stats = await this.dashboardService.getTeamMemberStats(id);
        return createResponse(stats);
    }

    @Get('weddings-chart')
    @Roles(UserRole.ADMIN)
    async getWeddingsChart(
        @Query('groupBy') groupBy: 'day' | 'month' | 'year' = 'month'
    ) {
        const data = await this.dashboardService.getWeddingChartData(groupBy);
        return createResponse(data);
    }
}