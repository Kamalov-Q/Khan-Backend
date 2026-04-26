import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsOptional } from "class-validator";

export class CalendarQueryDto {
    @ApiProperty({ description: 'Start date for filtering', example: '2026-06-01', required: false })
    @IsDateString()
    @IsOptional()
    startDate?: string;

    @ApiProperty({ description: 'End date for filtering', example: '2026-06-30', required: false })
    @IsDateString()
    @IsOptional()
    endDate?: string;

    @ApiProperty({ description: 'Year for month/year view', example: 2026, required: false })
    @IsNumber()
    @IsOptional()
    year?: number;

    @ApiProperty({ description: 'Month for month view (1-12)', example: 6, required: false })
    @IsNumber()
    @IsOptional()
    month?: number;

    @ApiProperty({ description: 'Specific date for day view', example: '2026-06-15', required: false })
    @IsDateString()
    @IsOptional()
    date?: string;
}