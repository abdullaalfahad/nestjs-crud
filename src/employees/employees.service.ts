import { DatabaseService } from './../database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createEmployeeDto: Prisma.employeesCreateInput) {
    return this.databaseService.employees.create({
      data: createEmployeeDto,
    });
  }

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.databaseService.employees.findMany({
        where: {
          role,
        },
      });
    }

    return this.databaseService.employees.findMany();
  }

  findOne(id: number) {
    return this.databaseService.employees.findUnique({
      where: { id: id },
    });
  }

  update(id: number, updateEmployeeDto: Prisma.employeesUpdateInput) {
    return this.databaseService.employees.update({
      where: { id: id },
      data: updateEmployeeDto,
    });
  }

  remove(id: number) {
    return this.databaseService.employees.delete({
      where: { id: id },
    });
  }
}
