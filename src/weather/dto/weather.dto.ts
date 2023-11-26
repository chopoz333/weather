import { IsNotEmpty, IsString } from 'class-validator';

export class GetWeatherDto {
  @IsNotEmpty({ message: 'City not exist' })
  @IsString({ message: 'City should be a string' })
  public city: string;

  @IsString({ message: 'language should be a string' })
  public language?: string = 'ru';
}
