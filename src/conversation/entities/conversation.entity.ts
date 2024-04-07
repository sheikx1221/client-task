import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum Role {
    User = 'user',
    System = 'system'
}
@Entity()
export class Conversation {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("text")
    message: string;

    @Column({ type: 'enum', enum: Role, default: Role.System })
    role: Role;

    @ManyToOne(() => User, user => user.conversations)
    user: User | string;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    dateCreated: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    dateUpdated: Date;

    @DeleteDateColumn({ type: 'timestamp with time zone' })
    dateDeleted: Date;
}
