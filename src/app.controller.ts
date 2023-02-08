import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth/auth.service';
import { Role } from './auth/decorators/role';
import { AuthGuard } from './auth/guards/guard';
import { JwtGuard } from './auth/guards/jwt.guard';
import { LocalAuthGuard } from './auth/guards/local.guard';

@Controller('app')
export class AppController {
    constructor(private authService: AuthService){}
    @Post("login")
    @UseGuards(LocalAuthGuard)
    login(@Req() req: Request){
        // return req.user
        return this.authService.generateToken(req.user)
    }

    @Get()
    @UseGuards(JwtGuard)
    @UseGuards(AuthGuard)
    @Role('user','admin')
    getData(@Req() req: Request){
        return req.user
    }
}
