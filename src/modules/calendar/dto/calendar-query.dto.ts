import { IsDateString, IsNumber, IsOptional } from "class-validator";

export class CalendarQueryDto {
    @IsDateString()
    @IsOptional()
    startDate?: string;

    @IsDateString()
    @IsOptional()
    endDate?: string;

    @IsNumber()
    @IsOptional()
    year?: number;

    @IsNumber()
    @IsOptional()
    month?: number;

    @IsDateString()
    @IsOptional()
    date?: string;

}