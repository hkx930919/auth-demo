import { Album } from '../../entity/album.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  @InjectRepository(Album)
  private albumRepository: Repository<Album>;

  async create(data: Album) {
    const res = await this.albumRepository.save(data);
    console.log('--user create', JSON.stringify(res));
    return res;
  }
  async query(ids = []) {
    // let res;
    // if (!ids || !ids.length) {
    //   res = await this.albumRepository.find();
    // } else {
    //   res = await this.albumRepository.findByIds(ids);
    // }
    const res = await this.albumRepository
      .createQueryBuilder('album')
      .leftJoinAndSelect('album.photos', 'photos')
      .getMany();
    console.log('---res', res);
    return res;
  }
  async update(data: Album) {
    const { id, ...others } = data || {};
    const userList = await this.query([id]);
    if (!userList.length) {
      throw new BadRequestException('没有此id');
    }
    const res = await this.albumRepository.update(id, others);
    console.log('---res', res);

    return res;
  }
  async delete(id) {
    const userList = await this.query([id]);
    if (!userList.length) {
      throw new BadRequestException('没有此id');
    }
    const res = await this.albumRepository.delete(id);
    console.log('---res', res);

    return res;
  }
}
