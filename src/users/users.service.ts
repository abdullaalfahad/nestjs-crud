import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Brian Smith',
      email: 'brian.smith@example.com',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'Catherine Lee',
      email: 'catherine.lee@example.com',
      role: 'EMPLOYEE',
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david.kim@example.com',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Ella Martinez',
      email: 'ella.martinez@example.com',
      role: 'INTERN',
    },
  ];

  findAll(role?: string) {
    if (role) {
      const filteredUsers = this.users.filter((user) => user.role === role);

      if (!filteredUsers.length) {
        throw new NotFoundException('Not valid role');
      }

      return filteredUsers;
    }

    return this.users;
  }

  findOne(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex == -1) {
      throw new NotFoundException('User not found');
    }

    const user = this.users[userIndex];

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const newUserId = this.users.length + 1;

    const newUser = {
      id: newUserId,
      ...createUserDto,
    };

    this.users.push(newUser);

    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updateUserDto,
        };
      }

      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users.filter((user) => user.id === id);
    return removedUser;
  }
}
