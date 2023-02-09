import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmloyeeDto } from '../dtos/createEmployee.dto';
import {
  Employee,
  EmployeeDocument,
  EMPLOYEE_MODEL,
} from '../schema/employee.schema';

@Injectable()
export class EmployeeRepository {
  constructor(
    @InjectModel(EMPLOYEE_MODEL) private employeeModel: Model<EmployeeDocument>,
    private eventEmitter: EventEmitter2
  ) {}
  async createEmployee(employee: CreateEmloyeeDto): Promise<Employee> {
    const newEmployee = new this.employeeModel(employee);
    this.eventEmitter.emit("user.created","employee created")
    return await newEmployee.save();
  }
  @OnEvent("user.created")
  handleEvent(data: string){
    console.log("message : ",data)
  }
}
