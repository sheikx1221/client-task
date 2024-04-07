import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Card {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("text")
    name: string;

    @Column("text")
    description: string;

    @Column("text")
    imageURL: string;

    @Column("text")
    setting: string;

    @Column("varchar", { array: true })
    tags: string[];

    @Column("int")
    interactions: number;
    
    @CreateDateColumn({ type: 'timestamp with time zone' })
    dateCreated: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    dateUpdated: Date;

    @DeleteDateColumn({ type: 'timestamp with time zone' })
    dateDeleted: Date;
}
