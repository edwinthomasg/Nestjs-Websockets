import { Module, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  exports: [UserService]
})
export class UserModule implements OnModuleInit,  OnApplicationBootstrap {
  onModuleInit() {
    console.log("user modules initialized")
  }
  onApplicationBootstrap() {
    console.log("application bootstraped")
  }
}
