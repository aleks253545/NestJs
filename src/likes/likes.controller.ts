
import { Controller, Get, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesEntity } from './likes.entity';
import { UsersService } from 'src/users/users.service';

@Controller('likes')
export class LikesController {
  constructor(
    private LikesService: LikesService,
    private UsersService: UsersService
    ) {}

  @Post()
  createLike(@Body() data: {noteId:string ,userId: string}): Promise<LikesEntity>{ 
    const like=this.LikesService.create(data);
    return like;
  }

  @Get(':id')
  getAllLikePost(@Param('id') id:string) {
    return this.LikesService.read(id);
  }
  
  @Delete()
  destroyLike(@Body() data:{noteId:string, userId:string }) {
    const like = this.LikesService.destroy(data);
    return like;
  }

}
