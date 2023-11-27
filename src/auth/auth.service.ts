import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { SignInResponse } from './auth.interfaces';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  async signIn(login: string, pass: string): Promise<SignInResponse> {
    const user = await this.usersService.getByLogin(login);
    const checkedPassword = await bcrypt.compare(pass, user?.password);

    if (!checkedPassword) {
      throw new UnauthorizedException();
    }

    const tokens = await this.getTokens(user.id, user.login, user.fio);

    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return {
      fio: user.fio,
      ...tokens,
    };
  }

  async signUp(createUserDto: CreateUserDto): Promise<SignInResponse> {
    const unHashedPassword = createUserDto.password;

    const user = await this.userService.createUser(createUserDto);

    return await this.signIn(user.login, unHashedPassword);
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.getById(userId);

    if (!user || !user.refresh_token) throw new ForbiddenException('Access Denied');

    const validateRefreshToken = await bcrypt.compare(refreshToken, user.refresh_token);

    if (!validateRefreshToken) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.login, user.fio);

    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  private async updateRefreshToken(userId: number, refreshToken: string) {
    const salt = await bcrypt.genSalt();
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

    await this.usersService.updateRefreshToken(userId, {
      refresh_token: hashedRefreshToken,
    });
  }

  async getTokens(
    userId: number,
    login: string,
    fio: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          login,
          fio,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          login,
          fio,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }
}
