import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";


export class AssignmentDto {
    @IsUUID()
    teamMemberId: string;

    @IsNumber()
    paymentAmount: number;

    @IsString()
    @IsOptional()
    notes?: string;
}

export class AssignTeamMembersDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AssignmentDto)
    assignments: AssignmentDto[];
}