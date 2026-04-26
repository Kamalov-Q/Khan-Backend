import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @ApiProperty({ description: 'User email address', example: 'admin@wedding.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'User password', example: 'AdminPassword123' })
    @IsString()
    @MinLength(8)
    password: string;
}