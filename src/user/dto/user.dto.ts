import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

const MIN_LENGTH = 6;
const MAX_LENGTH = 100;

export class CreateUserDto {
  @ApiProperty({ example: 'chopoz', required: true })
  @IsString({ message: 'Login should be string' })
  @IsNotEmpty({ message: 'Login not exist' })
  @Length(MIN_LENGTH, MAX_LENGTH, { message: 'Login must be longer than 5 characters' })
  public login: string;

  @ApiProperty({ example: '123456!', required: true })
  @IsString({ message: 'Password should be string' })
  @IsNotEmpty({ message: 'Password not exist' })
  @Length(MIN_LENGTH, MAX_LENGTH, { message: 'Password must be longer than 5 characters' })
  @Matches(/[\.\,\!\_]/, { message: 'The password must contain one of the characters: . , ! _' })
  public password: string;

  @ApiProperty({ example: 'Chopozov Ruslan Dmitrievich', required: true })
  @IsString({ message: 'fio should be string' })
  @IsNotEmpty({ message: 'fio not exist' })
  @Length(MIN_LENGTH, MAX_LENGTH, { message: 'fio must be longer than 5 characters' })
  public fio: string;
}
