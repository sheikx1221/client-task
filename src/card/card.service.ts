import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardModel: Repository<Card>
  ) {}
  create(createCardDto: CreateCardDto) {
    return this.cardModel.save({
      ...createCardDto
    });
  }

  findAll() {
    return this.cardModel.find();
  }

  findOne(id: string) {
    return this.cardModel.findOne({
      where: { id }
    });
  }

  update(id: string, updateCardDto: UpdateCardDto) {
    return this.cardModel.update({ id }, { ...updateCardDto });
  }

  remove(id: string) {
    return this.cardModel.softDelete(id);
  }
}
