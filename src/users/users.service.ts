import { Injectable } from '@nestjs/common';

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
      return filteredUsers;
    }

    return this.users;
  }

  findOne(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    const user = this.users[userIndex];

    return user;
  }

  create(user: { name: string; email: string; role: string }) {
    const newUserId = this.users.length + 1;

    const newUser = {
      id: newUserId,
      ...user,
    };

    this.users.push(newUser);

    return newUser;
  }

  update(
    id: number,
    updatedUser: { name?: string; email?: string; role?: string },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updatedUser,
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
