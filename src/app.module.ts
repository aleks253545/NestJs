import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { NotesController } from './notes/notes.controller';
import { NotesService } from './notes/notes.service';
import { NotesModule } from './notes/notes.module';
import { LikesController } from './likes/likes.controller';
import { LikesService } from './likes/likes.service';
import { LikesModule } from './likes/likes.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5431,
      username: 'postgres',
      password: '',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    NotesModule,
    LikesModule,
  ],
  controllers: [NotesController, LikesController],
  providers: [NotesService, LikesService],
})
export class AppModule {
}
