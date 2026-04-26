import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsPhoneNumber, IsEmail } from 'class-validator';

export class UpdateTeamMemberDto {
    @ApiProperty({ description: 'Full name of the team member', example: 'Jane Smith', required: false })
    @IsString()
    @IsOptional()
    fullName?: string;

    @ApiProperty({ description: 'Email address of the team member', example: 'jane@example.com', required: false })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({ description: 'Phone number of the team member', example: '+998901234567', required: false })
    @IsPhoneNumber()
    @IsOptional()
    phoneNumber?: string;

    @ApiProperty({ description: 'Position label (e.g. Doirachi)', example: 'Doirachi', required: false })
    @IsString()
    @IsOptional()
    roleLabel?: string;
}