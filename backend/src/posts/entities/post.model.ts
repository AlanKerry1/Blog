import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.model';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  title: string;

  @Column({nullable: false})
  desc: string;

  @Column({nullable: false})
  img: string;

  @Column({nullable: true, type: "date"})
  date: string;

  @OneToOne(() => User)
  @JoinColumn()
  uid: number;
}