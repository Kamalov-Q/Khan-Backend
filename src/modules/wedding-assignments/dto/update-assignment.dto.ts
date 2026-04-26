import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, IsEnum } from 'class-validator';
import { AssignmentStatus } from '../../../common/enums/assignment-status.enum';

export class UpdateWeddingAssignmentDto {
    @ApiProperty({ description: 'Payment amount for this assignment', example: 600000, required: false })
    @IsNumber()
    @IsOptional()
    paymentAmount?: number;

    @ApiProperty({ description: 'Additional notes for the assignment', example: 'Equipment provided', required: false })
    @IsString()
    @IsOptional()
    notes?: string;

    @ApiProperty({ description: 'Status of the assignment', enum: AssignmentStatus, required: false })
    @IsEnum(AssignmentStatus)
    @IsOptional()
    assignmentStatus?: AssignmentStatus;
}