import {Entity,PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, ManyToMany, JoinTable} from "typeorm";
import { Planet } from "./Planet";
import { User } from "./User";

@Entity()
export class Character extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    height: number

    @Column()
    mass: number

    @Column()
    hairColor: string

    @Column()
    skinColor: string

    @Column()
    eyeColor: string

    @Column()
    birthYear: string

    @Column()
    gender: string

    @Column()
    homeworld: string

    @Column()
    imgUrl: string

    @ManyToMany(() => User, user => user.characters)
    @JoinTable()
    users: User[];

    @ManyToOne(() => Planet, planet => planet.characters)
    planet: Planet;
}