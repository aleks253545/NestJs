import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { NotesEntity } from '../notes/notes.entity';
import { UsersEntity } from '../users/users.entity';

@Entity('likes')
export class LikesEntity {
  @PrimaryGeneratedColumn('uuid')
  likeId: string 
  @ManyToOne(type => NotesEntity, notes => notes.id)
  noteId: string;

  @ManyToOne(type => UsersEntity, user => user.id)
  userId: string;

}