
import { Controller, Get, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsEntity} from './carts.entity';
import CardsDTO from './carts.dto'
@Controller('carts')
export class CartsController {
  constructor(
    private LikesService: CartsService
    ) {}

  @Post()
  createCartRecord(@Body() data: CardsDTO): Promise<CartsEntity>{ 
    return this.LikesService.create(data);
  }

  @Get(':id')
  getAllCartRecord(@Param('id') id:string) {
    return this.LikesService.read(id);
  }
  
  @Delete()
  destroyCartRecord(@Body() data:{noteId:string, userId:string }) {
    const like = this.LikesService.destroy(data);
    return like;
  }

}
