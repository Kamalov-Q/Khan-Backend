import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { UsersModule } from "../users/users.module";
import { MembersController } from "./members.controller";
import { MembersService } from "./members.service";
import { MembersRepository } from "./members.repository";

@Module({
    imports: [TypeOrmModule.forFeature([User]), UsersModule],
    controllers: [MembersController],
    providers: [MembersService, MembersRepository],
    exports: [MembersService, MembersRepository]
})
export class MembersModule { }