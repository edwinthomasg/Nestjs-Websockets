import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, 
        private jwtService: JwtService) {}

    validateUser(username: string, password: string){
        const user = this.userService.findUser(username)
        if(!user) throw new BadRequestException()
        if(user.password != password) throw new UnauthorizedException()
        const { password: secret, ...data } = user
        return data
    }

    generateToken(user: any){
        return {
            access_token: this.jwtService.sign(user)
        }
    }
}
