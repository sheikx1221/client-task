import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async generateToken(payload: any): Promise<string> {
    console.log(payload);
    return this.jwtService.sign({ ...payload }, {
      secret: 'client-task'
    });
  }

  async verifyToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findOneWithPassword(username);
    if (user && user.password === password) {
      delete user.password;
      return user;
    }
    return null;
  }
}