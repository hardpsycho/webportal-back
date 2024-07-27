import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const SessionInfo = createParamDecorator((_, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().session
})