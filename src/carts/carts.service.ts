import { Injectable, Logger } from '@nestjs/common';
import { CartsEntity } from './carts.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from 'src/products/products.entity';
import CardsDTO from './carts.dto';
import { threadId } from 'worker_threads';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(CartsEntity) 
    private readonly cartsRepository: Repository<CartsEntity>,
    @InjectRepository(ProductsEntity) 
    private readonly notesRepository: Repository<ProductsEntity>,
    ) {}

    private readonly logger = new Logger(CartsService.name);

    async create(data: CardsDTO): Promise<CartsEntity> {
      const card = await this.cartsRepository.create(data);
      this.logger.debug(data);
      return await this.cartsRepository.save(card);
      
    }

    async read(id: string) {
      return await this.cartsRepository.find({
        where: {
          noteId: id,
        }
      });
    }
    async destroy(data:{userId: string}) {
      await this.cartsRepository.delete({
        userId:data.userId
      });
      return {deleted: true}
    }
}
