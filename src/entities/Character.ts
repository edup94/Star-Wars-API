import {Entity,PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import { Planet } from "./Planet";

@Entity()
export class Character extends BaseEntity {

    @PrimaryGeneratedColumn()
    ID: number

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

    @ManyToOne(() => Planet, planet => planet.characters)
    planet: Planet;
}