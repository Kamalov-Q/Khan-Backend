import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { AssignmentStatus } from "src/common/enums/assignment-status.enum";
import { UserResponseDto } from "src/modules/users/dto/user-response.dto";
import { Type } from "class-transformer";

export class AssignmentResponseDto {
    @ApiProperty({ description: 'The unique identifier of the assignment', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
    @IsUUID()
    id: string;

    @ApiProperty({ description: 'The ID of the wedding', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
    @IsUUID()
    weddingId: string;

    @ApiProperty({ description: 'The ID of the team member', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
    @IsUUID()
    teamMemberId: string;

    @ApiProperty({ description: 'Team member details', type: UserResponseDto, required: false })
    @IsOptional()
    @ValidateNested()
    @Type(() => UserResponseDto)
    teamMember?: UserResponseDto;

    @ApiProperty({ description: 'Payment amount for this assignment', example: 500000 })
    @IsNumber()
    paymentAmount: number;

    @ApiProperty({ description: 'Status of the assignment', enum: AssignmentStatus })
    @IsEnum(AssignmentStatus)
    assignmentStatus: AssignmentStatus;

    @ApiProperty({ description: 'Additional notes for the assignment', required: false })
    @IsString()
    @IsOptional()
    notes: string;

    @ApiProperty({ description: 'Creation timestamp' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ description: 'Update timestamp' })
    @IsDate()
    updatedAt: Date;
}