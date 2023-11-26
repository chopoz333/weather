import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

const MIN_LENGTH = 6;
const MAX_LENGTH = 100;

export class SignInDto {
  @ApiProperty({ example: 'chopoz', required: true })
  @IsString({ message: 'Login should be a string' })
  @IsNotEmpty({ message: 'Login not exist' })
  @Length(MIN_LENGTH, MAX_LENGTH, { message: 'Password must be longer than 5 characters' })
  public login: string;

  @ApiProperty({ example: '123456!', required: true })
  @IsString({ message: 'Password should be a string' })
  @IsNotEmpty({ message: 'Password not exist' })
  @Length(MIN_LENGTH, MAX_LENGTH, { message: 'Password must be longer than 5 characters' })
  public password: string;
}
