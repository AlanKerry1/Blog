import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tokens } from './tokens.model';
import { Posts } from '../../posts/entities/posts.model';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Tokens, (token) => token.user)
    tokens: Tokens[];

    @OneToMany(() => Posts, (post) => post.user)
    posts: Posts[];
}
