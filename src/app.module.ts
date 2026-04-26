import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envValidationSchema } from './config/env.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MembersModule } from './modules/members/members.module';
import { WeddingsModule } from './modules/weddings/weddings.module';
import { WeddingAssigmentsModule } from './modules/wedding-assignments/wedding-assignments.module';
import { CalendarModule } from './modules/calendar/calendar.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { WebsocketModule } from './modules/websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      // schema: envValidationSchema,
      validationOptions: {
        abortEarly: true
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: databaseConfig,
    }),
    AuthModule,
    UsersModule,
    MembersModule,
    WeddingsModule,
    WeddingAssigmentsModule,
    CalendarModule,
    DashboardModule,
    WebsocketModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
