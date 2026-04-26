import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDateString, IsArray, IsOptional, IsEnum } from 'class-validator';
import { WeddingStatus } from '../../../common/enums/wedding-status.enum';

export class CreateWeddingDto {
    @ApiProperty({ description: 'Title or name of the wedding', example: 'Wedding of John & Jane' })
    @IsString()
    title: string;

    @ApiProperty({ description: 'Name of the venue', example: 'Grand Ballroom' })
    @IsString()
    venueName: string;

    @ApiProperty({ description: 'Date of the event', example: '2026-06-15' })
    @IsDateString()
    eventDate: string;

    @ApiProperty({ description: 'Start time of the event', example: '18:00:00' })
    @IsString()
    startTime: string;

    @ApiProperty({ description: 'End time of the event', example: '23:59:00', required: false })
    @IsString()
    @IsOptional()
    endTime?: string;

    @ApiProperty({ description: 'Total price charged for the wedding', example: 15000000 })
    @IsNumber()
    totalPrice: number;

    @ApiProperty({ description: 'Specific clothing requirements', example: ['Suit', 'White shirt'] })
    @IsArray()
    @IsString({ each: true })
    clothingRequirements: string[];

    @ApiProperty({ description: 'Additional description or notes', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'Status of the wedding', enum: WeddingStatus, default: WeddingStatus.PLANNED, required: false })
    @IsEnum(WeddingStatus)
    @IsOptional()
    status?: WeddingStatus;
}