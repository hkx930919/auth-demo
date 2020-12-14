import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Photo } from 'src/entity/photo.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 500,
  })
  name: string;

  @Column('text')
  description: string;

  @OneToMany(() => Photo, (photo) => photo.album)
  photos: Photo[];
}
