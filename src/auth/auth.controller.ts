import { BadRequestException, Body, Catch, Controller, OnApplicationBootstrap, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { SignInResponse } from './auth.interfaces';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';

@Controller('auth')
@Catch()
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {}

  @Post('signIn')
  async signIn(@Body() signInDto: SignInDto): Promise<SignInResponse> {
    return await this.authService.signIn(signInDto.login, signInDto.password);
  }

  @Post('signUp')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<SignInResponse> {
    const unHashedPassword = createUserDto.password;
    const user = await this.userService.createUser(createUserDto);

    return await this.authService.signIn(user.login, unHashedPassword);
  }
}
