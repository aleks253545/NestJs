import { Controller, Get, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { NotesEntity } from './notes.entity';
import { NotesService } from './notes.service';
import { NotesDTO} from './notes.dto'
import { UsersService } from 'src/users/users.service';

@Controller('notes')
export class NotesController {
  constructor(
    private readonly NotesService: NotesService
    ) {}
  @Get()
  showAllusers() {
    return this.NotesService.showAll();
  }

  @Post()
  createNote(@Body() data: NotesDTO){  
    return this.NotesService.create(data);
  }

  @Get(':id')
  readNote(@Param('id') id:string) {
    return this.NotesService.read(id);
  }
  
  @Put(':id')
  updateNote(@Param('id') id:string, @Body() data) {
    return this.NotesService.update(id, data)
  }

  @Delete(':id')
  destroyNote(@Param('id') id: string) {
    return this.NotesService.destroy(id)
  }
}
