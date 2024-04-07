import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { OpenAI } from 'openai';

@Injectable()
export class ConversationService {
  private openai: OpenAI;
  constructor() {
    this.openai = new OpenAI({
      apiKey: "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"
    });
  }
  create(createConversationDto: CreateConversationDto) {
    return 
  }

  findAll() {
    return `This action returns all conversation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} conversation`;
  }

  update(id: number, updateConversationDto: UpdateConversationDto) {
    return `This action updates a #${id} conversation`;
  }

  remove(id: number) {
    return `This action removes a #${id} conversation`;
  }
}
