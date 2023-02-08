import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = context.switchToHttp().getRequest().headers.role
        const requiredRoles = this.reflector.getAllAndOverride('roles', [context.getHandler(),
        context.getClass()])
        return requiredRoles.includes(roles)
    }
}