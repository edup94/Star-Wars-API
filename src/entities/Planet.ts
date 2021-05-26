import {Entity,PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToMany, JoinTable} from "typeorm";
import { Character } from "./Character";
import { User } from "./User";

@Entity()
export class Planet extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    diameter: number

    @Column()
    rotationPeriod: number

    @Column()
    gravity: string

    @Column()
    population: number

    @Column()
    climate: string

    @Column()
    terrain: string

    @Column()
    surfaceWater: number

    @Column()
    imgUrl: string

    @ManyToMany(() => User, user => user.planets)
    @JoinTable()
    users: User[];

    @OneToMany(() => Character, character => character.planet)
    characters: Character[];
}