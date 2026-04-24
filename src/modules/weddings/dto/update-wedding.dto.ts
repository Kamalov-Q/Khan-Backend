import { IsString, IsNumber, IsDateString, IsArray, IsOptional, IsEnum } from 'class-validator';
import { WeddingStatus } from '../../../common/enums/wedding-status.enum';

export class UpdateWeddingDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    venueName?: string;

    @IsDateString()
    @IsOptional()
    eventDate?: string;

    @IsString()
    @IsOptional()
    startTime?: string;

    @IsString()
    @IsOptional()
    endTime?: string;

    @IsNumber()
    @IsOptional()
    totalPrice?: number;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    clothingRequirements?: string[];

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(WeddingStatus)
    @IsOptional()
    status?: WeddingStatus;
}