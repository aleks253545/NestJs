import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column,OneToMany } from 'typeorm';
import {NotesEntity} from '../notes/notes.entity';

@Entity('users')
export class UsersEntity {
  @OneToMany(type => NotesEntity, notes => notes.author)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type:'text',
  })
  name: string;

  @Column({
    type:'text',
    nullable:true
  })
  mail: string;

  @Column({
    type:'text',
    nullable:true
  })
  phone: string;

  @Column({
    type: 'text',
    unique:true,
    
  })
  login: string;

  @Column('text')
  password: string;

  @CreateDateColumn({
    type:'text',
    nullable:true
  })
  birthday: Date;

  @Column({
    type:'integer',
    default:0
  })
  rateLike: number;

  @Column({
    type:'integer',
    default:0
  })
  rateLastLike: number;

  @Column({
    type:'integer',
    default:0
  })
  rateActivity: number;

  @Column({
    type:'text',
    default:[]
  })
  uniqeNotes: string[]

  @Column({
    type:'text',
    default:[],
    nullable:true
  })
  lastNotes:string[]
}