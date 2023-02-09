import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Employee{
    @Prop()
    name: string

    @Prop()
    company: string

    @Prop()
    employeeId: number

    @Prop()
    salary: number
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee)
export type EmployeeDocument = Document & Employee
export const EMPLOYEE_MODEL = Employee.name