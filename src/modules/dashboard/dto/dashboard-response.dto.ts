import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNumberString, IsString, IsUUID } from "class-validator";

export class DashboardSummaryDto {
    @ApiProperty({ description: 'Number of weddings scheduled for today', example: 2 })
    @IsNumber()
    todayWeddingCount: number;

    @ApiProperty({ description: 'Number of weddings scheduled for the current month', example: 15 })
    @IsNumber()
    monthWeddingCount: number;

    @ApiProperty({ description: 'Number of weddings scheduled for the current year', example: 120 })
    @IsNumber()
    yearWeddingCount: number;

    @ApiProperty({ description: 'Total revenue earned', example: '150000000.00' })
    @IsNumberString()
    totalRevenue: string;

    @ApiProperty({ description: 'Total payouts to team members', example: '80000000.00' })
    @IsNumberString()
    totalPayouts: string;

    @ApiProperty({ description: 'Total net profit', example: '70000000.00' })
    @IsNumberString()
    totalProfit: string;
}

export class TeamMemberStatsDto {
    @ApiProperty({ description: 'Unique ID of the team member', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
    @IsUUID()
    teamMemberId: string;

    @ApiProperty({ description: 'Full name of the team member', example: 'Jane Smith' })
    @IsString()
    fullName: string;

    @ApiProperty({ description: 'Position label', example: 'Doirachi' })
    @IsString()
    roleLabel: string;

    @ApiProperty({ description: 'Total weddings assigned to this member', example: 10 })
    @IsNumber()
    totalAssignedWeddings: number;

    @ApiProperty({ description: 'Number of assignments completed', example: 8 })
    @IsNumber()
    completedWeddings: number;

    @ApiProperty({ description: 'Number of upcoming assignments', example: 2 })
    @IsNumber()
    upcomingWeddings: number;

    @ApiProperty({ description: 'Total earnings for this member', example: '5000000.00' })
    @IsNumberString()
    totalEarnings: string;
}

export class WeddingChartDto {
    @ApiProperty({ description: 'Label for the data point (e.g. Month name)', example: 'January' })
    @IsString()
    label: string;

    @ApiProperty({ description: 'Number of weddings in this period', example: 5 })
    @IsNumber()
    count: number;

    @ApiProperty({ description: 'Total revenue in this period', example: '5000000.00' })
    @IsNumberString()
    revenue: string;
}