import {Entity, Column, PrimaryGeneratedColumn,BaseEntity, ManyToMany, JoinTable} from 'typeorm';
import { Planet } from './Planet';
import { Character } from './Character';

@Entity()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

    @ManyToMany(() => Planet, planet => planet.users, {
        cascade: true
    })
    planets: Planet[];

    @ManyToMany(() => Character, character => character.users)
    characters: Character[];
}