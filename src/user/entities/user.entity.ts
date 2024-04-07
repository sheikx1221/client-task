import { Conversation } from "src/conversation/entities/conversation.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("text")
    username: string;
    
    @Column("text", { select: false })
    password: string;

    @OneToMany(() => Conversation, conversation => conversation.user)
    conversations: Conversation[]
}
