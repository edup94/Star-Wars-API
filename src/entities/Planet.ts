import {Entity,PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import { Character } from "./Character";

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

    @OneToMany(() => Character, character => character.planet)
    characters: Character[];
}