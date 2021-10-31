import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserEntity } from "../user/models/user.entity";

export const GetUser = createParamDecorator((data, req: ExecutionContext): UserEntity => {
    const user = req.switchToHttp().getRequest().user;
    return user;
});