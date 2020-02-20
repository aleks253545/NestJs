import { Injectable } from '@nestjs/common';
import { LikesEntity } from './likes.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/users.entity';
import { NotesEntity } from 'src/notes/notes.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikesEntity) 
    private readonly likesRepository: Repository<LikesEntity>,
    @InjectRepository(UsersEntity) 
    private readonly userRepository: Repository<UsersEntity>,
    @InjectRepository(NotesEntity) 
    private readonly notesRepository: Repository<NotesEntity>,
    ) {}
    async onChangeLike(data:{noteId: string, userId: string},type: string){
      const note = await this.notesRepository.findOne({
        where:{
          id: data.noteId
        },
        select:['likes']
      }),
      user = await this.userRepository.findOne({
        where: {
          id: data.userId
        },
        select: ['totalCountLikes','lastLikeCount']
      })
      if (type === 'add') {
        await this.notesRepository.update({id: data.noteId},{likes: note['likes'] + 1})
        await this.userRepository.update({id:data.userId}, {
          totalCountLikes: user['totalCountLikes'] + 1, 
          lastLikeCount: user['lastLikeCount'] + 1
        });
      } else if (type === 'delete') { 
        await this.notesRepository.update({id: data.noteId},{likes: note['likes'] - 1})
        await this.userRepository.update({id:data.userId}, {
          totalCountLikes: user['totalCountLikes'] - 1, 
          lastLikeCount: user['lastLikeCount'] - 1
        });
      }
    }

    async create(data:{noteId: string, userId: string}):Promise<LikesEntity> {
      const like = await this.likesRepository.create(data);
      await this.likesRepository.save(like);
      await this.onChangeLike(data,'add');
      return like;
      
    }

    async read(id: string) {
      return await this.likesRepository.find({
        where: {
          noteId: id,
        }
      });
    }

    // async update(noteId: string, userId: string) {
    //   if( this.likesRepository.findOne({
    //     where: {
    //       'noteId':noteId,
    //       'userId':userId
    //     }
    //   })) {
    //     return await this.likesRepository.delete({
    //       userId: noteId,
    //       noteId: noteId
    //     });
    //   }else {
    //     const like = await this.likesRepository.create({noteId,userId});
    //     return await this.likesRepository.save(like);
    //   }
    // }

    async destroy(data:{noteId: string, userId: string}) {
      await this.likesRepository.delete({
        userId: data.userId,
        noteId: data.noteId
      });
      await this.onChangeLike(data, 'delete');
      return {deleted: true}
    }
}
