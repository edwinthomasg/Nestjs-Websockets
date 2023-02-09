import {
  Body,
  CACHE_MANAGER,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UploadedFile,
  UploadedFiles,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { Cron, Timeout } from '@nestjs/schedule';
import { HttpStatusCode } from 'axios';
import { Cache } from 'cache-manager';
import { CreateEmloyeeDto } from './dtos/createEmployee.dto';
import { EmployeeService } from './employee.service';
import { BadReqFilter } from './exceptions/bad.filter';
import { Employee } from './schema/employee.schema';

@Controller('employee')
export class EmployeeController {
  private data = 'secret';
  constructor(
    private employeeService: EmployeeService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  @Post()
  async createEmployee(@Body() employee: CreateEmloyeeDto): Promise<Employee> {
    return await this.employeeService.createEmployee(employee);
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFiles(@UploadedFile() file: Express.Multer.File) {
    console.log(file.buffer.toString());
    return 'ok';
  }

  @Post('files')
  @UseInterceptors(FilesInterceptor('files'))
  uploadArrayFiles(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files);
    return 'ok';
  }

  @Post('fields')
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'resume',
        maxCount: 1,
      },
      {
        name: 'pic',
        maxCount: 1,
      },
    ]),
  )
  uploadfFieldFiles(
    @UploadedFiles()
    files: {
      resume: Express.Multer.File[];
      pic: Express.Multer.File[];
    },
  ) {
    console.log(files);
    return 'ok';
  }

  @Timeout(1000)
  handleTimeout() {
    console.log('executed after 1s');
  }

  @Get()
  async getDataFromCache() {
    if (!(await this.cacheManager.get('data'))) {
        console.log("db")
      await this.cacheManager.set('data', this.data);
      return await this.cacheManager.get('data');
    } else {
      console.log('from cache');
      return await this.cacheManager.get('data');
    }
  }
  @Get("exception")
  @UseFilters(BadReqFilter)
  throwException(){
    throw new HttpException("hi", HttpStatus.BAD_REQUEST)
  }
}
