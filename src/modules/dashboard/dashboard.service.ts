import { Injectable, NotFoundException } from "@nestjs/common";
import { WeddingRepository } from "../weddings/wedding.repository";
import { WeddingAssignmentsRepository } from "../wedding-assignments/wedding-assignments.repository";
import { MembersRepository } from "../members/members.repository";
import { DashboardSummaryDto, TeamMemberStatsDto, WeddingChartDto } from "./dto/dashboard-response.dto";
import Decimal from "decimal.js";
import { Between } from "typeorm";

@Injectable()
export class DashboardService {
    constructor(
        private readonly weddingsRepository: WeddingRepository,
        private readonly assignmentsRepository: WeddingAssignmentsRepository,
        private readonly teamMembersRepository: MembersRepository
    ) { }

    async getSummary(): Promise<DashboardSummaryDto> {
        const today = new Date().toISOString().split('T')[0];
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();

        const [todayWeddings] = await this.weddingsRepository.findAndCount({
            where: { eventDate: today }
        });

        const monthStart = `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`;
        const monthEnd = new Date(currentYear, currentMonth, 0).toISOString().split('T')[0];

        const monthWeddingQuery = await this.weddingsRepository.findAndCount({
            where: {
                eventDate: Between(monthStart, monthEnd),
            },
        });

        const yearStart = `${currentYear}-01-01`;
        const yearEnd = `${currentYear}-12-31`;

        const [allWeddings] = await this.weddingsRepository.findAndCount({
            where: {
                eventDate: Between(yearStart, yearEnd),
            },
        });

        const allWeddingsData = await this.weddingsRepository.find();

        const totalRevenue = allWeddingsData.reduce((sum, w) => sum.plus(new Decimal(w.totalPrice || 0)), new Decimal(0));
        const totalPayouts = allWeddingsData.reduce((sum, w) => sum.plus(new Decimal(w.totalAssignedPayout || 0)), new Decimal(0));

        const totalProfit = totalRevenue.minus(totalPayouts);

        return {
            todayWeddingCount: todayWeddings.length,
            monthWeddingCount: monthWeddingQuery[1],
            yearWeddingCount: allWeddings.length,
            totalRevenue: totalRevenue.toFixed(2),
            totalPayouts: totalPayouts.toFixed(2),
            totalProfit: totalProfit.toFixed(2)
        }

    }

    async getTeamMembersStats(): Promise<TeamMemberStatsDto[]> {
        const teamMembers = await this.teamMembersRepository.find();
        const stats: TeamMemberStatsDto[] = [];

        for (const member of teamMembers) {
            const assignments = await this.assignmentsRepository.findAssignmentsByTeamMember(member.id);

            const totalEarnings = assignments.reduce((sum, a) => sum.plus(new Decimal(a.paymentAmount || 0)), new Decimal(0));

            const completedWeddings = assignments.filter((a) => a.wedding?.status === 'COMPLETED').length;

            const today = new Date().toISOString().split('T')[0];
            const upcomingWeddings = assignments.filter((a) => a.wedding?.eventDate >= today).length;

            stats.push({
                teamMemberId: member.id,
                fullName: member.fullName,
                roleLabel: member.roleLabel!,
                totalAssignedWeddings: assignments.length,
                completedWeddings,
                upcomingWeddings,
                totalEarnings: totalEarnings.toFixed(2)
            });
        };

        return stats;
    }

    async getTeamMemberStats(teamMemberId: string): Promise<TeamMemberStatsDto> {
        const member = await this.teamMembersRepository.findOne({
            where: { id: teamMemberId }
        });

        if (!member) {
            throw new NotFoundException('Team member not found');
        }

        const assignments = await this.assignmentsRepository.findAssignmentsByTeamMember(teamMemberId);

        const totalEarnings = assignments.reduce((sum, a) => sum.plus(new Decimal(a.paymentAmount || 0)), new Decimal(0));

        const completedWeddings = assignments.filter((a) => a.wedding?.status === 'COMPLETED').length;

        const today = new Date().toISOString().split('T')[0];
        const upcomingWeddings = assignments.filter((a) => a.wedding?.eventDate >= today).length;

        return {
            teamMemberId,
            fullName: member.fullName,
            roleLabel: member.roleLabel!,
            totalAssignedWeddings: assignments.length,
            completedWeddings,
            upcomingWeddings,
            totalEarnings: totalEarnings.toFixed(2)
        }
    }

    async getWeddingChartData(groupBy: 'day' | 'month' | 'year' = 'month'): Promise<WeddingChartDto[]> {
        const allWeddings = await this.weddingsRepository.find();
        const grouped: { [key: string]: { count: number; revenue: Decimal } } = {};

        for (const wedding of allWeddings) {
            let key: string;

            if (groupBy === 'day') {
                key = wedding.eventDate;
            } else if (groupBy === 'month') {
                key = wedding.eventDate.substring(0, 7);
            } else {
                key = wedding.eventDate.substring(0, 4);
            }

            if (!grouped[key]) {
                grouped[key] = { count: 0, revenue: new Decimal(0) };
            }

            grouped[key].count += 1;
            grouped[key].revenue = grouped[key].revenue.plus(new Decimal(wedding.totalPrice || 0));

        }

        return Object.entries(grouped).map(([label, data]) => ({
            label,
            count: data.count,
            revenue: data.revenue.toFixed(2)
        }));
    }

}