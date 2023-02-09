import { Injectable } from '@nestjs/common';
import { CreateEmloyeeDto } from './dtos/createEmployee.dto';
import { EmployeeRepository } from './repository/employee.respository';
import { Employee } from './schema/employee.schema';

@Injectable()
export class EmployeeService {
    constructor(private employeeRepo: EmployeeRepository){}
    async createEmployee(employee: CreateEmloyeeDto):Promise<Employee>{
        return await this.employeeRepo.createEmployee(employee)
    }
}
