import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import { UsersEntity} from '../users/users.entity';

@Entity('notes')
export class NotesEntity {
  @PrimaryGeneratedColumn('uuid') 
  id: string;

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
  date_publictaion: Date;


  @Column({
    type:'text',
  })
  tags: string[];
}