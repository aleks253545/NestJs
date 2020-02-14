import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotesEntity } from 'src/notes/notes.entity';
import { NotesDTO } from './notes.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NotesEntity) 
    private readonly notesRepository: Repository<NotesEntity>,
    ) {}

    async showAll(){
      return await this.notesRepository.find();
    }
    async create(data: NotesDTO):Promise<NotesEntity> {
      const user = await this.notesRepository.create(data);
      await this.notesRepository.save(user);
      return user;
      
    }
    async read(id: string) {
      return await this.notesRepository.findOne({
        where: {id}
      });
    }
    async update( id: string, data) {
      await this.notesRepository.update({id}, data);
      return await this.notesRepository.findOne({id});
    }

    async destroy(id: string) {
      await this.notesRepository.delete({id});
      return {deleted: true}
    }
}
