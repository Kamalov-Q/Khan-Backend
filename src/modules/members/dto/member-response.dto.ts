import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsPhoneNumber, IsString, IsUUID } from 'class-validator';
import { UserRole } from '../../../common/enums/user-role.enum';

export class TeamMemberResponseDto {
    @ApiProperty({ description: 'The unique identifier of the member', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
    @IsUUID()
    id: string;

    @ApiProperty({ description: 'Full name of the member', example: 'Jane Smith' })
    @IsString()
    fullName: string;

    @ApiProperty({ description: 'Email address of the member', example: 'jane@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Phone number of the member', example: '+998901234567' })
    @IsPhoneNumber()
    phoneNumber: string;

    @ApiProperty({ description: 'Position label (e.g. Doirachi)', example: 'Doirachi' })
    @IsString()
    roleLabel: string;

    @ApiProperty({ description: 'Role of the member', enum: UserRole })
    @IsEnum(UserRole)
    role: UserRole;

    @ApiProperty({ description: 'Whether the member is active' })
    @IsBoolean()
    isActive: boolean;

    @ApiProperty({ description: 'Creation timestamp' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ description: 'Update timestamp' })
    @IsDate()
    updatedAt: Date;

    @Exclude()
    passwordHash: string;

    @Exclude()
    lastLoginAt: Date;
}