import { Users } from 'src/auth/entities/users.model';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Posts {
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

  @ManyToOne(() => Users)
  @JoinColumn()
  user: number;
}