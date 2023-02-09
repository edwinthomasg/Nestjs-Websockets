import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EmployeeRepository } from './repository/employee.respository';
import { EmployeeSchema, EMPLOYEE_MODEL } from './schema/employee.schema';

@Module({
  imports: [MongooseModule.forFeature([{
    schema: EmployeeSchema,
    name: EMPLOYEE_MODEL
  }]),
  ScheduleModule.forRoot(),
  EventEmitterModule.forRoot(),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeRepository]
})
export class EmployeeModule {}
