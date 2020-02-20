import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { NotesEntity } from './notes.entity';
import { UsersModule } from 'src/users/users.module';
@Module({
  imports: [TypeOrmModule.forFeature([NotesEntity]), UsersModule],
  controllers: [NotesController],
  providers: [NotesService],
  exports:[TypeOrmModule,UsersModule]
})
export class NotesModule {
  
}
