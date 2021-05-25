import {Entity,PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import { Character } from "./Character";

@Entity()
export class Planet extends BaseEntity {

    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    Name: string

    @Column()
    Diameter: number

    @Column()
    RotationPeriod: number

    @Column()
    Gravity: number

    @Column()
    Population: number

    @Column()
    Climate: string

    @Column()
    Terrain: string

    @Column()
    SurfaceWater: number

    @Column()
    ImgUrl: string

    @OneToMany(() => Character, character => character.planet)
    characters: Character[];
}