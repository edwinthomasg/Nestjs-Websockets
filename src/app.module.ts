import { CacheModule, Module } from '@nestjs/common';
import { Gateway, GatewayConnection } from './gateway';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { ClientModule } from './client/client.module';
import { AbilityModule } from './ability/ability.module';
import { EmployeeModule } from './employee/employee.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [AuthModule, UserModule, ClientModule, AbilityModule, EmployeeModule, MongooseModule.forRoot("mongodb://localhost:27017/employee"), CacheModule.register({isGlobal: true})],
  controllers: [AppController],
  providers: [Gateway, GatewayConnection],
})
export class AppModule {}
