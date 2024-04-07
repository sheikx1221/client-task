import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
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

  async findOneWithPassword(username: string) {
    const user = await this.userModel.findOne({
      where: { username },
      select: ['password', 'id', 'username']
    });

    return user;
  }


  update(username: string, updateUserDto: UpdateUserDto) {
    return this.userModel.update({ username }, { ...updateUserDto });
  }

  remove(id: string) {
    return this.userModel.softDelete(id);
  }
}
