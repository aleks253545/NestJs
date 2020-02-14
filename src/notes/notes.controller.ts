import { Controller, Get, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { NotesEntity } from './notes.entity';
import { NotesService } from './notes.service';
import { NotesDTO} from './notes.dto'

@Controller('notes')
export class NotesController {
  constructor(private NotesEntity: NotesService) {}
  @Get()
  showAllusers() {
    return this.NotesEntity.showAll();
  }

  @Post()
  createNote(@Body() data: NotesDTO): Promise<NotesEntity>{ 
    return this.NotesEntity.create(data);
  }

  @Get(':id')
  readuser(@Param('id') id:string) {
    return this.NotesEntity.read(id);
  }

  // @Put()
  // updateUser(@Param('id') id:string, @Body() data) {
  //   return this.NotesEntity.update(id, data)
  // }
  @Put(':id')
  updateTags(@Param('id') id:string, @Body() data) {
    return this.NotesEntity.update(id, data)
  }

  @Delete(':id')
  destroyUser(@Param('id') id: string) {
    return this.NotesEntity.destroy(id)
  }
}
