import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { NotesEntity } from './notes.entity';
@Module({
  imports: [TypeOrmModule.forFeature([NotesEntity])],
  controllers: [NotesController],
  providers: [NotesService],
  exports:[TypeOrmModule]
})
export class NotesModule {
  
}
