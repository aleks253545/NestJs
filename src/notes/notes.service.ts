import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotesEntity } from 'src/notes/notes.entity';
import { NotesDTO } from './notes.dto';
import { UsersEntity } from 'src/users/users.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NotesEntity) 
    private readonly notesRepository: Repository<NotesEntity>,
    @InjectRepository(UsersEntity) 
    private readonly usersRepository: Repository<UsersEntity>
    ) {}
    private readonly logger = new Logger(NotesService.name);
    async showAll(){
      return await this.notesRepository.find();
    }

    async updateLastNotes(authorId: string){
      const findNotes = await this.notesRepository.find({
        order: {
          datePublictaion:'ASC'
        },
        where: {
          author:authorId
        },
        select: [
          'id',
        ]
      })
      const user = await this.usersRepository.findOne({
        where: {
          id: authorId
        },
        select: [
          'lastPostCount',
        ]
      })
      const lastNotes = await findNotes.map(note => note['id']);
      await this.usersRepository.update({id:authorId},{lastNotes: lastNotes.splice(0,10),lastPostCount: user['lastPostCount']+1})
    }
    async updateUnigeTags(authorId: string,tags: string){
      const user = await this.usersRepository.findOne({
        where: {
          id:authorId
        },
      });
      const uniqueTags = user.uniqueTags ? user.uniqueTags : [];
      JSON.parse(tags).forEach(tag => {
        if(!uniqueTags.find((elem) => elem === tag)){
          uniqueTags.push(tag); 
        }
      });
      this.usersRepository.update({id: authorId}, {uniqueTags})
    }

    async create(data: NotesDTO): Promise<NotesEntity> {
      const note = await this.notesRepository.create(data);
      const saveNote = await this.notesRepository.save(note); 
      await this.updateLastNotes(note.author);  
      await this.updateUnigeTags(note.author,note.tags);
      return  saveNote
    }

    async read(id: string) {
      return await this.notesRepository.findOne({
        where: {id}
      });
    }
    async update( id: string, data) {
      await this.notesRepository.update({id}, data);
      const note = await this.notesRepository.findOne({id});
      await this.updateUnigeTags(note.author,note.tags);
      return note;
    }

    async destroy(id: string) {
      const user = await this.notesRepository.findOne({id})
      await this.notesRepository.delete({id});
      await this.updateLastNotes(user.author);  
      return {deleted: true}
    }
}
