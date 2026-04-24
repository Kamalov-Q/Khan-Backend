import { WeddingStatus } from '../../../common/enums/wedding-status.enum';

export class WeddingResponseDto {
    id: string;
    title: string;
    venueName: string;
    eventDate: string;
    startTime: string;
    endTime?: string;
    totalPrice: string;
    clothingRequirements: string[];
    description: string;
    status: WeddingStatus;
    totalAssignedPayout: string;
    adminProfit: string;
    createdById: string;
    createdAt: Date;
    updatedAt: Date;
    assignments?: any[];
}