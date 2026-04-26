import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsPhoneNumber, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../../../common/enums/user-role.enum';

export class CreateUserDto {
    @ApiProperty({ description: 'Full name of the user', example: 'John Doe' })
    @IsString()
    fullName: string;

    @ApiProperty({ description: 'Email address of the user', example: 'john@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Phone number of the user', example: '+998901234567', required: false })
    @IsPhoneNumber()
    @IsOptional()
    phoneNumber?: string;

    @ApiProperty({ description: 'Password (min 8 characters)', example: 'SecurePassword123' })
    @IsString()
    @MinLength(8)
    password: string;

    @ApiProperty({ description: 'Role of the user', enum: UserRole, default: UserRole.MEMBER, required: false })
    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;

    @ApiProperty({ description: 'Position label (e.g. Doirachi)', example: 'Doirachi', required: false })
    @IsString()
    @IsOptional()
    roleLabel?: string;
}