import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column,OneToMany } from 'typeorm';
import { LikesEntity } from '../likes/likes.entity';

@Entity('users')
export class UsersEntity {
  @OneToMany(type => LikesEntity, likes => likes.userId)
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
    type:'simple-array',
    nullable:true
  })
  uniqueTags:string[];

  @Column({
    type:'simple-array',
    nullable:true,
  })
  lastNotes:string[];

  @Column({
    type:'integer',
    nullable:true,
    default:0
  })
  totalCountLikes: number;

  @Column({
    type:'integer',
    nullable:true,
    default:0
  })
  lastLikeCount: number;

  @Column({
    type:'integer',
    nullable:true,
    default:0
  })
  lastPostCount: number;

}