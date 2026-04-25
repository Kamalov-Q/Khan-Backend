import { Injectable } from "@nestjs/common";
import { WeddingRepository } from "./wedding.repository";
import Decimal from "decimal.js";
import { WeddingAssignment } from "../wedding-assignments/entities/wedding-assignment.entity";


@Injectable()
export class WeddingFinanceService {
    constructor(private readonly weddingRepository: WeddingRepository) { }

    async recalculateFinancials(weddingId: string): Promise<void> {
        const wedding = await this.weddingRepository.findWeddingWithAssignments(weddingId);

        if (!wedding) return;

        const totalPrice = new Decimal(wedding.totalPrice || 0);
        const totalAssignedPayout = wedding.assignments.reduce((sum, assignment: WeddingAssignment) => sum.plus(new Decimal(assignment.paymentAmount || 0)), new Decimal(0)
        ).toFixed(2);

        const adminProfit = totalPrice.minus(new Decimal(totalAssignedPayout)).toFixed(2);

        wedding.totalAssignedPayout = totalAssignedPayout;
        wedding.adminProfit = adminProfit;

        await this.weddingRepository.save(wedding);
    }

    calculateAdminProfit(totalPrice: Decimal | number, totalAssignedPayout: Decimal | number): Decimal {
        const price = new Decimal(totalPrice);
        const payout = new Decimal(totalAssignedPayout);
        return price.minus(payout);
    }

}