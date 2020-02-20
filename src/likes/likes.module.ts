import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { LikesEntity } from './likes.entity';
import { UsersService } from 'src/users/users.service';
import { NotesModule } from 'src/notes/notes.module';

@Module({
  imports: [TypeOrmModule.forFeature([LikesEntity]), NotesModule],
  controllers: [LikesController],
  providers: [LikesService , UsersService],
  exports:[TypeOrmModule]
})
export class LikesModule {}
