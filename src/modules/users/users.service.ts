import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import * as bcrypt from 'bcrypt';
import { UserRole } from "src/common/enums/user-role.enum";
import { UpdateUserDto } from "./dto/update-user.dto";


@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) { }

    async createUser(dto: CreateUserDto): Promise<User> {
        const existingUser = await this.usersRepository.findByEmail(dto.email);

        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        if (dto.phoneNumber) {
            const existingUserByPhone = await this.usersRepository.findByPhoneNumber(dto.phoneNumber);
            if (existingUserByPhone) {
                throw new ConflictException('User with this phone number already exists');
            }
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = this.usersRepository.create({
            ...dto,
            passwordHash: hashedPassword,
            role: dto.role || UserRole.MEMBER,
            roleLabel: dto.roleLabel || 'Member',
            isActive: true,
        });

        return this.usersRepository.save(user);
    }

    async findById(id: string): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findByEmail(email);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.findOneByEmail(email);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async findOneByPhoneNumber(phoneNumber: string): Promise<User | null> {
        return this.usersRepository.findByPhoneNumber(phoneNumber);
    }

    async findByPhoneNumber(phoneNumber: string): Promise<User> {
        const user = await this.findOneByPhoneNumber(phoneNumber);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async updateUser(id: string, dto: UpdateUserDto): Promise<User> {

        const user = await this.findById(id);

        if (dto.email && dto.email !== user.email) {
            const existingUser = await this.usersRepository.findByEmail(dto.email);
            if (existingUser) {
                throw new ConflictException('User with this email already exists');
            }
        }

        if (dto.phoneNumber && dto.phoneNumber !== user.phoneNumber) {
            const existingUserByPhone = await this.usersRepository.findByPhoneNumber(dto.phoneNumber);
            if (existingUserByPhone) {
                throw new ConflictException('User with this phone number already exists');
            }
        }

        Object.assign(user, dto);
        return this.usersRepository.save(user);
    }

    async toggleUserStatus(id: string, isActive: boolean): Promise<User> {
        const user = await this.findById(id);

        user.isActive = isActive;
        return this.usersRepository.save(user);
    }

    async updateLastLogin(id: string): Promise<void> {
        await this.usersRepository.update(id, { lastLoginAt: new Date() });
    }

    async getAllUsers(page = 1, limit = 10): Promise<[User[], number]> {
        return this.usersRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' },
        })
    }

}