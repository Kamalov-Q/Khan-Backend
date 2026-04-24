import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { UserRole } from "src/common/enums/user-role.enum";

@Injectable()
export class MembersRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async findAllMembers(page: number, limit: number) {
        return this.findAndCount({
            where: { role: UserRole.MEMBER },
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' },
        });
    }

    async findMemberById(id: string) {
        return this.findOne(
            { where: { id, role: UserRole.MEMBER } }
        );
    }

    async findActiveMembers() {
        return this.find({
            where: { role: UserRole.MEMBER, isActive: true },
            order: { createdAt: 'DESC' },
        });
    }

}