import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from '../../entity/photo.entity';
import { UserService } from 'src/controllers/user/user.service';
export type User = {
  id: number;
  userName: string;
  password: string;
};

@Injectable()
export class PhotoService {
  @InjectRepository(Photo)
  private photoRepository: Repository<Photo>;

  constructor(private readonly userService: UserService) {}
  async create(data: Photo) {
    // const { author } = data;

    const res = await this.photoRepository.save(data);
    console.log('--user create', JSON.stringify(res));

    // if (author && res) {
    //   const userRes = await this.userService.update(
    //     { userId: author, photos: [res] },
    //     'userId',
    //   );
    //   return userRes;
    // }

    return res;
  }
  async query(ids = []) {
    let res;
    if (!ids || !ids.length) {
      res = await this.photoRepository.find();
    } else {
      res = await this.photoRepository.findByIds(ids);
    }
    return res;
  }
  async update(data: Photo) {
    const { id, ...others } = data || {};
    const userList = await this.query([id]);
    if (!userList.length) {
      throw new BadRequestException('没有此id');
    }
    const res = await this.photoRepository.update(id, others);
    console.log('---res', res);

    return res;
  }
  async delete(id) {
    const userList = await this.query([id]);
    if (!userList.length) {
      throw new BadRequestException('没有此id');
    }
    const res = await this.photoRepository.delete(id);
    console.log('---res', res);

    return res;
  }
}
