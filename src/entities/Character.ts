import {Entity,PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import { Planet } from "./Planet";

@Entity()
export class Character extends BaseEntity {

    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    Name: string

    @Column()
    Height: number

    @Column()
    Mass: number

    @Column()
    HairColor: string

    @Column()
    SkinColor: string

    @Column()
    EyeColor: string

    @Column()
    BirthYear: string

    @Column()
    Gender: string

    @Column()
    Homeworld: string

    @Column()
    ImgUrl: string

    @ManyToOne(() => Planet, planet => planet.characters)
    planet: Planet;
}