import { Exclude } from 'class-transformer';
import { UserRole } from '../../../common/enums/user-role.enum';

export class UserResponseDto {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    role: UserRole;
    roleLabel?: string;
    isActive: boolean;
    lastLoginAt: Date;
    createdAt: Date;
    updatedAt: Date;

    @Exclude()
    passwordHash: string;
}