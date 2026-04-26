import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const databaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: configService.get('DATABASE_HOST', 'localhost'),
    port: configService.get("DATABASE_PORT", 5432),
    username: configService.get("DATABASE_USERNAME"),
    password: configService.get("DATABASE_PASSWORD"),
    database: configService.get("DATABASE_NAME"),
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
    ssl: configService.get("NODE_ENV") === 'production' ? { rejectUnauthorized: false } : false
});