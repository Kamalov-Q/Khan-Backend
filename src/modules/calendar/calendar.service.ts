import { BadRequestException, Injectable } from "@nestjs/common";
import { WeddingRepository } from "../weddings/wedding.repository";
import { WeddingAssignmentsRepository } from "../wedding-assignments/wedding-assignments.repository";
import { Wedding } from "../weddings/entities/wedding.entity";
import { WeddingAssignment } from "../wedding-assignments/entities/wedding-assignment.entity";

@Injectable()
export class CalendarService {
    constructor(
        private weddingsRepository: WeddingRepository,
        private assignmentsRepository: WeddingAssignmentsRepository,
    ) { }

    async getAdminCalendarRange(startDate: string, endDate: string): Promise<Wedding[]> {
        if (new Date(startDate) > new Date(endDate)) {
            throw new BadRequestException('Start date must be before end date');
        }

        return this.weddingsRepository.findWeddingsByDateRange(startDate, endDate);
    }

    async getAdminDayView(date: string): Promise<Wedding[]> {
        return this.weddingsRepository.findWeddingsByDateRange(date, date);
    }

    async getAdminMonthView(year: number, month: number): Promise<Wedding[]> {
        return this.weddingsRepository.findWeddingsByMonth(year, month);
    }

    async getTeamMemberCalendar(
        teamMemberId: string,
        startDate: string,
        endDate: string
    ): Promise<WeddingAssignment[]> {

        const assignments = await this.assignmentsRepository.findAssignmentsByTeamMember(teamMemberId);

        return assignments.filter((assignment) => {
            const eventDate = assignment.wedding.eventDate;
            return eventDate >= startDate && eventDate <= endDate;
        });
    }

    async getTeamMemberEvent(teamMemberId: string, weddingId: string): Promise<any> {
        const assignment = await this.assignmentsRepository.findOne({
            where: { teamMemberId, weddingId },
            relations: ['wedding']
        });

        if (!assignment) {
            return null;
        }

        return {
            ...assignment,
            wedding: {
                ...assignment.wedding,
                teamMemberPayment: assignment.paymentAmount,
                assignmentNotes: assignment.notes
            },
        };
    }
}