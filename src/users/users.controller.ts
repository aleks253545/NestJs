import { Controller, Get, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';
import { UsersDTO} from './users.dto'

@Controller('users')
export class UsersController {
  constructor(private UserService: UsersService) {}
  @Get()
  showAllusers() {
    return this.UserService.showAll();
  }

  @Post()
  createUser(@Body() data: UsersDTO): Promise<UsersEntity>{ 
    return this.UserService.create(data);
  }

  @Get(':id')
  readuser(@Param('id') id:string) {
    return this.UserService.read(id);
  }

  @Put()
  updateUser(@Param('id') id:string, @Body() data) {
    return this.UserService.update(id, data)
  }

  @Delete(':id')
  destroyUser(@Param('id') id: string) {
    return this.UserService.destroy(id)
  }
}
