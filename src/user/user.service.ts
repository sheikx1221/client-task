import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userModel: Repository<User>
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.userModel.save({
      ...createUserDto
    });
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(id?: string, username?: string) {
    return this.userModel.findOne({
      where: {
        id: id,
        username: username
      }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
