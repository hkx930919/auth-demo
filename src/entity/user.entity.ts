import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Photo } from './photo.entity';
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  password: string;
  // @Column()
  // @OneToMany(() => Photo, (photo) => photo.author)
  // photos: string; // Photo[];
}
