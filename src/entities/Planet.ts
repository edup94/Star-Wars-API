import {Entity,PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import { Character } from "./Character";

@Entity()
export class Planet extends BaseEntity {

    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    name: string

    @Column()
    diameter: number

    @Column()
    rotationPeriod: number

    @Column()
    gravity: number

    @Column()
    population: number

    @Column()
    Climate: string

    @Column()
    terrain: string

    @Column()
    surfaceWater: number

    @Column()
    imgUrl: string

    @OneToMany(() => Character, character => character.planet)
    characters: Character[];
}