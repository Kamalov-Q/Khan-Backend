import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/modules/users/entities/user.entity";


export const CurrentUser = createParamDecorator(
    (_: unknown, ctx: ExecutionContext): User => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);