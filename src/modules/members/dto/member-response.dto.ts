import { Exclude } from 'class-transformer';
import { UserRole } from '../../../common/enums/user-role.enum';

export class TeamMemberResponseDto {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    roleLabel: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    @Exclude()
    passwordHash: string;

    @Exclude()
    lastLoginAt: Date;
}