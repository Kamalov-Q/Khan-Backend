import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, IsArray, IsEnum, IsOptional, IsUUID, IsNumberString, ValidateNested } from 'class-validator';
import { WeddingStatus } from '../../../common/enums/wedding-status.enum';
import { AssignmentResponseDto } from 'src/modules/wedding-assignments/dto/assignment-response.dto';
import { Type } from 'class-transformer';

export class WeddingResponseDto {
    @ApiProperty({ description: 'The unique identifier of the wedding', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
    @IsUUID()
    id: string;

    @ApiProperty({ description: 'Title or name of the wedding', example: 'Wedding of John & Jane' })
    @IsString()
    title: string;

    @ApiProperty({ description: 'Name of the venue', example: 'Grand Ballroom' })
    @IsString()
    venueName: string;

    @ApiProperty({ description: 'Date of the event', example: '2026-06-15' })
    @IsString()
    eventDate: string;

    @ApiProperty({ description: 'Start time of the event', example: '18:00:00' })
    @IsString()
    startTime: string;

    @ApiProperty({ description: 'End time of the event', example: '23:59:00', required: false })
    @IsString()
    @IsOptional()
    endTime?: string;

    @ApiProperty({ description: 'Total price charged', example: '15000000.00' })
    @IsNumberString()
    totalPrice: string;

    @ApiProperty({ description: 'Specific clothing requirements', example: ['Suit', 'White shirt'] })
    @IsArray()
    @IsString({ each: true })
    clothingRequirements: string[];

    @ApiProperty({ description: 'Additional description or notes', required: false })
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({ description: 'Status of the wedding', enum: WeddingStatus })
    @IsEnum(WeddingStatus)
    status: WeddingStatus;

    @ApiProperty({ description: 'Total amount assigned for payout', example: '8000000.00' })
    @IsNumberString()
    totalAssignedPayout: string;

    @ApiProperty({ description: 'Admin profit', example: '7000000.00' })
    @IsNumberString()
    adminProfit: string;

    @ApiProperty({ description: 'ID of the creator' })
    @IsUUID()
    createdById: string;

    @ApiProperty({ description: 'Creation timestamp' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ description: 'Update timestamp' })
    @IsDate()
    updatedAt: Date;

    @ApiProperty({ description: 'List of assignments', required: false, type: [AssignmentResponseDto] })
    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => AssignmentResponseDto)
    assignments?: AssignmentResponseDto[];
}