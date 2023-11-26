import { BadRequestException, Catch, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entity/user.entity';

@Injectable()
@Catch()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto): Promise<User> {
    await this.checkCreateUserConditions(user);

    user.password = await this.genHashPassword(user.password);

    const newUser = this.userRepository.create(user);
    const result = await this.userRepository.save(newUser);

    return result;
  }

  async getById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async getByLogin(login: string): Promise<User> {
    return await this.userRepository.findOne({ where: { login }, select: ['id', 'login', 'password', 'fio'] });
  }

  private async checkCreateUserConditions(userDto: CreateUserDto) {
    const user = await this.getByLogin(userDto.login);

    if (user?.login === userDto.login) throw new BadRequestException('Login is already taken');
  }

  private async genHashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}
