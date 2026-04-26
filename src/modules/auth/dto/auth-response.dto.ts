import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { UserRole } from '../../../common/enums/user-role.enum';
import { Type } from 'class-transformer';

class UserInfo {
    @ApiProperty({ description: 'The unique identifier of the user', example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
    @IsUUID()
    id: string;

    @ApiProperty({ description: 'Full name of the user', example: 'John Doe' })
    @IsString()
    fullName: string;

    @ApiProperty({ description: 'Email address of the user', example: 'john@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Role of the user', enum: UserRole })
    @IsEnum(UserRole)
    role: UserRole;

    @ApiProperty({ description: 'Position label (e.g. Doirachi)', example: 'Doirachi', required: false })
    @IsString()
    @IsOptional()
    roleLabel?: string;
}

export class AuthResponseDto {
    @ApiProperty({ description: 'JWT access token' })
    @IsString()
    accessToken: string;

    @ApiProperty({ description: 'Authenticated user information' })
    @ValidateNested()
    @Type(() => UserInfo)
    user: UserInfo;
}