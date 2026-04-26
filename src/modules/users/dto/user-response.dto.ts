import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString, IsUUID } from 'class-validator';
import { UserRole } from '../../../common/enums/user-role.enum';

export class UserResponseDto {
    @ApiProperty({ description: 'The unique identifier of the user', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
    @IsUUID()
    id: string;

    @ApiProperty({ description: 'Full name of the user', example: 'John Doe' })
    @IsString()
    fullName: string;

    @ApiProperty({ description: 'Email address of the user', example: 'john@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Phone number of the user', example: '+998901234567' })
    @IsPhoneNumber()
    phoneNumber: string;

    @ApiProperty({ description: 'Role of the user', enum: UserRole })
    @IsEnum(UserRole)
    role: UserRole;

    @ApiProperty({ description: 'Position label (e.g. Doirachi)', example: 'Doirachi', required: false })
    @IsString()
    @IsOptional()
    roleLabel?: string;

    @ApiProperty({ description: 'Whether the user is active' })
    @IsBoolean()
    isActive: boolean;

    @ApiProperty({ description: 'Last login timestamp' })
    @IsDate()
    @IsOptional()
    lastLoginAt: Date;

    @ApiProperty({ description: 'Creation timestamp' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ description: 'Update timestamp' })
    @IsDate()
    updatedAt: Date;

    @Exclude()
    passwordHash: string;
}