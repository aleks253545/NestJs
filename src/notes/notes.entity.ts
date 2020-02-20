import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { UsersEntity } from '../users/users.entity';
import { LikesEntity } from '../likes/likes.entity';

@Entity('notes')
export class NotesEntity {
  @OneToMany(type => LikesEntity, likes => likes.noteId)
  @PrimaryGeneratedColumn('uuid') 
  id: string;
  
  @Column({
    type:'text',
    nullable:false
  })
  @ManyToOne(type => UsersEntity, user => user.id)
  author:string;

  @Column({
    type:'text'
  })
  text: string;

  @CreateDateColumn({
    type:'text',
    nullable:true
  })
  datePublictaion: Date;


  @Column({
    type:'simple-json',
    nullable:true
  })
  tags: string;

  @Column({
    type:'integer',
    nullable:true,
    default:0
  })
  likes: number;
}