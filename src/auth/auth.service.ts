import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { SignInResponse } from './auth.interfaces';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) {}

  async signIn(login: string, pass: string): Promise<SignInResponse> {
    const user = await this.usersService.getByLogin(login);
    const checkedPassword = await bcrypt.compare(pass, user?.password);

    if (!checkedPassword) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, login: user.login, fio: user.fio };

    return {
      fio: user.fio,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
