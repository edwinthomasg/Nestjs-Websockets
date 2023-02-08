import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    private users = [
        {
            name: "edwin",
            password: "edwin@2918",
            company: "aspire systems"
        },
        {
            name: "akash",
            password: "akash@2918",
            company: "aspire systems"
        }
    ]

    findUser(username: string){
        return this.users.find(user => user.name === username)
    }
}
