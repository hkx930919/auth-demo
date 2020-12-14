import { Album } from './album.entity';
// import { UserEntity } from './user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 500,
  })
  name: string;

  @Column('text')
  description: string;

  @ManyToOne(() => Album, (album) => album.photos)
  album: Album;
}
