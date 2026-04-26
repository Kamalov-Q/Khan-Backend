import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";

export class AssignmentDto {
    @ApiProperty({ description: 'ID of the team member to assign', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
    @IsUUID()
    teamMemberId: string;

    @ApiProperty({ description: 'Payment amount for this member', example: 500000 })
    @IsNumber()
    paymentAmount: number;

    @ApiProperty({ description: 'Additional notes for the member', required: false, example: 'Lead singer' })
    @IsString()
    @IsOptional()
    notes?: string;
}

export class AssignTeamMembersDto {
    @ApiProperty({ description: 'List of assignments to create', type: [AssignmentDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AssignmentDto)
    assignments: AssignmentDto[];
}