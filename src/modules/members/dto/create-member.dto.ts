import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsPhoneNumber, IsOptional } from 'class-validator';

export class CreateTeamMemberDto {
    @ApiProperty({ description: 'Full name of the team member', example: 'Jane Smith' })
    @IsString()
    fullName: string;

    @ApiProperty({ description: 'Email address of the team member', example: 'jane@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Phone number of the team member', example: '+998901234567', required: false })
    @IsPhoneNumber()
    @IsOptional()
    phoneNumber?: string;

    @ApiProperty({ description: 'Password (min 8 characters)', example: 'SecurePassword123' })
    @IsString()
    @MinLength(8)
    password: string;

    @ApiProperty({ description: 'Position label (e.g. Doirachi)', example: 'Doirachi' })
    @IsString()
    roleLabel: string;
}