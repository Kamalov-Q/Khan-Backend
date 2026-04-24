import { IsString, IsNumber, IsDateString, IsArray, IsOptional, IsEnum } from 'class-validator';
import { WeddingStatus } from '../../../common/enums/wedding-status.enum';

export class CreateWeddingDto {
    @IsString()
    title: string;

    @IsString()
    venueName: string;

    @IsDateString()
    eventDate: string;

    @IsString()
    startTime: string;

    @IsString()
    @IsOptional()
    endTime?: string;

    @IsNumber()
    totalPrice: number;

    @IsArray()
    @IsString({ each: true })
    clothingRequirements: string[];

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(WeddingStatus)
    @IsOptional()
    status?: WeddingStatus;
}