import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { MembersRepository } from "./members.repository";
import { CreateTeamMemberDto } from "./dto/create-member.dto";
import { User } from "../users/entities/user.entity";
import { UserRole } from "src/common/enums/user-role.enum";
import { UpdateTeamMemberDto } from "./dto/update-member.dto";

@Injectable()
export class MembersService {
    constructor(
        private usersService: UsersService,
        private membersRepository: MembersRepository
    ) { }

    async createMember(dto: CreateTeamMemberDto): Promise<User> {
        const existingUser = await this.usersService.findOneByEmail(dto.email);

        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        if (dto.phoneNumber) {
            const existingUserByPhone = await this.usersService.findOneByPhoneNumber(dto.phoneNumber);
            if (existingUserByPhone) {
                throw new ConflictException('User with this phone number already exists');
            }
        }

        return this.usersService.createUser({
            ...dto,
            role: UserRole.MEMBER
        });
    }

    async findMemberById(id: string): Promise<User> {
        const member = await this.membersRepository.findMemberById(id);

        if (!member) {
            throw new NotFoundException('Member not found');
        }

        return member;
    }

    async getAllMembers(
        page: number = 1,
        limit: number = 10
    ): Promise<[User[], number]> {
        return this.membersRepository.findAllMembers(page, limit);
    }

    async updateMember(id: string, dto: UpdateTeamMemberDto): Promise<User> {
        await this.findMemberById(id);
        return this.usersService.updateUser(id, dto);
    }

    async deactivateMember(id: string): Promise<User> {
        await this.findMemberById(id);
        return this.usersService.toggleUserStatus(id, false);
    }

    async activateMember(id: string): Promise<User> {
        await this.findMemberById(id);
        return this.usersService.toggleUserStatus(id, true);
    }

    async getActiveMembers(): Promise<User[]> {
        return this.membersRepository.findActiveMembers();
    }
}