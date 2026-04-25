import { IsNumber, IsString, IsOptional, IsEnum } from 'class-validator';
import { AssignmentStatus } from '../../../common/enums/assignment-status.enum';

export class UpdateWeddingAssignmentDto {
    @IsNumber()
    @IsOptional()
    paymentAmount?: number;

    @IsString()
    @IsOptional()
    notes?: string;

    @IsEnum(AssignmentStatus)
    @IsOptional()
    assignmentStatus?: AssignmentStatus;
}