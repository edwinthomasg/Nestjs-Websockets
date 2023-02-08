import { SetMetadata } from "@nestjs/common";

export const Role = (...roles) => SetMetadata('roles', roles)