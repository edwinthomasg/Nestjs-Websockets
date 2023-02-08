import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AbilityFactory, Action } from 'src/ability/ability.factory';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService, private abilityFactory: AbilityFactory) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    const user = {
      id: 1, isAdmin: true
    }
    const ability = this.abilityFactory.defineAbility(user)
    console.log("ability : ",ability)
    const isAllowed = ability.can(Action.Create, Client)
    console.log(isAllowed)
    return this.clientService.create(createClientDto);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
