import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetWeatherDto {
  @ApiProperty({ example: 'Paris', required: true })
  @IsNotEmpty({ message: 'City not exist' })
  @IsString({ message: 'City should be a string' })
  public city: string;

  @ApiProperty({ example: 'ru', required: false })
  @IsString({ message: 'language should be a string' })
  public language?: string = 'ru';
}
