import { Body, Catch, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { RefreshTokenGuard } from './auth.guard';
import { SignInResponse } from './auth.interfaces';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
@Catch()
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {}

  @ApiOperation({ summary: 'Auth in Weather' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({ status: 200, type: SignInResponse })
  @Post('signIn')
  async signIn(@Body() signInDto: SignInDto): Promise<SignInResponse> {
    return await this.authService.signIn(signInDto.login, signInDto.password);
  }

  @ApiOperation({ summary: 'Register account in Weather' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 200, type: SignInResponse })
  @Post('signUp')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<SignInResponse> {
    const unHashedPassword = createUserDto.password;
    const user = await this.userService.createUser(createUserDto);

    return await this.authService.signIn(user.login, unHashedPassword);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(@Req() req: any) {
    return this.authService.refreshTokens(req.user?.id, req.user?.refreshToken);
  }
}
