import { IsNumber, IsString } from "class-validator";

export class CreateEmloyeeDto{
    @IsString()
    name: string

    @IsString()
    company: string

    @IsNumber()
    employeeId: number

    @IsNumber()
    salary: number
}