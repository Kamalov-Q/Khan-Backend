
export class DashboardSummaryDto {
    todayWeddingCount: number;
    monthWeddingCount: number;
    yearWeddingCount: number;
    totalRevenue: string;
    totalPayouts: string;
    totalProfit: string;
}

export class TeamMemberStatsDto {
    teamMemberId: string;
    fullName: string;
    roleLabel: string;
    totalAssignedWeddings: number;
    completedWeddings: number;
    upcomingWeddings: number;
    totalEarnings: string;
}

export class WeddingChartDto {
    label: string;
    count: number;
    revenue: string;
}