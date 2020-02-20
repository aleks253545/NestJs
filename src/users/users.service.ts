import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';

import { UsersEntity } from './users.entity';
import { UsersDTO } from './users.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity) 
    private readonly userRepository: Repository<UsersEntity>,
    ) {}

    private readonly logger = new Logger(UsersService.name);

    async showAll(){
      return await this.userRepository.find();
    }

    async create(data: UsersDTO):Promise<UsersEntity> {
      const user = await this.userRepository.create(data);
      await this.userRepository.save(user);
      return user; 
    }

    async read(id: string) {
      return await this.userRepository.findOne({
        where: {id}
      });
    }

    async update( id: string, data) {
      await this.userRepository.update({id}, data);
      return await this.userRepository.findOne({id});
    }

    async destroy(id: string) {
      await this.userRepository.delete({id});
      return {deleted: true}
    }


    // @Cron('10 * * * * *')
    // async timerReate() {
    //   const users = await this.userRepository.find({select:['totalCountLikes', 'lastPostCount', 'lastLikeCount', 'rateLastLike', 'rateActivity', 'rateLike', 'id']});
    //   const maxLikes = Math.max.apply(null,users.map(item => item.totalCountLikes)),
    //   maxLastLikes = Math.max.apply(null,users.map(item => item.lastLikeCount));
    //  await users.map( (user) =>  {
    //     const id = user.id;
    //      this.userRepository.update({id},{
    //       ...user,
    //       rateLike: +Math.ceil(user.totalCountLikes/maxLikes * 100) ,
    //       rateLastLike: +Math.ceil(user.lastLikeCount/maxLastLikes * 100),
    //       rateActivity: +user.lastPostCount,
    //       lastPostCount: +0,
    //       lastLikeCount: +0,
    //     }
    //     )})
    //   }
}
