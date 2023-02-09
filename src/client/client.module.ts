import { Module, OnModuleInit } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { AbilityModule } from 'src/ability/ability.module';

@Module({
  imports: [AbilityModule],
  controllers: [ClientController],
  providers: [ClientService]
})
export class ClientModule implements OnModuleInit {
  onModuleInit() {
    console.log("client module initialized")
  }
}
