import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './users.model';

@Entity()
export class Tokens {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Users, (user) => user.tokens, { onDelete: 'CASCADE' })
    user: Users;

    @Column()
    refreshToken: string;
}