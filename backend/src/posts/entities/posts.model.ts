import { Users } from '../../auth/entities/users.model';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, CreateDateColumn } from 'typeorm';

enum Category {
    ART = "art",
    SCIENCE = "science",
    TECHNOLOGY = "technology",
    CINEMA = "cinema",
    DESIGN = "design",
    FOOD = "food"
}

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

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => Users, (user) => user.posts, { onDelete: 'CASCADE' })
  user: Users;

  @Column({
    type: "enum",
    enum: Category,
    default: Category.ART
  })
  cat: string
}