import { UserRole } from '../../../common/enums/user-role.enum';

export class AuthResponseDto {
    accessToken: string;
    user: {
        id: string;
        fullName: string;
        email: string;
        role: UserRole;
        roleLabel?: string;
    };
}