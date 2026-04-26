import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { jwtConfig } from "src/config/jwt.config";
import { UsersModule } from "../users/users.module";
import { WeddingGateway } from "./websocket.gateway";
import { WebsocketService } from "./websocket.service";

@Module({
    imports: [JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: jwtConfig
    }),
        UsersModule
    ],
    providers: [WeddingGateway, WebsocketService],
    exports: [WebsocketService]
})
export class WebsocketModule { }