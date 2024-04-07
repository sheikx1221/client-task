import { Inject, Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation, Role } from './entities/conversation.entity';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { CustomRequest } from 'types/request';
import OpenAI from 'openai';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ConversationService {
  private model: OpenAI;
  constructor(
    @Inject(REQUEST) private readonly request: CustomRequest,
    @InjectRepository(Conversation)
    private readonly conversationModel: Repository<Conversation>,
    @InjectRepository(User)
    private readonly userModel: Repository<User>
  ) {
    this.model = new OpenAI({
      apiKey: "",
    });
  }
  async create(createConversationDto: CreateConversationDto) {
    const chat = this.conversationModel.create({ ...createConversationDto, user: this.request.user.id });
    // DEFAULT CARD FOR NOW
    const conversation_as = "df5eba0d-b0d9-4d17-a89a-5c4d25e51f5b";
    // CHECK BASIC THINGS LIKE RATE LIMIT, TOKEN LENGTH ETC HERE
    // LOAD PREVIOUS MESSAGES FROM REDIS IN HERE

    const previous_messages = this.conversationModel.find({
      where: {
        user: { id: this.request.user.id }
      }
    });

    console.log("previous_messages = ",previous_messages);

    const system = await this.userModel.findOne({
      where: { id: 'a0a90d75-021f-43ac-9220-89b90fcfc4ac' }
    });

    const user = await this.userModel.findOne({
      where: { id: this.request.user.id }
    });

    const model_prompt = `Write framer's next reply in a fictional chat between framer and ${this.request.user.username}.
    Write 1 reply only in internet RP style, italicize actions, and avoid quotation marks.
    Use markdown. Be proactive, creative, and drive the plot and conversation forward.
    
    Write at least 1 paragraph, up to 4. Always stay in character and avoid repetition
    Here is the message from user ${this.request.user.username}

    ${createConversationDto.message}
    `;

    const completion = await this.model.chat.completions.create({
      messages: [{ role: Role.System, content: model_prompt }],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);

    const messages = await this.conversationModel.save([
      { message: createConversationDto.message, role: Role.User, user },
      { message: completion.choices[0].message.content, role: Role.System, user: system }
    ]);

    return {
      reply: completion.choices[0].message.content
    }
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
