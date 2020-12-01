import { Injectable, OnModuleInit } from '@nestjs/common';
import { sleep } from 'src/utils';
export type User = {
  id: number;
  userName: string;
  password: string;
};

@Injectable()
export class UserService implements OnModuleInit {
  private users: User[];
  constructor() {
    this.users = [
      {
        id: 1,
        userName: 'john',
        password: 'changeme',
      },
      {
        id: 2,
        userName: 'chris',
        password: 'secret',
      },
      {
        id: 3,
        userName: 'maria',
        password: 'guess',
      },
    ];
  }
  onModuleInit() {
    console.log(
      `UserService module has been initialized.`,
      1111111111111111111111111111,
    );
  }
  async findOne(userName: string): Promise<User | undefined> {
    await sleep();
    return this.users.find((user: User) => user.userName === userName);
  }
}
