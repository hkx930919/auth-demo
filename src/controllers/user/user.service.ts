import { BadRequestException, Injectable } from '@nestjs/common';
import { sleep } from 'src/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './../../entity/user.entity';
export type User = {
  id: number;
  userName: string;
  password: string;
};

@Injectable()
export class UserService {
  private users: User[];
  @InjectRepository(UserEntity)
  private usersRepository: Repository<UserEntity>;
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
  async findOne(userName: string): Promise<User | undefined> {
    await sleep();
    return this.users.find((user: User) => user.userName === userName);
  }
  async create(data: UserEntity) {
    const res = await this.usersRepository.save(data);
    return res;
  }
  async query(ids = []) {
    let res;
    if (!ids || !ids.length) {
      res = await this.usersRepository.find();
    } else {
      res = await this.usersRepository.findByIds(ids);
    }
    console.log('---res', res);
    return res;
  }
  async update(data: UserEntity | any, idKey: any = 'id') {
    const { [idKey]: id, ...others } = data || {};
    const userList = await this.query([id]);
    if (!userList.length) {
      throw new BadRequestException('没有此id');
    }
    const res = await this.usersRepository.update(id, others);
    console.log('---res', res);

    return res;
  }
  async delete(id) {
    const userList = await this.query([id]);
    if (!userList.length) {
      throw new BadRequestException('没有此id');
    }
    const res = await this.usersRepository.delete(id);
    console.log('---res', res);

    return res;
  }
}
