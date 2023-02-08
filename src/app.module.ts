import { Module } from '@nestjs/common';
import { Gateway } from './gateway';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { ClientModule } from './client/client.module';
import { AbilityModule } from './ability/ability.module';

@Module({
  imports: [AuthModule, UserModule, ClientModule, AbilityModule],
  controllers: [AppController],
  providers: [Gateway],
})
export class AppModule {}
