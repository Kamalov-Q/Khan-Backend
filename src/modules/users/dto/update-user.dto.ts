import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsBoolean, IsPhoneNumber } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({ description: 'Full name of the user', example: 'John Doe', required: false })
    @IsString()
    @IsOptional()
    fullName?: string;

    @ApiProperty({ description: 'Email address of the user', example: 'john@example.com', required: false })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({ description: 'Phone number of the user', example: '+998901234567', required: false })
    @IsPhoneNumber()
    @IsOptional()
    phoneNumber?: string;

    @ApiProperty({ description: 'Whether the user is active', default: true, required: false })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @ApiProperty({ description: 'Position label (e.g. Doirachi)', example: 'Doirachi', required: false })
    @IsString()
    @IsOptional()
    roleLabel?: string;
}