import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppModule } from "../../app.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { databaseConfig } from "src/config/database.config";
import { envValidationSchema } from "src/config/env.validation";
import { MembersModule } from "src/modules/members/members.module";
import { User } from "src/modules/users/entities/user.entity";
import { UsersModule } from "src/modules/users/users.module";
import { WeddingAssignment } from "src/modules/wedding-assignments/entities/wedding-assignment.entity";
import { Wedding } from "src/modules/weddings/entities/wedding.entity";
import { SeedService } from "./seed.service";

@Module({
    imports: [
        AppModule,
        UsersModule,
        MembersModule
    ],
    providers: [SeedService],
})
export class SeedModule { }