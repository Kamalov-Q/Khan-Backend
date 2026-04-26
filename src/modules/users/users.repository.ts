import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.findOne({ where: { email } })
    }

    async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
        return this.findOne({ where: { phoneNumber } })
    }

    async findActiveUsers() {
        return this.find({ where: { isActive: true } })
    }
}